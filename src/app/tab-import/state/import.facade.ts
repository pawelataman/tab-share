import { inject, Injectable } from '@angular/core';
import { ImportStore } from './import.state';
import { ImportTabsRequest } from './import.models';

@Injectable({
  providedIn: 'root',
})
export class ImportFacade {
  private importStore = inject(ImportStore);
  $tabs = this.importStore.tabs;

  importTabs(request: ImportTabsRequest): void {
    this.importStore.importTabs(request);
  }
}
