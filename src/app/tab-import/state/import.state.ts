import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ImportState, ImportTabsRequest } from './import.models';
import { ImportHttpService } from '../services/import-http.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ChromeFacade } from '../../core/services/chrome-facade';

const INITIAL: ImportState = {
  tabs: [],
};

export const ImportStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<ImportState>(INITIAL),
  withMethods(store => {
    const httpService = inject(ImportHttpService);
    const chromeFacade = inject(ChromeFacade);
    return {
      importTabs: rxMethod<ImportTabsRequest>(
        pipe(
          switchMap((request: ImportTabsRequest) => httpService.importTabs(request)),
          tapResponse(
            response => {
              patchState(store, { tabs: response.tabs });
              // chromeFacade.openTabs(response.tabs.map(tab => tab.url));
            },
            error => {
              console.log(error);
            }
          )
        )
      ),
    };
  })
);
