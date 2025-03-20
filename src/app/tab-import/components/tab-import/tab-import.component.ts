import { Component, computed, inject } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { AppRoutesPaths } from '../../../core/state/core.consts';
import { ChromeFacade } from '../../../core/services/chrome-facade';
import { Router } from '@angular/router';
import { ImportFacade } from '../../state/import.facade';
import { TabImportCodeComponent } from '../tab-import-code/tab-import-code.component';
import { TabImportPreviewComponent } from '../tab-import-preview/tab-import-preview.component';

@Component({
  selector: 'app-tab-import',
  imports: [CodeInputModule, TabImportCodeComponent, TabImportPreviewComponent],
  templateUrl: './tab-import.component.html',
})
export class TabImportComponent {
  importFacade = inject(ImportFacade);
  chromeFacade = inject(ChromeFacade);
  router = inject(Router);
  $importedTabs = this.importFacade.$tabs;

  $isPreview = computed(() => this.$importedTabs() && this.$importedTabs().length);

  openTabs(): void {
    this.chromeFacade.openTabs(this.$importedTabs().map(importedTab => importedTab.url));
  }

  importTabs(code: string): void {
    this.importFacade.importTabs({ code });
  }

  home(): void {
    this.router.navigate(['/', AppRoutesPaths.LANDING_PAGE]);
  }

  onReimport(): void {
    this.importFacade.resetState();
  }
}
