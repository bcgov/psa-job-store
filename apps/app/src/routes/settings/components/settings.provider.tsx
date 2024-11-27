import { createContext, useEffect, useState } from 'react';
import { Department } from '../../../redux/services/graphql-api/settings/dtos/department.dto';
import { GetOrganizationsResponse } from '../../../redux/services/graphql-api/settings/dtos/get-organizations-response.dto';
import { useGetOrganizationsForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';

export type SettingsContextType = {
  organizations: {
    data: GetOrganizationsResponse['organizations'] | undefined;
    departments: Department[] | undefined;
    isLoading: boolean;
  };
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: organizationsData, isFetching: organizationsDataIsFetching } = useGetOrganizationsForSettingsQuery();
  const [departments, setDepartments] = useState<Department[] | undefined>(undefined);

  useEffect(() => {
    if (organizationsData != null) {
      setDepartments(organizationsData.organizations.flatMap((organization) => organization.departments));
    }
  }, [organizationsData]);

  return (
    <SettingsContext.Provider
      value={{
        organizations: {
          data: organizationsData?.organizations,
          departments: departments,
          isLoading: organizationsDataIsFetching,
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
