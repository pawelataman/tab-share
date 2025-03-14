import {Component, inject} from '@angular/core';
import {ExportFacade} from '../../state/export.facade';
import {ButtonComponent} from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-tab-export-code',
  imports: [
    ButtonComponent
  ],
  templateUrl: './tab-export-code.component.html',
})
export class TabExportCodeComponent {
  exportFacade = inject(ExportFacade)
  $exportCode = this.exportFacade.$exportCode

}
