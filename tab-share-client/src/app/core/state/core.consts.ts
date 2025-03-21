import { ToastStyle, ToastType } from './core.models';

export const DESIRED_URL_PREFIXES = ['http://', 'https://'];

export enum AppRoutesPaths {
  LANDING_PAGE = 'home',
  IMPORT = 'import',
  EXPORT = 'export',
  CODE = 'code',
}

export const CODE_LENGTH = 6;

export enum ApiErrorMessageCode {
  INVALID_CODE = 'invalid_code',
  MISSING_CODE = 'missing_code',
}

export const TOAST_STYLE_MAP: { [P in ToastType]: ToastStyle } = {
  error: {
    icon: 'ph-x-circle',
    color: '#ef4444',
  },
  info: {
    icon: 'ph-info',
    color: 'white',
  },
  success: {
    icon: 'ph-check-circle',
    color: '#84cc16',
  },
  warning: {
    icon: 'ph-warning',
    color: '#eab308',
  },
};

export const ApiErrorMessageDictionary: { [P in ApiErrorMessageCode]: string } = {
  [ApiErrorMessageCode.INVALID_CODE]: 'Invalid import code',
  [ApiErrorMessageCode.MISSING_CODE]: 'Import code is required',
};
