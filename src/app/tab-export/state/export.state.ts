import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { ChromeFacade } from '../../core/services/chrome-facade';
import { computed, inject } from '@angular/core';
import { DESIRED_URL_PREFIXES } from '../../core/state/core.consts';
import { ExcludedTabs, ExportState, ExportTabsRequest } from './export.models';
import { CoreFacade } from '../../core/state/core.facade';
import { pipe, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ExportHttpService } from '../services/export-http.service';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';

const INITIAL_STATE: ExportState = {
  excludedTabs: {},
  currentWindowTabs: [],
  exportCode: '',
};
export const ExportStore = signalStore(
  { providedIn: 'root' },
  withState<ExportState>(INITIAL_STATE),
  withComputed(store => ({
    validTabs: computed(() =>
      store.currentWindowTabs().filter(tab => DESIRED_URL_PREFIXES.some(prefix => tab.url?.includes(prefix)))
    ),
    excludedTabsArr: computed(() => Object.values(store.excludedTabs()).filter(Boolean)),
  })),
  withMethods(store => {
    const httpService = inject(ExportHttpService);
    const router = inject(Router);
    return {
      setExcludedTabs: (excludedTabs: ExcludedTabs) => {
        patchState(store, { excludedTabs: excludedTabs });
      },
      exportTabs: rxMethod<ExportTabsRequest>(
        pipe(
          switchMap(request => httpService.exportTabs(request)),
          tapResponse(
            response => {
              patchState(store, { exportCode: response.code });
              router.navigate(['export', 'code']);
            },
            error => {
              console.error(error);
            }
          )
        )
      ),
      resetState: () => patchState(store, INITIAL_STATE),
    };
  }),
  withHooks({
    onInit: async store => {
      const chromeFacade = inject(ChromeFacade);
      const coreFacade = inject(CoreFacade);
      coreFacade.setLoading(true);
      const currentWindowTabs = await chromeFacade.getCurrentWindowTabs();
      patchState(store, { currentWindowTabs });
      coreFacade.setLoading(false);
    },
  })
);
