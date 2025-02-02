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
    pr.submitted_at >= $1 AND
    pr.submitted_at < $2  AND
    o.id = ANY ($3);