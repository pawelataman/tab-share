import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CoreFacade } from '../state/core.facade';
import { catchError, defer, finalize, Observable, of } from 'rxjs';
import { ToastService } from '../features/toaster/services/toast.service';
import { ApiErrorMessageCode, ApiErrorMessageDictionary } from '../state/core.consts';

export class BaseHttpService {
  protected BASE_URL = 'http://localhost:3000';
  protected httpClient = inject(HttpClient);
  protected coreFacade = inject(CoreFacade);
  private toastService = inject(ToastService);

  protected handleRequest<T>(request: Observable<T>): Observable<T> {
    return defer(() => {
      this.coreFacade.setLoading(true);
      return request.pipe(catchError(this.onError.bind(this)), finalize(this.onComplete.bind(this)));
    });
  }

  private onError<T>(err: T): Observable<T> {
    if (isHttpErrorResponse(err)) {
      const message: string | undefined = ApiErrorMessageDictionary[err.error as ApiErrorMessageCode];
      if (message) {
        this.toastService.pushToast({ message, type: 'error', id: Date.now().toString() });
      }
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
