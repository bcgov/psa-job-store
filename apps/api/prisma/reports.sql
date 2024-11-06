-- GET KSA's by job family and stream:

SELECT
    jpjf.name AS job_family,
    jps.name AS job_family_stream,
    TRIM(TRAILING FROM pref->>'text') AS preference,
    STRING_AGG(DISTINCT jp.id::TEXT, ', ') AS profile_ids
FROM
    job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id,
    JSONB_ARRAY_ELEMENTS(jp.preferences) AS pref
WHERE
    jp.preferences IS NOT NULL
    AND pref->>'text' IS NOT NULL
GROUP BY
    jpjf.name,
    jps.name,
    pref->>'text'
ORDER BY
    jpjf.name,
    jps.name,
    TRIM(TRAILING FROM pref->>'text');

-- Willingness statements grouped by text grouped by text

WITH job_family_streams AS (
    SELECT DISTINCT
        jp.id AS job_profile_id,
        jpjf.id AS job_family_id,
        jpjf.name AS job_family_name,
        jps.name AS stream_name
    FROM job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id
),
family_streams_aggregated AS (
    SELECT
        job_profile_id,
        job_family_id,
        job_family_name,
        STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams
    FROM job_family_streams
    GROUP BY job_profile_id, job_family_id, job_family_name
),
grouped_data AS (
    SELECT
        jp.id AS profile_id,
        jp.number,
        ws->>'text' AS willingness_statement,
        jp.all_organizations,
        STRING_AGG(DISTINCT '"' || c.name || '"', ', ') AS classifications,
        CASE
            WHEN jp.all_organizations THEN 'all'
            ELSE STRING_AGG(DISTINCT '"' || o.name || '"', ', ')
        END AS organizations,
        (
            SELECT STRING_AGG(
                CASE
                    WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN
                        fsa.job_family_name || ' (' || fsa.streams || ')'
                    ELSE
                        fsa.job_family_name
                END,
                ', ' ORDER BY fsa.job_family_name
            )
            FROM family_streams_aggregated fsa
            WHERE fsa.job_profile_id = jp.id
        ) AS job_families_and_streams
    FROM
        job_profile jp
        LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id
        LEFT JOIN classification c ON jpc.classification_id = c.id 
            AND jpc.classification_employee_group_id = c.employee_group_id 
            AND jpc.classification_peoplesoft_id = c.peoplesoft_id
        LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id
        LEFT JOIN organization o ON jpo.organization_id = o.id,
        JSONB_ARRAY_ELEMENTS(jp.willingness_statements) AS ws
    WHERE
        jp.willingness_statements IS NOT NULL
        AND ws->>'text' IS NOT NULL
    GROUP BY
        jp.id, jp.number, ws->>'text', jp.all_organizations
)
SELECT
    willingness_statement,
    STRING_AGG(job_families_and_streams, ' | ' ORDER BY profile_id) AS job_families_and_streams,
    STRING_AGG(profile_id::TEXT, ', ' ORDER BY profile_id) AS profile_ids,
    STRING_AGG(number::TEXT, ', ' ORDER BY profile_id) AS numbers,
    STRING_AGG(organizations, ' | ' ORDER BY profile_id) AS organizations,
    STRING_AGG(DISTINCT classifications, ', ') AS classifications
FROM grouped_data
GROUP BY willingness_statement
ORDER BY willingness_statement;


-- professional registration requirements grouped by text

