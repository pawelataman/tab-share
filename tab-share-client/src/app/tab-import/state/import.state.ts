import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ImportState, ImportTabsRequest } from './import.models';
import { ImportHttpService } from '../services/import-http.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

const INITIAL_STATE: ImportState = {
  tabs: [],
};

export const ImportStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<ImportState>(INITIAL_STATE),
  withMethods(store => {
    const httpService = inject(ImportHttpService);
    return {
      importTabs: rxMethod<ImportTabsRequest>(
        pipe(
          switchMap((request: ImportTabsRequest) => httpService.importTabs(request)),
          tapResponse(
            response => {
              patchState(store, { tabs: response.tabs });
            },
            error => {
              console.log(error);
            }
          )
        )
      ),
      resetState: () => patchState(store, INITIAL_STATE),
    };
  })
);
