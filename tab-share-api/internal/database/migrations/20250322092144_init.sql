-- +goose Up
-- +goose StatementBegin
CREATE DATABASE IF NOT EXISTS "tab-share-api-db";

CREATE TABLE IF NOT EXISTS "export_codes" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "code" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "tabs" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "favicon_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "export_tabs"
(
    "tab_id"      integer     NOT NULL references tabs (id),
    "code_id" integer     NOT NULL references export_codes (id),
    PRIMARY KEY ("tab_id", "code_id")
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE "export_tabs";
DROP TABLE "tabs";
DROP TABLE "export_codes";
DROP DATABASE "tab-share-api-db";
-- +goose StatementEnd
