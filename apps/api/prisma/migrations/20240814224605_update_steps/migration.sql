UPDATE "position_request" AS pr
SET "step" = 2
WHERE pr."state" != 'COMPLETED';