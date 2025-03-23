package models

type ExportTab struct {
	Name       string `json:"name" validate:"required,min=1" mod:"trim"`
	FaviconUrl string `json:"favIconUrl" validate:"required,min=1" mod:"trim"`
	Url        string `json:"url" validate:"required,url" mod:"trim"`
}

type ExportRequest struct {
	Tabs []ExportTab `json:"tabs" validate:"required,dive"`
}