WITH job_family_streams AS (
    SELECT DISTINCT
        jp.id AS job_profile_id,
        jpjf.id AS job_family_id,
        jpjf.name AS job_family_name,
        jps.name AS stream_name
    FROM job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id
),
family_streams_aggregated AS (
    SELECT
        job_profile_id,
        job_family_id,
        job_family_name,
        STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams
    FROM job_family_streams
    GROUP BY job_profile_id, job_family_id, job_family_name
),
grouped_data AS (
    SELECT
        jp.id AS profile_id,
        jp.number,
        prr->>'text' AS professional_registration_requirement,
        jp.all_organizations,
        STRING_AGG(DISTINCT '"' || c.name || '"', ', ') AS classifications,
        CASE
            WHEN jp.all_organizations THEN 'all'
            ELSE STRING_AGG(DISTINCT '"' || o.name || '"', ', ')
        END AS organizations,
        (
            SELECT STRING_AGG(
                CASE
                    WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN
                        fsa.job_family_name || ' (' || fsa.streams || ')'
                    ELSE
                        fsa.job_family_name
                END,
                ', ' ORDER BY fsa.job_family_name
            )
            FROM family_streams_aggregated fsa
            WHERE fsa.job_profile_id = jp.id
        ) AS job_families_and_streams
    FROM
        job_profile jp
        LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id
        LEFT JOIN classification c ON jpc.classification_id = c.id 
            AND jpc.classification_employee_group_id = c.employee_group_id 
            AND jpc.classification_peoplesoft_id = c.peoplesoft_id
        LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id
        LEFT JOIN organization o ON jpo.organization_id = o.id,
        JSONB_ARRAY_ELEMENTS(jp.professional_registration_requirements) AS prr
    WHERE
        jp.professional_registration_requirements IS NOT NULL
        AND prr->>'text' IS NOT NULL
    GROUP BY
        jp.id, jp.number, prr->>'text', jp.all_organizations
)
SELECT
    professional_registration_requirement,
    STRING_AGG(job_families_and_streams, ' | ' ORDER BY profile_id) AS job_families_and_streams,
    STRING_AGG(profile_id::TEXT, ', ' ORDER BY profile_id) AS profile_ids,
    STRING_AGG(number::TEXT, ', ' ORDER BY profile_id) AS numbers,
    STRING_AGG(organizations, ' | ' ORDER BY profile_id) AS organizations,
    STRING_AGG(DISTINCT classifications, ', ') AS classifications
FROM grouped_data
GROUP BY professional_registration_requirement
ORDER BY professional_registration_requirement;

-- Security screenings grouped by text

WITH job_family_streams AS (
    SELECT DISTINCT
        jp.id AS job_profile_id,
        jpjf.id AS job_family_id,
        jpjf.name AS job_family_name,
        jps.name AS stream_name
    FROM job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id
),
family_streams_aggregated AS (
    SELECT
        job_profile_id,
        job_family_id,
        job_family_name,
        STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams
    FROM job_family_streams
    GROUP BY job_profile_id, job_family_id, job_family_name
),
grouped_data AS (
    SELECT
        jp.id AS profile_id,
        jp.number,
        screening->>'text' AS security_screening,
        jp.all_organizations,
        STRING_AGG(DISTINCT '"' || c.name || '"', ', ') AS classifications,
        CASE
            WHEN jp.all_organizations THEN 'all'
            ELSE STRING_AGG(DISTINCT '"' || o.name || '"', ', ')
        END AS organizations,
        (
            SELECT STRING_AGG(
                CASE
                    WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN
                        fsa.job_family_name || ' (' || fsa.streams || ')'
                    ELSE
                        fsa.job_family_name
                END,
                ', ' ORDER BY fsa.job_family_name
            )
            FROM family_streams_aggregated fsa
            WHERE fsa.job_profile_id = jp.id
        ) AS job_families_and_streams
    FROM
        job_profile jp
        LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id
        LEFT JOIN classification c ON jpc.classification_id = c.id 
            AND jpc.classification_employee_group_id = c.employee_group_id 
            AND jpc.classification_peoplesoft_id = c.peoplesoft_id
        LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id
        LEFT JOIN organization o ON jpo.organization_id = o.id,
        JSONB_ARRAY_ELEMENTS(jp.security_screenings) AS screening
    WHERE
        jp.security_screenings IS NOT NULL
        AND screening->>'text' IS NOT NULL
    GROUP BY
        jp.id, jp.number, screening->>'text', jp.all_organizations
)
SELECT
    security_screening,
    STRING_AGG(job_families_and_streams, ' | ' ORDER BY profile_id) AS job_families_and_streams,
    STRING_AGG(profile_id::TEXT, ', ' ORDER BY profile_id) AS profile_ids,
    STRING_AGG(number::TEXT, ', ' ORDER BY profile_id) AS numbers,
    STRING_AGG(organizations, ' | ' ORDER BY profile_id) AS organizations,
    STRING_AGG(DISTINCT classifications, ', ') AS classifications
