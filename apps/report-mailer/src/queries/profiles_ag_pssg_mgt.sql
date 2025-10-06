SELECT p.*, o.organization_id, orglist.code,
(
    SELECT STRING_AGG(org.code, ',')
    FROM job_profile_organization jpo
    JOIN organization org ON jpo.organization_id = org.id
    WHERE jpo.job_profile_id = p.id
  ) AS all_organization_codes, p.role_id
FROM public.current_job_profiles p 
LEFT JOIN job_profile_organization o ON o.job_profile_id = p.id 
LEFT JOIN organization orglist ON o.organization_id = orglist.id 
WHERE 
  (
    SELECT bool_and(org.code IN ('AG', 'PSSG'))
    FROM job_profile_organization jpo
    JOIN organization org ON jpo.organization_id = org.id
    WHERE jpo.job_profile_id = p.id
  ) AND p.role_id = 5