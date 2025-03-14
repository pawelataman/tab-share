import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {CoreState} from './core.models';

const INITIAL_STATE: CoreState = {
  isLoading: false
}

export const CoreStore = signalStore(
  {providedIn: 'root'},
  withState<CoreState>(INITIAL_STATE),
  withMethods((store) => ({
    setLoading: (isLoading: boolean) => {
      patchState(store, {isLoading})
    }
  }))
)

