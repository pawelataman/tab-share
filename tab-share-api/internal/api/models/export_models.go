package models

type ExportTab struct {
	Name       string `json:"name" validate:"required,min=1" mod:"trim"`
	FaviconUrl string `json:"favIconUrl" validate:"required,min=1" mod:"trim"`
	Url        string `json:"url" validate:"required,url" mod:"trim"`
}

type ExportRequest struct {
	Tabs []ExportTab `json:"tabs" validate:"required,dive"`
}

type ExportResponse struct {
	Code string `json:"code" validate:"required,min=6,max=6"`
}
