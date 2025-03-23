package models

type ImportTabsQueryParams struct {
	Code string `json:"code" params:"code" validate:"required,min=6,max=6" mod:"trim"`
}

type ImportTab struct {
	Name       string `json:"name"`
	FaviconUrl string `json:"favIconUrl"`
	Url        string `json:"url"`
}
type ImportTabsResponse struct {
	Tabs []ImportTab `json:"tabs"`
}
