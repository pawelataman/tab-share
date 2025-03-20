import { Component, computed, input } from '@angular/core';
import { Toast } from '../../../../state/core.models';
import { NgStyle } from '@angular/common';
import { TOAST_STYLE_MAP } from '../../../../state/core.consts';

@Component({
  selector: 'app-toast',
  imports: [NgStyle],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toast = input.required<Toast>();
  $toastStyle = computed(() => {
    return TOAST_STYLE_MAP[this.toast().type];
  });
}
