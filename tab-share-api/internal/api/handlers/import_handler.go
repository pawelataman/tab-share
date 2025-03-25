package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"tab-share.com/internal/api/errors"
	"tab-share.com/internal/api/models"
	"tab-share.com/internal/api/validation"
)

func NewImportHandler(params RouteHandlerParams) *RouteHandler {
	handler := &RouteHandler{
		db: params.Db,
	}
	params.App.Get("/import", handler.handleImportTabs)
	return handler
}

func (h *RouteHandler) handleImportTabs(c *fiber.Ctx) error {
	var params models.ImportTabsQueryParams

	if err := validation.ParseQuery(c, &params); err != nil {
		return err
	}

	// find if provided code exists in db
	code, err := h.db.Queries.SelectCode(c.Context(), params.Code)

	if err != nil {
		return errors.NewApiErr(fiber.StatusNotFound, fmt.Errorf(errors.CodeNotFound))
	}

	// select tabs by code id
	tabs, err := h.db.Queries.SelectExportedTabs(c.Context(), code.ID)

	if err != nil {
		return err
	}

	importTabs := make([]models.ImportTab, len(tabs))

	for index, tab := range tabs {
		importTabs[index] = models.ImportTab{
			Name:       tab.Name,
			Url:        tab.Url,
			FaviconUrl: tab.FaviconUrl,
		}
	}

	response := models.ImportTabsResponse{
		Tabs: importTabs,
	}

	return c.JSON(response)
}
