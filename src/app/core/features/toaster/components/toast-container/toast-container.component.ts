import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Toast } from '../../../../state/core.models';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
    ]),
  ],
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  $toasts = this.toastService.$displayToasts;

  closeToast(toast: Toast): void {
    this.toastService.removeToast(toast);
  }
}
