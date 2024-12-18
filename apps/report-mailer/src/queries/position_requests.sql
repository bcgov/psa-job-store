-- requires_parameters: true

SELECT
    pr.title,
    pr.position_number,
    c.name AS classification,
    pr.submitted_at,
    pr.approved_at,
    COALESCE(
        ROUND(pr.time_to_approve / 86400),
        ROUND(EXTRACT(EPOCH FROM (pr.approved_at - pr.submitted_at)) / 86400)
    ) AS time_to_approve_days,
    u.name AS user_name,
    d.name AS department_name,
    o.name AS organization_name
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
    pr.submitted_at >= $1 AND
    pr.submitted_at < $2;