FROM grouped_data
GROUP BY security_screening
ORDER BY security_screening;

-- KSA's grouped by text

WITH job_family_streams AS (
    SELECT DISTINCT
        jp.id AS job_profile_id,
        jpjf.id AS job_family_id,
        jpjf.name AS job_family_name,
        jps.name AS stream_name
    FROM job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id
),
family_streams_aggregated AS (
    SELECT
        job_profile_id,
        job_family_id,
        job_family_name,
        STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams
    FROM job_family_streams
    GROUP BY job_profile_id, job_family_id, job_family_name
),
grouped_data AS (
    SELECT
        jp.id AS profile_id,
        jp.number,
        ksa->>'text' AS knowledge_skill_ability,
        jp.all_organizations,
        STRING_AGG(DISTINCT '"' || c.name || '"', ', ') AS classifications,
        CASE
            WHEN jp.all_organizations THEN 'all'
            ELSE STRING_AGG(DISTINCT '"' || o.name || '"', ', ')
        END AS organizations,
        (
            SELECT STRING_AGG(
                CASE
                    WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN
                        fsa.job_family_name || ' (' || fsa.streams || ')'
                    ELSE
                        fsa.job_family_name
                END,
                ', ' ORDER BY fsa.job_family_name
            )
            FROM family_streams_aggregated fsa
            WHERE fsa.job_profile_id = jp.id
        ) AS job_families_and_streams
    FROM
        job_profile jp
        LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id
        LEFT JOIN classification c ON jpc.classification_id = c.id 
            AND jpc.classification_employee_group_id = c.employee_group_id 
            AND jpc.classification_peoplesoft_id = c.peoplesoft_id
        LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id
        LEFT JOIN organization o ON jpo.organization_id = o.id,
        JSONB_ARRAY_ELEMENTS(jp.knowledge_skills_abilities) AS ksa
    WHERE
        jp.knowledge_skills_abilities IS NOT NULL
        AND ksa->>'text' IS NOT NULL
    GROUP BY
        jp.id, jp.number, ksa->>'text', jp.all_organizations
)
SELECT
    knowledge_skill_ability,
    STRING_AGG(job_families_and_streams, ' | ' ORDER BY profile_id) AS job_families_and_streams,
    STRING_AGG(profile_id::TEXT, ', ' ORDER BY profile_id) AS profile_ids,
    STRING_AGG(number::TEXT, ', ' ORDER BY profile_id) AS numbers,
    STRING_AGG(organizations, ' | ' ORDER BY profile_id) AS organizations,
    STRING_AGG(DISTINCT classifications, ', ') AS classifications
FROM grouped_data
GROUP BY knowledge_skill_ability
ORDER BY knowledge_skill_ability;

-- Profiles that require review

WITH job_family_streams AS (
    SELECT DISTINCT
        jp.id AS job_profile_id,
        jpjf.id AS job_family_id,
        jpjf.name AS job_family_name,
        jps.name AS stream_name
    FROM job_profile jp
    JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"
    JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id
    LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"
    LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id
),
family_streams_aggregated AS (
    SELECT
        job_profile_id,
        job_family_id,
        job_family_name,
        STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams
    FROM job_family_streams
    GROUP BY job_profile_id, job_family_id, job_family_name
)
SELECT
    jp.id AS "Profile ID",
    jp.number AS "Profile Number",
    jp.title AS "Title",
	jp.state as "State",
    CASE
        WHEN STRING_AGG(DISTINCT c.code, ', ') IS NOT NULL THEN 
            '"' || STRING_AGG(DISTINCT c.code, '", "') || '"'
        ELSE NULL
    END AS "Classifications",
    (
        SELECT STRING_AGG(
            CASE
                WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN
                    fsa.job_family_name || ' (' || fsa.streams || ')'
                ELSE
                    fsa.job_family_name
            END,
            ', ' ORDER BY fsa.job_family_name
        )
        FROM family_streams_aggregated fsa
        WHERE fsa.job_profile_id = jp.id
    ) AS "Job Families and Streams",
    CASE
        WHEN jp.all_organizations THEN 'all'
        WHEN STRING_AGG(DISTINCT o.name, ', ') IS NOT NULL THEN 
            '"' || STRING_AGG(DISTINCT o.name, '", "') || '"'
        ELSE NULL
    END AS "Organizations",
    CASE 
        WHEN jp.review_required THEN 'Yes'
        ELSE 'No'
    END AS "Review Required"
