export type ImportTab = {
  url: string;
  name: string;
  faviconUrl: string;
};

export type ImportState = {
  tabs: ImportTab[];
};

export type ImportTabsRequest = {
  code: string;
};

export type ImportTabsResponse = {
  tabs: ImportTab[];
};
