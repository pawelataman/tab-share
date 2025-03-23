package handlers

import (
	"github.com/gofiber/fiber/v2"
	"tab-share.com/internal/api/models"
	"tab-share.com/internal/api/validation"
)

func NewImportHandler(params RouteHandlerParams) *RouteHandler {
	handler := &RouteHandler{
		db: params.Db,
	}
	params.App.Get("/import/:code", handler.handleImportTabs)
	return handler
}

func (h *RouteHandler) handleImportTabs(c *fiber.Ctx) error {
	var params models.ImportTabsQueryParams

	if err := validation.ParseParams(c, &params); err != nil {
		return err
	}

	return nil
}
