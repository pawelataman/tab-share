import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Tab} from '../../../core/state/models';
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
  tab = input.required<Tab>()
  selected = input<boolean>()
  excluded = input<boolean>(false)
}
