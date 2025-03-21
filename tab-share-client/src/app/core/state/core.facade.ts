import { inject, Injectable } from '@angular/core';
import { CoreStore } from './core.state';
import { AppError } from './core.models';

@Injectable({
  providedIn: 'root',
})
export class CoreFacade {
  private coreStore = inject(CoreStore);
  $error = this.coreStore.error;

  setLoading(isLoading: boolean): void {
    this.coreStore.setLoading(isLoading);
  }

  setError(error: AppError | null): void {
    this.coreStore.setError(error);
  }
}
