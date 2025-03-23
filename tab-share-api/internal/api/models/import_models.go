package models

type ImportTabsQueryParams struct {
	Code string `json:"code" params:"code" validate:"required,min=6,max=6" mod:"trim"`
}
