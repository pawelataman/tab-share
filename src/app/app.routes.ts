import {Routes} from '@angular/router';
import {TabImportComponent} from './tab-import/components/tab-import/tab-import.component';
import {TabExportComponent} from './tab-export/components/tab-export/tab-export.component';
import {TabExportCodeComponent} from './tab-export/components/tab-export-code/tab-export-code.component';
import {TabLandingComponent} from './tab-landing/components/tab-landing/tab-landing.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: TabLandingComponent
  },
  {
    path: 'import',
    component: TabImportComponent
  },
  {
    path: 'export',
    component: TabExportComponent
  },
  {
    path: 'export/code',
    component: TabExportCodeComponent
  }
];
