import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ImportState, ImportTabsRequest } from './import.models';
import { ImportHttpService } from '../services/import-http.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, concatMap, of, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ToastService } from '../../core/features/toaster/services/toast.service';

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
    const toastService = inject(ToastService);
    return {
      importTabs: rxMethod<ImportTabsRequest>(
        pipe(
          switchMap((request: ImportTabsRequest) =>
            httpService.importTabs(request).pipe(
              tapResponse(
                response => {
                  patchState(store, { tabs: response.tabs });
                },
                error => {
                  toastService.pushToast({
                    message: 'Could not import tabs',
                    id: Date.now().toString(),
                    type: 'error',
                  });
                }
              )
            )
          )
        )
      ),
      resetState: () => patchState(store, INITIAL_STATE),
    };
  })
);
