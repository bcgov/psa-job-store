-- set max step to current step for old position requests

UPDATE "position_request" SET "max_step_completed" = "step" WHERE "max_step_completed" IS NULL;