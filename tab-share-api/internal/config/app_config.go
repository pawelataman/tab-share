package config

import (
	"fmt"
	_ "github.com/joho/godotenv/autoload"
	"os"
)

var (
	dbUrl  = os.Getenv("DB_URL")
	dbName = os.Getenv("DB_NAME")
)

type AppConfig struct {
	Dsn string
}

func New() AppConfig {
	return AppConfig{
		Dsn: fmt.Sprintf("%s/%s?sslmode=disable&search_path=public", dbUrl, dbName),
	}
}
