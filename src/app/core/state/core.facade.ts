import {inject, Injectable} from '@angular/core';
import {CoreStore} from './core.state';


@Injectable({
  providedIn: 'root'
})
export class CoreFacade {
  private coreStore = inject(CoreStore)
  
  setLoading(isLoading: boolean): void {
    this.coreStore.setLoading(isLoading)
  }
}
