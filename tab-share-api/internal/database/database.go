package database

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"tab-share.com/internal/config"
	"tab-share.com/internal/database/generated"
)

type Database struct {
	Queries        *generated.Queries
	TxManager      ITransactionManager
	connectionPool *pgxpool.Pool
}

func CreateDatabase(ctx context.Context, cfg config.AppConfig) (*Database, error) {
	connectionPool, err := pgxpool.New(ctx, cfg.Dsn)
	if err != nil {
		return nil, err
	}
	queries := generated.New(connectionPool)
	txManager := NewTransactionManager(connectionPool)

	return &Database{
		Queries:        queries,
		TxManager:      txManager,
		connectionPool: connectionPool,
	}, nil

}

func (db *Database) Dispose() {
	db.connectionPool.Close()
}

func (db *Database) Ping(ctx context.Context) error {
	return db.connectionPool.Ping(ctx)
}
