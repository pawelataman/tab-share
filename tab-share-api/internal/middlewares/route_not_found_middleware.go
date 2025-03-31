package middlewares

import "github.com/gofiber/fiber/v2"

func HandleRouteNotFound(c *fiber.Ctx) error {
	return c.SendStatus(404) // => 404 "Not Found"
}
