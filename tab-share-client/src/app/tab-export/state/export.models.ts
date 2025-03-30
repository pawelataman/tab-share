import {ChromeTabWithId} from '../../core/state/core.models';

export type ExportState = {
  excludedTabs: ExcludedTabs;
  currentWindowTabs: ChromeTabWithId[];
  exportCode: string;
};

export type ExportTab = {
  url: string;
  name: string;
  favIconUrl?: string;
};

export type ExcludedTabs = { [key: string]: boolean };

export type ExportTabsRequest = {
  tabs: ExportTab[];
};

export type ExportTabsResponse = {
  code: string;
};
