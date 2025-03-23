package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log/slog"
	"tab-share.com/internal/api/models"
	"tab-share.com/internal/api/validation"
	"tab-share.com/internal/services"
)

func NewExportHandler(params RouteHandlerParams) *RouteHandler {
	handler := &RouteHandler{
		db: params.Db,
	}
	params.App.Post("/export", handler.handleExportTabs)
	return handler
}

func (h *RouteHandler) handleExportTabs(c *fiber.Ctx) error {
	var body models.ExportRequest
	if err := validation.ParseBody(c, &body); err != nil {
		return err
	}

	exportCode := services.GenerateExportCode(6)

	insertedCode, err := h.db.Queries.InsertCode(c.Context(), exportCode)

	if err != nil {
		slog.Error(err.Error())
		return err
	}
	fmt.Println(insertedCode)
	return nil
}
