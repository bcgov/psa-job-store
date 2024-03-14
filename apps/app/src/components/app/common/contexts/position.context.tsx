/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../../../redux/services/graphql-api/position-request.api';
import { useWizardContext } from '../../../../routes/wizard/components/wizard.provider';

interface PositionContextProps {
  createNewPosition: (reportingPositionId: number, selectedDepartment: string, orgChartData: any) => Promise<void>;
}

const PositionContext = React.createContext<PositionContextProps | null>(null);

export const usePosition = (): PositionContextProps => {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error('usePosition must be used within a PositionProvider');
  }
  return context;
};

interface PositionProviderProps {
  children: ReactNode;
}

export const PositionProvider: React.FC<PositionProviderProps> = ({ children }) => {
  const { setPositionRequestId, positionRequestId } = useWizardContext();
  const [createPositionRequest] = useCreatePositionRequestMutation();
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const navigate = useNavigate();

  const createNewPosition = async (reportingPositionId: number, selectedDepartment: string, orgChartData: any) => {
    // we are not editing a draft position request (creatign position from dashboard or from org chart page)
    // console.log('orgChartData: ', orgChartData);

    // console.log('createNewPosition()', location.pathname);
    // we can create a new position from the my-positions org chart view, or directly from the org chart, or from home page
    if (
      location.pathname.startsWith('/my-positions/create') ||
      location.pathname.startsWith('/org-chart') ||
      location.pathname.startsWith('/') ||
      location.pathname == ''
    ) {
      const positionRequestInput = {
        step: 1,
        title: 'Untitled',
        reports_to_position_id: reportingPositionId,
        department: { connect: { id: selectedDepartment ?? '' } },
        orgchart_json: orgChartData,
      };
      // 'CreatePositionRequestInput': profile_json, parent_job_profile, title, classification_code
      const resp = await createPositionRequest(positionRequestInput).unwrap();
      setPositionRequestId(resp.createPositionRequest);
      navigate(`/my-positions/${resp.createPositionRequest}`, { replace: true });
    } else {
      // we are editing a draft position request - update existing position request
      if (positionRequestId != null && selectedDepartment != null) {
        await updatePositionRequest({
          id: positionRequestId,
          step: 1,
          reports_to_position_id: reportingPositionId,
          department: { connect: { id: selectedDepartment } },
          orgchart_json: orgChartData,
        }).unwrap();
      }
    }
  };

  return <PositionContext.Provider value={{ createNewPosition }}>{children}</PositionContext.Provider>;
};
