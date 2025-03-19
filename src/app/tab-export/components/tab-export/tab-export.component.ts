import { Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ChromeTabWithId } from '../../../core/state/core.models';
import { TabExportListItemComponent } from '../tab-export-list-item/tab-export-list-item.component';
import { ExportFacade } from '../../state/export.facade';
import { Router } from '@angular/router';
import { AppRoutesPaths } from '../../../core/state/core.consts';

@Component({
  selector: 'app-tab-export',
  imports: [ButtonComponent, TabExportListItemComponent],
  templateUrl: './tab-export.component.html',
})
export class TabExportComponent {
  exportFacade = inject(ExportFacade);
  router = inject(Router);

  $currentWindowTabs = this.exportFacade.$currentWindowTabs;
  $excludedCount = computed(() => this.exportFacade.$excludedTabsArr().length);
  $excludedTabsMap = this.exportFacade.$excludedTabs;
  $selectedCount = computed(
    () => this.$currentWindowTabs().length - this.$excludedCount()
  );

  onTabToggle(tab: ChromeTabWithId): void {
    const currentlyExcluded = this.$excludedTabsMap();
    currentlyExcluded[tab.id] = !currentlyExcluded[tab.id];
    this.exportFacade.setExcludedTabs({ ...currentlyExcluded });
  }

  selectAll(): void {
    this.exportFacade.setExcludedTabs({});
  }

  deselectAll(): void {
    const excludedTabsMap = this.$currentWindowTabs().reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: true,
      }),
      {}
    );
    this.exportFacade.setExcludedTabs(excludedTabsMap);
  }

  exportTabs() {
    const tabsToExport = this.$currentWindowTabs().filter(
      tab => !this.$excludedTabsMap[tab.id]
    );
    this.exportFacade.exportTabs({ url: tabsToExport.map(tabs => tabs.url) });
  }

  goHome(): void {
    this.router.navigate(['/', AppRoutesPaths.LANDING_PAGE]);
  }
}
