import {Routes} from '@angular/router';
import {TabImportComponent} from './tab-import/components/tab-import/tab-import.component';
import {TabExportComponent} from './tab-export/components/tab-export/tab-export.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'export',
    pathMatch: 'full'
  },
  {
    path: 'import',
    component: TabImportComponent
  },
  {
    path: 'export',
    component: TabExportComponent
  }
];
