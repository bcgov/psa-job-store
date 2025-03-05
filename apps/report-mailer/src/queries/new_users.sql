-- requires_parameters: startDate, endDate
SELECT
    u.name,
    u.roles,
    (
        SELECT COUNT(*)
        FROM current_job_profiles cjp
        WHERE cjp.published_by_id = u.id AND cjp.state = 'PUBLISHED'
    ) AS job_profiles_published,
    (
        SELECT COUNT(*)
        FROM position_request pr
        WHERE pr.user_id = u.id
        AND pr.status = 'COMPLETED'
    ) AS position_requests_completed
FROM
    "user" u
WHERE
    array_length(u.roles, 1) > 0 AND
    (u.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') >= $1 AND
    (u.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles') < $2;