import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CoreStore} from './core/state/core.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  $isLoading = inject(CoreStore).isLoading
}
