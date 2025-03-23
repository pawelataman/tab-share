package handlers

import (
	"github.com/gofiber/fiber/v2"
	"tab-share.com/internal/database"
)

type RouteHandlerParams struct {
	Db  *database.Database
	App *fiber.App
}
type RouteHandler struct {
	db *database.Database
}

func RegisterRoutes(params RouteHandlerParams) {
	NewImportHandler(params)
	NewExportHandler(params)
}
