import { Component, computed, inject, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CodeInputModule } from 'angular-code-input';
import { CODE_LENGTH } from '../../../core/state/core.consts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-import-code',
  imports: [ButtonComponent, CodeInputModule],
  templateUrl: './tab-import-code.component.html',
  styleUrl: './tab-import-code.component.scss',
})
export class TabImportCodeComponent {
  protected readonly CODE_LENGTH = CODE_LENGTH;
  private router = inject(Router);
  $code = signal('');
  $isValid = computed(() => this.$code() && this.$code().length === this.CODE_LENGTH);
  submit = output<string>();

  onCodeChanged(code: string) {
    this.$code.set(code);
  }

  submitCode(): void {
    if (this.$isValid()) {
      this.submit.emit(this.$code());
    }
  }

  home(): void {
    this.router.navigate(['/']);
  }

  async clipboard(): Promise<void> {
    const codeFromClipboard = await navigator.clipboard.readText();
    if (codeFromClipboard && codeFromClipboard.length === CODE_LENGTH) {
      this.$code.set(codeFromClipboard);
    }
  }
}
