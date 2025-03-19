import { Component, computed, inject, model } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ImportFacade } from '../../state/import.facade';
import { AppRoutesPaths, CODE_LENGTH } from '../../../core/state/core.consts';
import { TabListItemComponent } from '../../../shared/ui/tab-list-item/tab-list-item.component';
import { ChromeFacade } from '../../../core/services/chrome-facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-import',
  imports: [CodeInputModule, ButtonComponent, TabListItemComponent],
  templateUrl: './tab-import.component.html',
  styleUrl: 'tab-import.component.scss',
})
export class TabImportComponent {
  protected readonly CODE_LENGTH = CODE_LENGTH;
  importFacade = inject(ImportFacade);
  chromeFacade = inject(ChromeFacade);
  router = inject(Router);
  code = model('');
  $canImport = computed(() => this.code() && this.code().length === this.CODE_LENGTH);
  $importedTabs = this.importFacade.$tabs;

  onCodeChanged(code: string) {
    this.code.set(code);
  }

  async clipboard(): Promise<void> {
    const codeFromClipboard = await navigator.clipboard.readText();
    if (codeFromClipboard && codeFromClipboard.length === CODE_LENGTH) {
      this.code.set(codeFromClipboard);
    }
  }

  import(): void {
    if (this.$canImport()) {
      this.importFacade.importTabs({ code: this.code() });
    }
  }

  openTabs(): void {
    if (this.$importedTabs().length) {
      this.chromeFacade.openTabs(this.$importedTabs().map(importedTab => importedTab.url));
    }
  }

  goToExport(): void {
    this.router.navigate(['/', AppRoutesPaths.EXPORT]);
  }
}
