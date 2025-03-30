import {Component, input} from '@angular/core';

export interface TabListItem {
  url: string;
  favIconUrl?: string;
  name: string;
}

@Component({
  selector: 'app-tab-list-item',
  imports: [],
  templateUrl: './tab-list-item.component.html',
})
export class TabListItemComponent {
  tab = input.required<TabListItem>();
}
