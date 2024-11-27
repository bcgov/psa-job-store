-- To import csv data and update the table from it

psql -d api << EOF
BEGIN;
CREATE TEMP TABLE temp_users (id string, metadata jsonb);
\copy temp_users FROM 'users.csv' WITH CSV HEADER;
UPDATE public."user" u 
SET metadata = t.metadata 
FROM temp_users t 
WHERE u.id = t.id;
DROP TABLE temp_users;
COMMIT;
EOF