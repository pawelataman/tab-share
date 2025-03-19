export type ChromeTab = chrome.tabs.Tab;
export type ChromeTabWithId = { id: string; url: string } & ChromeTab;

export interface AppError {
  message: string;
}

export type CoreState = {
  isLoading: boolean;
  error: AppError | null;
};
