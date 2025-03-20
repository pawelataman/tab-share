import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CoreFacade } from '../state/core.facade';
import { catchError, defer, finalize, Observable, of } from 'rxjs';

export class BaseHttpService {
  protected BASE_URL = 'http://localhost:3000';
  protected httpClient = inject(HttpClient);
  protected coreFacade = inject(CoreFacade);

  protected handleRequest<T>(request: Observable<T>): Observable<T> {
    return defer(() => {
      this.coreFacade.setLoading(true);
      return request.pipe(catchError(this.onError.bind(this)), finalize(this.onComplete.bind(this)));
    });
  }

  private onError<T>(err: T): Observable<T> {
    if (isHttpErrorResponse(err)) {
      //TODO: somehow handle error
      console.log(err.error);
    }
    return of(err);
  }

  private onComplete(): void {
    this.coreFacade.setLoading(false);
  }
}

function isHttpErrorResponse(err: any): err is HttpErrorResponse {
  return 'name' in err && err['name'] === 'HttpErrorResponse';
}
