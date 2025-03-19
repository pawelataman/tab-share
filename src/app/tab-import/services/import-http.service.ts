import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../core/services/base-http.service';
import { ImportTabsRequest, ImportTabsResponse } from '../state/import.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportHttpService extends BaseHttpService {
  importTabs(reqData: ImportTabsRequest): Observable<ImportTabsResponse> {
    const request = this.httpClient.get<ImportTabsResponse>(`${this.BASE_URL}/import`, {
      params: {
        code: reqData.code,
      },
    });
    return this.handleRequest(request);
  }
}
