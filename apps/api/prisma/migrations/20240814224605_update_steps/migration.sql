UPDATE "position_request" AS pr
SET "step" = 1
WHERE pr."status" = 'DRAFT'
AND "step" > 0 AND "step" < 4;