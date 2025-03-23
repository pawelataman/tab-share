package config

import (
	"fmt"
	_ "github.com/joho/godotenv/autoload"
	"os"
)

var (
	database = os.Getenv("DB_DATABASE")
	password = os.Getenv("DB_PASSWORD")
	username = os.Getenv("DB_USERNAME")
	dbPort   = os.Getenv("DB_PORT")
	host     = os.Getenv("DB_HOST")
	schema   = os.Getenv("DB_SCHEMA")
	appPort  = os.Getenv("PORT")
)

type AppConfig struct {
	Database string
	Password string
	Username string
	DbPort   string
	Host     string
	Schema   string
	AppPort  string
	Dsn      string
}

func New() AppConfig {
	return AppConfig{
		Database: database,
		Host:     host,
		Password: password,
		DbPort:   dbPort,
		AppPort:  appPort,
		Schema:   schema,
		Username: username,
		Dsn:      fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable&search_path=%s", username, password, host, dbPort, database, schema),
	}
}
