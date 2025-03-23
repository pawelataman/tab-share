package handlers

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
	"log/slog"
	"tab-share.com/internal/api/models"
	"tab-share.com/internal/api/validation"
	"tab-share.com/internal/database/generated"
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

	// generate export code
	generatedExportCode := services.GenerateExportCode(6)

	return h.db.TxManager.CreateTransaction(c.Context()).Execute(func(tx pgx.Tx, ctx context.Context) error {

		// insert code into db
		insertedExportCode, err := h.db.Queries.WithTx(tx).InsertCode(ctx, generatedExportCode)

		if err != nil {
			slog.Error(err.Error())
			return err
		}

		for _, tab := range body.Tabs {

			// insert each tab into db
			insertedTab, err := h.db.Queries.WithTx(tx).InsertTab(ctx, generated.InsertTabParams{
				Name:       tab.Name,
				Url:        tab.Url,
				FaviconUrl: tab.FaviconUrl,
			})

			if err != nil {
				return err
			}

			// save inserted tab and export code correlation into db
			if err = h.db.Queries.WithTx(tx).InsertExportTabCode(ctx, generated.InsertExportTabCodeParams{
				TabID:  insertedTab.ID,
				CodeID: insertedExportCode.ID,
			}); err != nil {
				return err
			}
		}

		response := models.ExportResponse{
			Code: insertedExportCode.Code,
		}

		return c.JSON(response)
	})
}
