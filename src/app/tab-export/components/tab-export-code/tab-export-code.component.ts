import { Component, inject } from '@angular/core';
import { ExportFacade } from '../../state/export.facade';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { AppRoutesPaths } from '../../../core/state/core.consts';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ToastService } from '../../../core/features/toaster/services/toast.service';

@Component({
  selector: 'app-tab-export-code',
  imports: [ButtonComponent, CardComponent],
  templateUrl: './tab-export-code.component.html',
  styleUrl: 'tab-export-code.component.scss',
})
export class TabExportCodeComponent {
  private router = inject(Router);
  private toastService = inject(ToastService);

  exportFacade = inject(ExportFacade);
  $exportCode = this.exportFacade.$exportCode;

  backToTabs(): void {
    this.router.navigate(['/', AppRoutesPaths.EXPORT]);
  }

  async copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(this.$exportCode());
    this.toastService.pushToast({ id: Date.now().toString(), type: 'success', message: 'Copied to clipboard' });
  }
}
