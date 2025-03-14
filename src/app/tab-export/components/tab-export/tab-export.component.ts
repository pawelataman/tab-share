import {Component, computed, inject, signal} from '@angular/core';
import {ChromeFacadeService} from '../../../core/services/chrome-facade.service';
import {DESIRED_URL_PREFIXES} from '../../../core/state/consts';
import {ButtonComponent} from '../../../shared/ui/button/button.component';
import {Tab} from '../../../core/state/models';
import {TabExportListItemComponent} from '../tab-export-list-item/tab-export-list-item.component';

@Component({
  selector: 'app-tab-export',
  imports: [
    ButtonComponent,
    TabExportListItemComponent
  ],
  templateUrl: './tab-export.component.html',
})
export class TabExportComponent {
  chromeFacade = inject(ChromeFacadeService)
  $tabs = computed(() => this.chromeFacade.$tabsResource.value().filter(tab => DESIRED_URL_PREFIXES.some(prefix => tab.url?.includes(prefix))))
  $excludedTabs = signal<{ [key: string]: boolean }>({})
  $excludedTabsCount = computed(() => Object.values(this.$excludedTabs()).filter(Boolean).length)
  $selectedCount = computed(() => this.$tabs().length - this.$excludedTabsCount())

  onTabToggle(tab: Tab): void {
    const tabId = tab.url || ''
    this.$excludedTabs.update(prev => {
      return {
        ...prev,
        [tabId]: !prev[tabId]
      }
    })
  }

  selectAll(): void {
    this.$excludedTabs.set({})
  }

  deselectAll(): void {
    const excluded: { [key: string]: boolean } = this.$tabs().reduce((acc, curr) => ({
      ...acc,
      [String(curr.url)]: true
    }), {})
    this.$excludedTabs.set(excluded)
  }
}
