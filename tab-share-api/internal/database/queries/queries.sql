-- name: InsertCode :one
INSERT INTO "export_codes"("code") VALUES(@code) RETURNING *;

-- name: InsertTab :one
INSERT INTO "tabs"("name","favicon_url","url") VALUES(@name,@favicon_url,@url) RETURNING *;

-- name: InsertExportTabCode :exec
INSERT INTO "export_tabs"("tab_id", "code_id") VALUES(@tab_id, @code_id);

-- name: SelectExportedTabs :many
SELECT * FROM "tabs" INNER JOIN "export_tabs" ON "tabs".id = "export_tabs".tab_id WHERE "export_tabs".code_id = @code_id;

-- name: SelectCode :one
SELECT * FROM "export_codes" WHERE "export_codes".code = @code;