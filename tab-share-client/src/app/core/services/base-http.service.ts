import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CoreFacade } from '../state/core.facade';
import { defer, finalize, Observable } from 'rxjs';

export class BaseHttpService {
  protected BASE_URL = 'http://localhost:8080';
  protected httpClient = inject(HttpClient);
  protected coreFacade = inject(CoreFacade);

  protected handleRequest<T>(request: Observable<T>): Observable<T> {
    return defer(() => {
      this.coreFacade.setLoading(true);
      return request.pipe(finalize(this.onComplete.bind(this)));
    });
  }

  private onError<T>(err: T): Observable<never> {
    throw err;
  }

  private onComplete(): void {
    this.coreFacade.setLoading(false);
  }
}

function isHttpErrorResponse(err: any): err is HttpErrorResponse {
  return 'name' in err && err['name'] === 'HttpErrorResponse';
}