FROM 
    job_profile jp
LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id
LEFT JOIN classification c ON jpc.classification_id = c.id 
    AND jpc.classification_employee_group_id = c.employee_group_id 
    AND jpc.classification_peoplesoft_id = c.peoplesoft_id
LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id
LEFT JOIN organization o ON jpo.organization_id = o.id
GROUP BY 
    jp.id, jp.number, jp.title, jp.review_required, jp.all_organizations, jp.state
ORDER BY 
    jp.number

-- All profiles - profile id, profile number, title, classifications, job families and streams, organizations, review required, published/not published

\copy (WITH job_family_streams AS (   SELECT      DISTINCT jp.id AS job_profile_id,      jpjf.id AS job_family_id,      jpjf.name AS job_family_name,      jps.name AS stream_name    FROM      job_profile jp      JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId"      JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id      LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId"      LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id      AND jps.job_family_id = jpjf.id ),  family_streams_aggregated AS (   SELECT      job_profile_id,      job_family_id,      job_family_name,      STRING_AGG(       DISTINCT stream_name,        ', '        ORDER BY          stream_name     ) AS streams    FROM      job_family_streams    GROUP BY      job_profile_id,      job_family_id,      job_family_name )  SELECT    jp.id AS "Profile ID",    jp.number AS "Profile Number",    jp.title AS "Title",    CASE WHEN STRING_AGG(DISTINCT c.code, ', ') IS NOT NULL THEN '"' || STRING_AGG(DISTINCT c.code, '", "') || '"' ELSE NULL END AS "Classifications",    (     SELECT        STRING_AGG(         CASE WHEN fsa.streams IS NOT NULL          AND fsa.streams <> '' THEN fsa.job_family_name || ' (' || fsa.streams || ')' ELSE fsa.job_family_name END,          ', '          ORDER BY            fsa.job_family_name       )      FROM        family_streams_aggregated fsa      WHERE        fsa.job_profile_id = jp.id   ) AS "Job Families and Streams",    CASE WHEN jp.all_organizations THEN 'all' WHEN STRING_AGG(DISTINCT o.name, ', ') IS NOT NULL THEN '"' || STRING_AGG(DISTINCT o.name, '", "') || '"' ELSE NULL END AS "Organizations",    CASE WHEN jp.review_required THEN 'Yes' ELSE 'No' END AS "Review Required",   CASE WHEN jp.state = 'PUBLISHED' THEN 'Yes' ELSE 'No' END AS "Published" FROM    job_profile jp    LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id    LEFT JOIN classification c ON jpc.classification_id = c.id    AND jpc.classification_employee_group_id = c.employee_group_id    AND jpc.classification_peoplesoft_id = c.peoplesoft_id    LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id    LEFT JOIN organization o ON jpo.organization_id = o.id  GROUP BY    jp.id,    jp.number,    jp.title,    jp.review_required,    jp.all_organizations,   jp.state  ORDER BY    jp.number) TO '/profiles_report.csv' WITH CSV HEADER

-- Only published profiles

