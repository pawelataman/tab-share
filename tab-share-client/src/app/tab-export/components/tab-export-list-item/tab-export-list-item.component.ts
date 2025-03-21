import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChromeTabWithId } from '../../../core/state/core.models';
import { TabListItem, TabListItemComponent } from '../../../shared/ui/tab-list-item/tab-list-item.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tab-export-list-item',
  imports: [TabListItemComponent, NgClass],
  templateUrl: './tab-export-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabExportListItemComponent {
  tab = input.required<ChromeTabWithId>();
  $tabListItem = computed(
    () =>
      ({
        favIconUrl: this.tab().favIconUrl,
        url: this.tab().url,
        name: this.tab().title,
      }) as TabListItem
  );
  excluded = input<boolean>(false);
}
