import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ChromeTabWithId} from '../../../core/state/core.models';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-tab-export-list-item',
  imports: [
    NgClass
  ],
  templateUrl: './tab-export-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabExportListItemComponent {
  tab = input.required<ChromeTabWithId>()
  excluded = input<boolean>(false)
}
