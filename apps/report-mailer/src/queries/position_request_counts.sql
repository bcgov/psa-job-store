-- requires_parameters: startDate, endDate, organizations
SELECT
    COUNT(*) FILTER (WHERE status = 'VERIFICATION') AS "In Verification",
    COUNT(*) FILTER (WHERE status = 'ACTION_REQUIRED') AS "Action Required",
    COUNT(*) FILTER (WHERE status = 'REVIEW') AS "In Classifcation Review",
    COUNT(*) FILTER (WHERE status = 'CANCELLED') AS "Cancelled",
    COUNT(*) FILTER (WHERE status = 'COMPLETED') AS "Completed",
    COUNT(*) FILTER (WHERE approval_type = 'AUTOMATIC') AS "Automatically Approved",
    COUNT(*) FILTER (
        WHERE approval_type = 'VERIFIED' AND status = 'COMPLETED'
    ) AS "Verified and Completed",
    COUNT(*) FILTER (
        WHERE approval_type = 'VERIFIED' AND status IS DISTINCT FROM 'COMPLETED'
    ) AS "Verified but Not Completed"
FROM
    position_request pr
LEFT JOIN department d ON
    pr.department_id = d.id
LEFT JOIN organization o ON
    d.organization_id = o.id
WHERE
    TO_CHAR(pr.submitted_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') >= $1 AND
    TO_CHAR(pr.approved_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') < $2 AND
    (
        COALESCE(array_length($3::text[], 1), 0) = 0 OR o.id = ANY($3::text[])
    );