import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreStore } from './core/state/core.state';
import { ToastContainerComponent } from './core/features/toaster/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ToastContainerComponent],
})
export class AppComponent {
  $isLoading = inject(CoreStore).isLoading;
}
