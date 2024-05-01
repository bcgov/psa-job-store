/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';
import React, { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../../../redux/services/graphql-api/position-request.api';
import { useWizardContext } from '../../../../routes/wizard/components/wizard.provider';

interface PositionContextProps {
  createNewPosition: (
    reportingPositionId: number,
    selectedDepartment: string,
    orgChartData: any,
    current_reports_to_position_id?: number | undefined,
    reSelectSupervisor?: () => void,
  ) => Promise<boolean>;
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
  const { setPositionRequestId, positionRequestId, resetWizardContext } = useWizardContext();
  const [createPositionRequest] = useCreatePositionRequestMutation();
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const navigate = useNavigate();

  const createNewPosition = async (
    reportingPositionId: number,
    selectedDepartment: string,
    orgChartData: any,
    current_reports_to_position_id?: number | undefined,
    reSelectSupervisor?: () => void,
  ): Promise<boolean> => {
    // we are not editing a draft position request (creatign position from dashboard or from org chart page)
    // we can create a new position from the my-positions org chart view, or directly from the org chart, or from home page
    if (
      location.pathname.startsWith('/my-positions/create') ||
      location.pathname.startsWith('/org-chart') ||
      location.pathname == '/' || // home page
      location.pathname == '' // home page
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
      return true;
    } else {
      // we are editing a draft position request - update existing position request
      if (positionRequestId != null && selectedDepartment != null) {
        if (current_reports_to_position_id != reportingPositionId) {
          return new Promise((resolve) => {
            Modal.confirm({
              title: 'Change supervisor?',
              content: (
                <div data-testid="change-profile-warning">
                  <p>
                    Altering the report-to position will result in the loss of all profile data and any additional
                    details you've provided.
                  </p>
                  <p>This action is irreversible. Are you sure you wish to proceed?</p>
                </div>
              ),
              okText: 'Change supervisor',
              cancelText: 'Cancel',
              onOk: async () => {
                resetWizardContext(); // this ensures that any previous edits are cleared
                await updatePositionRequest({
                  id: positionRequestId,
                  step: 1,
                  reports_to_position_id: reportingPositionId,
                  department: { connect: { id: selectedDepartment } },
                  orgchart_json: orgChartData,
                  // clear previous data
                  profile_json: null,
                  parent_job_profile: { connect: { id: null } },
                  additional_info: null,
                  title: null,
                }).unwrap();
                resolve(true);
              },
              onCancel: () => {
                // re-select supervisor
                reSelectSupervisor?.();
                resolve(false);
              },
            });
          });
        } else {
          // user is updating existing position request, but did not change supervisor
          // do not show the modal, just update the step
          return updatePositionRequest({
            id: positionRequestId,
            step: 1,
          })
            .unwrap()
            .then(() => true);
        }
      }
      return true;
    }
  };

  return <PositionContext.Provider value={{ createNewPosition }}>{children}</PositionContext.Provider>;
};
