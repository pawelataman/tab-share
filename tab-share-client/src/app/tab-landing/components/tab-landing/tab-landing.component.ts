import {Component} from '@angular/core';
import {CardComponent} from '../../../shared/ui/card/card.component';
import {RouterLink} from '@angular/router';
import {TabFeatureCardComponent} from '../tab-feature-card/tab-feature-card.component';

@Component({
  selector: 'app-tab-landing',
  imports: [
    CardComponent,
    RouterLink,
    TabFeatureCardComponent
  ],
  templateUrl: './tab-landing.component.html',
})
export class TabLandingComponent {

  protected readonly TabFeatureCardComponent = TabFeatureCardComponent;
}
