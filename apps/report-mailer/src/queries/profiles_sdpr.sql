SELECT p.*, o.organization_id, orglist.code 
FROM public.current_job_profiles p 
LEFT JOIN job_profile_organization o ON o.job_profile_id = p.id 
LEFT JOIN organization orglist ON o.organization_id = orglist.id 
WHERE 
  orglist.code = 'SDPR' AND (
    SELECT COUNT(*)
    FROM job_profile_organization
    WHERE job_profile_id = p.id
  ) = 1;