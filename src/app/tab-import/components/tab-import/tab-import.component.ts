import { Component, computed, model } from '@angular/core';
import { CodeInputModule } from 'angular-code-input';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-tab-import',
  imports: [CodeInputModule, ButtonComponent],
  templateUrl: './tab-import.component.html',
  styleUrl: 'tab-import.component.scss',
})
export class TabImportComponent {
  CODE_LENGTH = 6;
  code = model('');
  $canImport = computed(
    () => this.code() && this.code().length === this.CODE_LENGTH
  );

  onCodeChanged(code: string) {
    console.log('code changed', code);
    this.code.set(code);
  }

  onCodeCompleted(code: string) {
    console.log('code completed', code);
  }
}
