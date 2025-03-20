export type ChromeTab = chrome.tabs.Tab;
export type ChromeTabWithId = { id: string; url: string } & ChromeTab;

export interface AppError {
  id: string;
  timestamp: Date;
  code: string;
  handled: boolean;
}

export type CoreState = {
  isLoading: boolean;
  error: AppError | null;
};

export type ToastType = 'error' | 'info' | 'warning' | 'success';

export interface Toast {
  type: ToastType;
  message: string;
  id: string;
}

export interface ToastStyle {
  color: string;
  icon: string;
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
