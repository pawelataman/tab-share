import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AppError, CoreState } from './core.models';

const INITIAL_STATE: CoreState = {
  isLoading: false,
  error: null,
};

export const CoreStore = signalStore(
  { providedIn: 'root' },
  withState<CoreState>(INITIAL_STATE),
  withMethods(store => ({
    setLoading: (isLoading: boolean) => {
      patchState(store, { isLoading });
    },
    setError: (error: AppError | null) => {
      patchState(store, { error });
    },
  }))
);
