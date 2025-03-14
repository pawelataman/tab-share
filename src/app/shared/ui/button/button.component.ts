import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

type SizeVariants = 'sm' | 'md' | 'lg'

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  prefixIcon = input<string>()
  suffixIcon = input<string>()
  type = input<SizeVariants>('md')
  disabled = input<boolean>(false)

  button: { [P in SizeVariants]: string } = {
    'sm': 'px-4 py-2 text-xl',
    'md': 'px-8 py-4 text-2xl',
    'lg': 'px-12 py-8 text-4xl'
  }
}
