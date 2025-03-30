-- +goose Up
-- +goose StatementBegin
ALTER TABLE "tabs"
    ALTER COLUMN "favicon_url" DROP NOT NULL;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE "tabs"
    ALTER COLUMN "favicon_url" SET NOT NULL;
-- +goose StatementEnd