\copy (WITH job_family_streams AS ( SELECT DISTINCT jp.id AS job_profile_id, jpjf.id AS job_family_id, jpjf.name AS job_family_name, jps.name AS stream_name FROM job_profile jp JOIN job_profile_job_family_link jpjfl ON jp.id = jpjfl."jobProfileId" JOIN job_profile_job_family jpjf ON jpjfl."jobFamilyId" = jpjf.id LEFT JOIN job_profile_stream_link jpsl ON jp.id = jpsl."jobProfileId" LEFT JOIN job_profile_stream jps ON jpsl."streamId" = jps.id AND jps.job_family_id = jpjf.id WHERE jp.state = 'PUBLISHED' ), family_streams_aggregated AS ( SELECT job_profile_id, job_family_id, job_family_name, STRING_AGG(DISTINCT stream_name, ', ' ORDER BY stream_name) AS streams FROM job_family_streams GROUP BY job_profile_id, job_family_id, job_family_name ) SELECT jp.id AS "Profile ID", jp.number AS "Profile Number", jp.title AS "Title", CASE WHEN STRING_AGG(DISTINCT c.code, ', ') IS NOT NULL THEN '"' || STRING_AGG(DISTINCT c.code, '", "') || '"' ELSE NULL END AS "Classifications", ( SELECT STRING_AGG( CASE WHEN fsa.streams IS NOT NULL AND fsa.streams <> '' THEN fsa.job_family_name || ' (' || fsa.streams || ')' ELSE fsa.job_family_name END, ', ' ORDER BY fsa.job_family_name ) FROM family_streams_aggregated fsa WHERE fsa.job_profile_id = jp.id ) AS "Job Families and Streams", CASE WHEN jp.all_organizations THEN 'all' WHEN STRING_AGG(DISTINCT o.name, ', ') IS NOT NULL THEN '"' || STRING_AGG(DISTINCT o.name, '", "') || '"' ELSE NULL END AS "Organizations", CASE WHEN jp.review_required THEN 'Yes' ELSE 'No' END AS "Review Required" FROM job_profile jp LEFT JOIN job_profile_classification jpc ON jp.id = jpc.job_profile_id LEFT JOIN classification c ON jpc.classification_id = c.id AND jpc.classification_employee_group_id = c.employee_group_id AND jpc.classification_peoplesoft_id = c.peoplesoft_id LEFT JOIN job_profile_organization jpo ON jp.id = jpo.job_profile_id LEFT JOIN organization o ON jpo.organization_id = o.id WHERE jp.state = 'PUBLISHED' GROUP BY jp.id, jp.number, jp.title, jp.review_required, jp.all_organizations ORDER BY jp.number) TO '/profiles_report.csv' WITH CSV HEADER

-- REPORT FOR USERS - NAME, MINISTRY, ROLES

COPY (SELECT u.name, o.name AS ministry, array_to_string(u.roles, ', ') AS roles FROM "user" u LEFT JOIN LATERAL (SELECT org.name FROM organization org WHERE org.id = (u.metadata->'peoplesoft'->>'organization_id')::text LIMIT 1) o ON true ORDER BY u.name) TO '/tmp/user_report.csv' WITH CSV HEADER;


-- COMPLETED POSITION REQUESTS REPORT

\copy (SELECT pr.title AS "Job Title", c.name AS "Classification", jp.number AS "JobStore Number", u.name AS "Submitted By", TO_CHAR((pr.approved_at AT TIME ZONE 'UTC') AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD HH24:MI:SS') AS "Approved At", ROUND(CAST(pr.time_to_approve AS NUMERIC) / 3600, 2) AS "Time to Approve (Hours)", pr.approval_type AS "Approval Type", (SELECT o.name FROM department d JOIN organization o ON o.id = d.organization_id WHERE d.id = (pr.additional_info->>'department_id')::text LIMIT 1) AS "Ministry Name" FROM position_request pr JOIN "user" u ON pr.user_id = u.id JOIN classification c ON pr.classification_id = c.id AND pr.classification_employee_group_id = c.employee_group_id AND pr.classification_peoplesoft_id = c.peoplesoft_id JOIN job_profile jp ON pr.parent_job_profile_id = jp.id AND pr.parent_job_profile_version = jp.version WHERE pr.status = 'COMPLETED' ORDER BY pr.approved_at DESC) TO 'completed_position_requests_report.csv' WITH CSV HEADER;