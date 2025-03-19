import { Component, inject, signal } from '@angular/core';
import { ExportFacade } from '../../state/export.facade';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { AppRoutesPaths } from '../../../core/state/core.consts';
import { NgClass } from '@angular/common';

const COPY_TIMEOUT = 2_000;

@Component({
  selector: 'app-tab-export-code',
  imports: [ButtonComponent, NgClass],
  templateUrl: './tab-export-code.component.html',
  styleUrl: 'tab-export-code.component.scss',
})
export class TabExportCodeComponent {
  private router = inject(Router);
  private copyTimeout: any | null = null;
  copied = signal<boolean>(false);

  exportFacade = inject(ExportFacade);
  $exportCode = this.exportFacade.$exportCode;

  backToTabs(): void {
    this.router.navigate(['/', AppRoutesPaths.EXPORT]);
  }

  async copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(this.$exportCode());

    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    this.copied.set(true);

    this.copyTimeout = setTimeout(() => {
      this.copied.set(false);
    }, COPY_TIMEOUT);
  }

  goToImport(): void {
    this.router.navigate(['/', AppRoutesPaths.IMPORT]);
  }
}
