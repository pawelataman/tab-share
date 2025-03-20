import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TabListItemComponent } from '../../../shared/ui/tab-list-item/tab-list-item.component';
import { ImportTab } from '../../state/import.models';

@Component({
  selector: 'app-tab-import-preview',
  imports: [ButtonComponent, TabListItemComponent],
  templateUrl: './tab-import-preview.component.html',
  styleUrl: './tab-import-preview.component.scss',
})
export class TabImportPreviewComponent {
  importedTabs = input.required<ImportTab[]>();
  open = output<void>();

  openTabs(): void {
    if (this.importedTabs.length) {
      this.open.emit();
    }
  }
}
