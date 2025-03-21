import { Routes } from '@angular/router';
import { TabImportComponent } from './tab-import/components/tab-import/tab-import.component';
import { TabExportComponent } from './tab-export/components/tab-export/tab-export.component';
import { TabExportCodeComponent } from './tab-export/components/tab-export-code/tab-export-code.component';
import { TabLandingComponent } from './tab-landing/components/tab-landing/tab-landing.component';
import { AppRoutesPaths } from './core/state/core.consts';
import { canActivateImportGuard } from './tab-import/guards/can-activate-import.guard';
import { canActivateExportGuard } from './tab-export/guards/can-activate-export.guard';

export const routes: Routes = [
  {
    path: AppRoutesPaths.LANDING_PAGE,
    component: TabLandingComponent,
  },
  {
    path: AppRoutesPaths.IMPORT,
    component: TabImportComponent,
    canActivate: [canActivateImportGuard],
  },
  {
    path: AppRoutesPaths.EXPORT,
    canActivate: [canActivateExportGuard],
    children: [
      {
        path: '',
        component: TabExportComponent,
      },
      {
        path: AppRoutesPaths.CODE,
        component: TabExportCodeComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
  {
    path: '',
    redirectTo: AppRoutesPaths.LANDING_PAGE,
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AppRoutesPaths.LANDING_PAGE,
  },
];
