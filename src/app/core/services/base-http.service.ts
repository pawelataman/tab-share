import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {CoreFacade} from '../state/core.facade';
import {finalize, Observable} from 'rxjs';

export class BaseHttpService {
  protected BASE_URL = 'http://localhost:3000'
  protected httpClient = inject(HttpClient)
  protected coreFacade = inject(CoreFacade)

  handleRequest<T>(request: Observable<T>): Observable<T> {
    this.coreFacade.setLoading(true)
    return request.pipe(finalize(() => this.coreFacade.setLoading(false)))
  }
}
