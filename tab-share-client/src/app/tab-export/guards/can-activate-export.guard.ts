import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ExportFacade } from '../state/export.facade';

export const canActivateExportGuard: CanActivateFn = () => {
  const exportFacade = inject(ExportFacade);
  exportFacade.resetState();
  return true;
};
