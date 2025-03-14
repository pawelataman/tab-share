import {Injectable, resource} from '@angular/core';
import {Tab} from '../state/models';

@Injectable({
  providedIn: 'root'
})
export class ChromeFacadeService {

  $tabsResource = resource({
    defaultValue: [],
    loader: (): Promise<Tab[]> => chrome.tabs.query({currentWindow: true})
  })
}
