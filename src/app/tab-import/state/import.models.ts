export type ImportTab = {
  url: string;
  name: string;
  favIconUrl: string;
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
