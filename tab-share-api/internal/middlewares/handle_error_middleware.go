package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"log/slog"
	"tab-share.com/internal/api/errors"
)

func HandleErrorMiddleware(c *fiber.Ctx) error {

	defer func() {
		if err := recover(); err != nil {
			if er, ok := err.(error); ok {
				slog.Error(er.Error())
			}
			_ = c.SendStatus(fiber.StatusInternalServerError)
		}

	}()

	if err := c.Next(); err != nil {
		if e, ok := err.(errors.ApiError); ok {
			return c.Status(e.Code).JSON(e)
		}
		slog.Error(err.Error(), err)
		return fiber.ErrInternalServerError
	}
	return nil
}
