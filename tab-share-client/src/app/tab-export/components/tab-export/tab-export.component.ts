import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ChromeTabWithId } from '../../../core/state/core.models';
import { TabExportListItemComponent } from '../tab-export-list-item/tab-export-list-item.component';
import { ExportFacade } from '../../state/export.facade';
import { Router } from '@angular/router';
import { AppRoutesPaths } from '../../../core/state/core.consts';
import { ExportTab } from '../../state/export.models';

@Component({
  selector: 'app-tab-export',
  imports: [ButtonComponent, TabExportListItemComponent],
  templateUrl: './tab-export.component.html',
})
export class TabExportComponent implements OnInit {
  exportFacade = inject(ExportFacade);
  router = inject(Router);
  $currentWindowTabs = this.exportFacade.$currentWindowTabs;
  $excludedCount = computed(() => this.exportFacade.$excludedTabsArr().length);
  $excludedTabsMap = this.exportFacade.$excludedTabs;
  $selectedCount = computed(() => this.$currentWindowTabs().length - this.$excludedCount());

  ngOnInit(): void {
    this.exportFacade.loadTabs();
  }

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
    const tabsToExport: ExportTab[] = this.$currentWindowTabs()
      .filter(tab => !this.$excludedTabsMap()[tab.id])
      .map(
        tab =>
          ({
            url: tab.url,
            name: tab.title,
            favIconUrl: tab.favIconUrl,
          }) as ExportTab
      );

    this.exportFacade.exportTabs({ tabs: tabsToExport });
  }

  goHome(): void {
    this.router.navigate(['/', AppRoutesPaths.LANDING_PAGE]);
  }
}
