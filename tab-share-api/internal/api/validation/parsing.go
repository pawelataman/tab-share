package validation

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log/slog"
	"tab-share.com/internal/api/errors"
)

func ParseBody[T interface{}](c *fiber.Ctx, target *T) error {
	// parsing
	if err := c.BodyParser(target); err != nil {
		return fiber.ErrBadRequest
	}
	return modAndValidate(c, target)

}

func ParseQuery[T interface{}](c *fiber.Ctx, target *T) error {
	// parsing
	if err := c.QueryParser(target); err != nil {
		return fiber.ErrBadRequest
	}
	return modAndValidate(c, target)
}

func ParseParams[T interface{}](c *fiber.Ctx, target *T) error {
	// parsing
	if err := c.ParamsParser(target); err != nil {
		return errors.NewApiErr(fiber.StatusBadRequest, fmt.Errorf("parse error"))
	}
	return modAndValidate(c, target)
}

func modAndValidate[T interface{}](c *fiber.Ctx, target *T) error {
	// modifying
	if err := conform.Struct(c.Context(), target); err != nil {
		slog.Error(err.Error())
		return err
	}

	// validating
	if validationErrors, ok := validateStruct(target); !ok {
		return errors.InvalidReqDataErr(validationErrors)
	}
	return nil
}
