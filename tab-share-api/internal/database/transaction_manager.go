package database

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"log/slog"
)

type ITransactionManager interface {
	CreateTransaction(ctx context.Context) ITransaction
}

type transactionManager struct {
	pool *pgxpool.Pool
}

func NewTransactionManager(pool *pgxpool.Pool) ITransactionManager {
	return &transactionManager{
		pool: pool,
	}
}

func (t *transactionManager) CreateTransaction(ctx context.Context) ITransaction {
	return &transaction{ctx: ctx, pool: t.pool}
}

type ITransaction interface {
	begin() error
	Execute(fn func(tx pgx.Tx, ctx context.Context) error) error
	commit() error
	rollback() error
}

type transaction struct {
	pool *pgxpool.Pool
	ctx  context.Context
	tx   pgx.Tx
}

func (t *transaction) begin() error {
	tx, err := t.pool.Begin(t.ctx)
	if err != nil {
		return err
	}
	t.tx = tx
	return nil
}

func (t *transaction) commit() error {
	if t.tx == nil {
		return fmt.Errorf("transaction does not exist")
	}
	return t.tx.Commit(t.ctx)
}

func (t *transaction) rollback() error {
	if t.tx == nil {
		return fmt.Errorf("transaction does not exist")
	}
	return t.tx.Rollback(t.ctx)
}

func (t *transaction) Execute(fn func(tx pgx.Tx, ctx context.Context) error) error {
	if err := t.begin(); err != nil {
		slog.Error("could not start transaction", err.Error())
		return err
	}

	if err := fn(t.tx, t.ctx); err != nil {
		slog.Error("transaction failed", err.Error())
		if rollErr := t.rollback(); rollErr != nil {
			slog.Error("rolling back error", rollErr)
		}
		return err
	}
	return t.commit()
}
