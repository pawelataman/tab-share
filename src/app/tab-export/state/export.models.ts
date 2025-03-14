import {ChromeTabWithId} from '../../core/state/core.models';

export type ExportState = {
  excludedTabs: ExcludedTabs,
  currentWindowTabs: ChromeTabWithId[]
  exportCode: string
}

export type ExcludedTabs = { [key: string]: boolean }

export type ExportTabsRequest = {
  url: string[]
}

export type ExportTabsResponse = {
  code: string
}

export type ImportTabsRequest = {
  code: string
}

export type ImportTabsResponse = {
  url: string[]
}
