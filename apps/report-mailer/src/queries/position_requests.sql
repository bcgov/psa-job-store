-- requires_parameters: startDate, endDate, organizations
SELECT
    pr.title AS "Title",
    pr.position_number AS "Position number",
    c.name AS "Classification",
    -- Convert 'submitted_at' to PST and format it
	pr.submitted_at ,
   -- Convert 'submitted_at' from UTC to PST and format it
    TO_CHAR(pr.submitted_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') AS submitted_at_pst,
    -- Convert 'approved_at' from UTC to PST and format it
    TO_CHAR(pr.approved_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') AS approved_at_pst,
       COALESCE(
        ROUND(pr.time_to_approve / 86400),
        ROUND(EXTRACT(EPOCH FROM (pr.approved_at - pr.submitted_at)) / 86400)
    ) AS "Days to apprive",
    u.name AS  "Username",
    d.name AS  "Department name",
    o.name AS  "Organization name"
FROM
    position_request pr
LEFT JOIN classification c ON
    pr.classification_id = c.id AND
    pr.classification_employee_group_id = c.employee_group_id AND
    pr.classification_peoplesoft_id = c.peoplesoft_id
LEFT JOIN "user" u ON
    pr.user_id = u.id
LEFT JOIN department d ON
    pr.department_id = d.id
LEFT JOIN organization o ON
    d.organization_id = o.id
WHERE
    pr.status = 'COMPLETED' AND
    TO_CHAR(pr.submitted_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') >= $1 AND
    TO_CHAR(pr.approved_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') < $2 AND
     (
        COALESCE(array_length($3::text[], 1), 0) = 0 OR o.id = ANY($3::text[])
    );