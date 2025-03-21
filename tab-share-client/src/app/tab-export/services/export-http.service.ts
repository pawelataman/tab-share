import {Injectable} from '@angular/core';
import {ExportTabsRequest, ExportTabsResponse} from '../state/export.models';
import {Observable} from 'rxjs';
import {BaseHttpService} from '../../core/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ExportHttpService extends BaseHttpService {
  exportTabs(reqData: ExportTabsRequest): Observable<ExportTabsResponse> {
    const request = this.httpClient.post<ExportTabsResponse>(`${this.BASE_URL}/export`, reqData)
    return this.handleRequest(request)
  }
}
