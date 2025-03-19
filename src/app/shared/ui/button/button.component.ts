import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

type SizeVariants = 'sm' | 'md' | 'lg';
type TypeVariants = 'primary' | 'secondary' | 'tertiary';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  prefixIcon = input<string>();
  suffixIcon = input<string>();
  size = input<SizeVariants>('md');
  variant = input<TypeVariants>('primary');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);

  buttonSize: { [P in SizeVariants]: string } = {
    sm: 'h-12 px-4 py-2 text-xl',
    md: 'h-16 px-8 py-4 text-2xl',
    lg: 'h-20 px-12 py-8 text-4xl',
  };
 
  iconSize: { [P in SizeVariants]: string } = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  buttonStyle: { [P in TypeVariants]: string } = {
    primary: 'active:bg-indigo-600 shadow-indigo-500/50 text-white bg-indigo-500 hover:bg-indigo-500/90 shadow-sm',
    secondary: '',
    tertiary: 'text-indigo-100 active:bg-indigo-500/20 hover:bg-indigo-500/10 border border-slate-800',
  };
}
