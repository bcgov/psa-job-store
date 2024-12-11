import React, { useEffect, useState } from 'react';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { useUpdateJobProfileViewCountMutation } from '../../../redux/services/graphql-api/job-profile.api';

interface JobProfileViewCounterProps {
  // children: ReactElement;
  onProfileView: ((profile: JobProfileModel) => void) | undefined;
  renderSearchResults: (onSelectProfile: any) => JSX.Element;
}

const JobProfileViewCounter: React.FC<JobProfileViewCounterProps> = ({
  // children,
  onProfileView,
  renderSearchResults,
}) => {
  const [updateJobProfileViewCount] = useUpdateJobProfileViewCountMutation();
  const [viewedJobProfiles, setViewedJobProfiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (viewedJobProfiles.size > 0) {
      const timeout = setTimeout(() => {
        updateJobProfileViewCount({ jobProfiles: Array.from(viewedJobProfiles) });
        setViewedJobProfiles(new Set());
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [viewedJobProfiles, updateJobProfileViewCount]);

  const updateJobProfileViewCountCache = (profile: JobProfileModel) => {
    setViewedJobProfiles((prevViewedJobProfiles) => new Set(prevViewedJobProfiles.add(profile.id)));
    onProfileView && onProfileView(profile);
  };

  return renderSearchResults(updateJobProfileViewCountCache);
  // return React.cloneElement(children as React.ReactElement, {
  //   onSelectProfile: updateJobProfileViewCountCache,
  // });
};

export default JobProfileViewCounter;
