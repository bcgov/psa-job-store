/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';
import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
} from '../../../../redux/services/graphql-api/position-request.api';
import { useWizardContext } from '../../../../routes/wizard/components/wizard.provider';

interface PositionContextProps {
  createNewPosition: (params: CreateNewPositionParams) => Promise<string>;
}

const PositionContext = React.createContext<PositionContextProps | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
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

interface CreateNewPositionParams {
  reportingPositionId: number;
  selectedDepartment: string;
  orgChartData: any;
  current_reports_to_position_id?: number;
  reSelectSupervisor?: () => void;
  changeStep?: boolean;
  svg: string;
}

export const PositionProvider: React.FC<PositionProviderProps> = ({ children }) => {
  const { positionRequestId, resetWizardContext, setPositionRequestData } = useWizardContext();
  const [createPositionRequest] = useCreatePositionRequestMutation();
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const [isSwitchStepLoading, setIsSwitchStepLoading] = useState(false);
  const navigate = useNavigate();

  const createNewPosition = async (params: CreateNewPositionParams): Promise<string> => {
    const {
      reportingPositionId,
      selectedDepartment,
      orgChartData,
      current_reports_to_position_id,
      reSelectSupervisor,
      changeStep = true,
      svg,
    } = params;

    // we are not editing a draft position request (creatign position from dashboard or from org chart page)
    // we can create a new position from the my-position-requests org chart view, or directly from the org chart, or from home page
    if (
      location.pathname.startsWith('/my-position-requests/create') ||
      location.pathname.startsWith('/org-chart') ||
      location.pathname == '/' || // home page
      location.pathname == '' // home page
    ) {
      // orgChartData.svg = btoa(svg);
      // console.log('svg: ', svg);

      // console.log('orgChartData: ', orgChartData);
      const positionRequestInput = {
        step: 1,
        max_step_completed: 1,
        title: 'Untitled',
        reports_to_position_id: reportingPositionId,
        department: { connect: { id: selectedDepartment ?? '' } },
        orgchart_json: orgChartData,
        orgchart_png: svg,
      };
      // 'CreatePositionRequestInput': profile_json, parent_job_profile, title, classification_code
      const resp = await createPositionRequest(positionRequestInput).unwrap();
      // setPositionRequestId(resp.createPositionRequest);
      navigate(`/my-position-requests/${resp.createPositionRequest}`, { replace: true });
      return 'CREATE_NEW';
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
              okButtonProps: {
                loading: isSwitchStepLoading,
              },
              cancelButtonProps: {
                loading: isSwitchStepLoading,
              },
              onOk: async () => {
                setIsSwitchStepLoading(true);
                resetWizardContext(); // this ensures that any previous edits are cleared
                const resp = await updatePositionRequest({
                  id: positionRequestId,
                  step: 1,
                  max_step_completed: 1, // reset max step
                  reports_to_position_id: reportingPositionId,
                  department: { connect: { id: selectedDepartment } },
                  orgchart_json: orgChartData,
                  // clear previous data
                  profile_json: null,
                  parent_job_profile: { connect: { id: null } },
                  additional_info: null,
                  title: null,
                  returnFullObject: true,
                  orgchart_png: svg,
                }).unwrap();

                setPositionRequestData(resp.updatePositionRequest ?? null);
                setIsSwitchStepLoading(false);
                resolve('CHANGED_SUPERVISOR');
              },
              onCancel: () => {
                // re-select supervisor
                reSelectSupervisor?.();
                resolve('CANCELLED');
              },
            });
          });
        } else {
          // user is updating existing position request, but did not change supervisor
          // do not show the modal, just update the step
          if (changeStep)
            return updatePositionRequest({
              id: positionRequestId,
              step: 1,
            })
              .unwrap()
              .then(() => 'NO_CHANGE');
          else return 'NO_CHANGE';
        }
      }
      return 'DEFAULT';
    }
  };

  return <PositionContext.Provider value={{ createNewPosition }}>{children}</PositionContext.Provider>;
};
