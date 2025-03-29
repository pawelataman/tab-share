package main

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"log"
	"os/signal"
	"syscall"
	"tab-share.com/internal/api/handlers"
	"tab-share.com/internal/api/validation"
	"tab-share.com/internal/config"
	"tab-share.com/internal/database"
	"tab-share.com/internal/middlewares"
	"time"
)

func main() {
	ctx := context.Background()
	_ = godotenv.Load()
	cfg := config.New()
	db, err := database.CreateDatabase(ctx, cfg)

	if err != nil {
		log.Fatalf("could not init db %v", err)
	}
	if err = db.Ping(ctx); err != nil {
		log.Fatalf("could not ping db %v", err)
	}

	app := fiber.New()

	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(middlewares.HandleErrorMiddleware)

	handlers.RegisterRoutes(handlers.RouteHandlerParams{
		Db:  db,
		App: app,
	})

	validation.InitTranslator()

	done := make(chan bool, 1)

	go func(appConfig config.AppConfig) {
		err := app.Listen(":8080")
		if err != nil {
			panic(fmt.Sprintf("http server error: %s", err))
		}
	}(cfg)

	// Run graceful shutdown in a separate goroutine
	go gracefulShutdown(app, done)

	// Wait for the graceful shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}

func gracefulShutdown(app *fiber.App, done chan bool) {
	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Listen for the interrupt signal.
	<-ctx.Done()

	log.Println("shutting down gracefully, press Ctrl+C again to force")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := app.ShutdownWithContext(ctx); err != nil {
		log.Printf("Server forced to shutdown with error: %v", err)
	}

	log.Println("Server exiting")

	// Notify the main goroutine that the shutdown is complete
	done <- true
}
