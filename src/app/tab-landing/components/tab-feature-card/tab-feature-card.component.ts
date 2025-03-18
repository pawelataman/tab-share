import { Component, input } from '@angular/core';

interface TabFeatureCardProps {
  title: string;
  description: string;
  tip: string;
  action: string;
  icon: string;
}

@Component({
  selector: 'app-tab-feature-card',
  imports: [],
  templateUrl: './tab-feature-card.component.html',
})
export class TabFeatureCardComponent {
  data = input<TabFeatureCardProps>({
    tip: '',
    action: '',
    description: '',
    title: '',
    icon: '',
  });
}
