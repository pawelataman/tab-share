import { computed, Injectable, signal } from '@angular/core';
import { Toast } from '../../../state/core.models';

const DURATION = 3_000;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private $toasts = signal<Toast[]>([]);
  $displayToasts = computed(() => this.$toasts());

  pushToast(toast: Toast): void {
    this.$toasts.update(queue => [...queue, toast]);
    setTimeout(() => this.removeToast(toast), DURATION);
  }

  removeToast(toast: Toast) {
    const afterRemove = this.$toasts().filter(t => t.id !== toast.id);
    this.$toasts.set(afterRemove);
  }
}
