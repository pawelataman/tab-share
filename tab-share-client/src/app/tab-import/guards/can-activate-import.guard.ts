import { CanActivateFn } from '@angular/router';
import { ImportFacade } from '../state/import.facade';
import { inject } from '@angular/core';

export const canActivateImportGuard: CanActivateFn = () => {
  const importFacade = inject(ImportFacade);
  importFacade.resetState();
  return true;
};
