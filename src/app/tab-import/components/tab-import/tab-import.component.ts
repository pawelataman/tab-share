import { Component, computed, inject, model } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ImportFacade } from '../../state/import.facade';
import { CODE_LENGTH } from '../../../core/state/core.consts';

@Component({
  selector: 'app-tab-import',
  imports: [CodeInputModule, ButtonComponent],
  templateUrl: './tab-import.component.html',
  styleUrl: 'tab-import.component.scss',
})
export class TabImportComponent {
  code = model('');
  $canImport = computed(() => this.code() && this.code().length === this.CODE_LENGTH);
  importFacade = inject(ImportFacade);

  onCodeChanged(code: string) {
    console.log('code changed', code);
    this.code.set(code);
  }

  onCodeCompleted(code: string) {
    console.log('code completed', code);
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

  protected readonly CODE_LENGTH = CODE_LENGTH;
}
