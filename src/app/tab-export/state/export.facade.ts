import { inject, Injectable } from '@angular/core';
import { ExportStore } from './export.state';
import { ExcludedTabs, ExportTabsRequest } from './export.models';

@Injectable({
  providedIn: 'root',
})
export class ExportFacade {
  private exportStore = inject(ExportStore);
  $excludedTabs = this.exportStore.excludedTabs;
  $currentWindowTabs = this.exportStore.validTabs;
  $excludedTabsArr = this.exportStore.excludedTabsArr;
  $exportCode = this.exportStore.exportCode;

  setExcludedTabs(tabs: ExcludedTabs): void {
    this.exportStore.setExcludedTabs(tabs);
  }

  exportTabs(request: ExportTabsRequest): void {
    this.exportStore.exportTabs(request);
  }

  resetState(): void {
    this.exportStore.resetState();
  }
}
