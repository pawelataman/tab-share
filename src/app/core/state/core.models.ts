export type ChromeTab = chrome.tabs.Tab
export type ChromeTabWithId = { id: string, url: string } & ChromeTab
export type CoreState = {
  isLoading: boolean
}
