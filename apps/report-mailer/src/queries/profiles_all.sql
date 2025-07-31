SELECT
  cjp.id AS job_profile_id,
  cjp.number AS job_store_number,
  cjp.title AS job_profile_title,
  c.name AS classification_name,
  c.code AS classification_code,
  c.grade AS classification_grade,
  cjp.state AS job_profile_state,
  cjp.education::text AS education,
  cjp.job_experience::text AS job_experience,
  cjp.professional_registration_requirements::text AS professional_registration_requirements,
  cjp.preferences::text AS preferences,
  cjp.knowledge_skills_abilities::text AS knowledge_skills_abilities,
  cjp.willingness_statements::text AS willingness_statements,
  cjp.optional_requirements::text AS optional_requirements,
  cjp.updated_at AS last_updated_at
FROM current_job_profiles cjp
LEFT JOIN job_profile_classification jpc
  ON cjp.id = jpc.job_profile_id AND cjp.version = jpc.job_profile_version
LEFT JOIN classification c
  ON jpc.classification_id = c.id
  AND jpc.classification_employee_group_id = c.employee_group_id
  AND jpc.classification_peoplesoft_id = c.peoplesoft_id
WHERE cjp.is_archived = FALSE;