/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'reactflow/dist/style.css';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { usePosition } from '../../components/app/common/contexts/position.context';
import { GetPositionRequestResponseContent } from '../../redux/services/graphql-api/position-request.api';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChart } from '../org-chart/components/org-chart';
import { initialElements } from '../org-chart/constants/initial-elements.constant';
import { OrgChartContext } from '../org-chart/enums/org-chart-context.enum';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import { Elements } from '../org-chart/interfaces/elements.interface';
import { WizardPageWrapper } from './components/wizard-page-wrapper.component';
import { WizardSteps } from './components/wizard-steps.component';
import { useWizardContext } from './components/wizard.provider';

interface WizardOrgChartPageProps {
  onCreateNewPosition?: () => void;
  positionRequest?: GetPositionRequestResponseContent | null;
}

export const WizardOrgChartPage = ({ onCreateNewPosition, positionRequest }: WizardOrgChartPageProps) => {
  const { positionRequestDepartmentId, resetWizardContext, positionRequestData } = useWizardContext();

  // this page gets displayed on two routes: /my-positions/create and /my-positions/:id
  // if we navigate to /my-positions/create, wipe all wizard context info
  const [locationProcessed, setLocationProcessed] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/my-positions/create') {
      resetWizardContext();
      setSelectedDepartment(null);
      setSelectedPositionId(null);
    }
    setLocationProcessed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null | undefined>(positionRequestDepartmentId);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [nextButtonTooltipTitle, setNextButtonTooltipTitle] = useState<string>('');

  const {
    data: profileData,
    isLoading: isLoadingUserProfile,
    isFetching: isFetchingUserProfile,
  } = useGetProfileQuery();

  // if wizard context has department info (e.g. if user is editing a position request), use that as the default
  // otherwise, use the user's department from their profile
  useEffect(() => {
    if (profileData?.profile.department_id != null && !selectedDepartment) {
      setSelectedDepartment(profileData.profile.department_id);
    }
  }, [profileData, selectedDepartment]);

  const navigate = useNavigate();

  const [selectedPositionId, setSelectedPositionId] = useState<string | null | undefined>(
    positionRequestData?.reports_to_position_id?.toString(),
  );
  const [orgChartData, setOrgChartData] = useState<Elements>(initialElements);

  const nextButtonIsDisabled = useCallback(() => {
    const matches = orgChartData.nodes.filter((node) => node.id === selectedPositionId);

    return matches.length > 0 ? matches[0].data.employees.length === 0 : true;
  }, [selectedPositionId, orgChartData.nodes]);

  useEffect(() => {
    const selectedNodes = orgChartData.nodes.filter((node) => node.id === selectedPositionId);

    if (selectedNodes.length === 0) {
      setNextButtonTooltipTitle('Select a supervisor position to continue');
    } else {
      const positionIsVacant = selectedNodes[0].data.employees.length === 0;
      setNextButtonTooltipTitle(
        positionIsVacant ? "You can't create a new position which reports to a vacant position." : '',
      );
    }

    // if (nextButtonIsDisabled() === true) {
    //   setNextButtonTooltipTitle("You can't create a new position which reports to a vacant position.");
    // } else {
    //   setNextButtonTooltipTitle('');
    // }
  }, [nextButtonIsDisabled, orgChartData.nodes, selectedPositionId]);

  const { createNewPosition } = usePosition();
  const next = async () => {
    if (selectedDepartment == null || selectedPositionId == null) return;

    setIsLoading(true);
    try {
      const result = await createNewPosition(
        selectedPositionId as any,
        selectedDepartment,
        orgChartData,
        positionRequestData?.reports_to_position_id,
        reSelectSupervisor,
      );

      if (result) onCreateNewPosition?.();
      else {
        setIsResetting(true);
        setTimeout(() => {
          setIsResetting(false);
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reSelectSupervisor = () => {
    // reset the selected position and department to original values
    setSelectedPositionId(positionRequestData?.reports_to_position_id?.toString());
    setSelectedDepartment(positionRequestData?.department_id);
  };

  if (locationProcessed === false) {
    return <LoadingComponent />;
  }

  return (
    <WizardPageWrapper
      title={
        <div>
          <Link to="/" aria-label="Go to dashboard">
            <ArrowLeftOutlined aria-hidden style={{ color: 'black', marginRight: '1rem' }} />
          </Link>
          {positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position'}
        </div>
      }
      subTitle="Here you are able to create a position. Start by clicking the supervisor of the position you would like to create."
      hpad={false}
      additionalBreadcrumb={{
        title: positionRequest?.title && positionRequest?.title != 'Untitled' ? positionRequest.title : 'New position',
      }}
      grayBg={false}
      pageHeaderExtra={[
        <Button onClick={() => navigate('/')}>Cancel</Button>,
        <Tooltip title={nextButtonTooltipTitle}>
          <Button type="primary" disabled={nextButtonIsDisabled()} onClick={next} loading={isLoading}>
            Next
          </Button>
        </Tooltip>,
      ]}
    >
      <WizardSteps current={0}></WizardSteps>
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          background: 'rgb(240, 242, 245)',
          marginLeft: '-1rem',
          marginRight: '-1rem',
          marginTop: '-1px',
        }}
      >
        {isLoadingUserProfile || isFetchingUserProfile || isResetting ? (
          <LoadingComponent height="100%"></LoadingComponent>
        ) : (
          <OrgChart
            type={OrgChartType.DYNAMIC}
            context={OrgChartContext.WIZARD}
            setDepartmentId={setSelectedDepartment}
            onSelectedNodeIdsChange={(ids, elements) => {
              setSelectedPositionId(ids.length > 0 ? ids[0] : undefined);
              setOrgChartData(elements);
            }}
            departmentId={selectedDepartment}
            departmentIdIsLoading={isFetchingUserProfile}
            targetId={selectedPositionId ?? profileData?.profile.position_id}
          />
        )}
      </div>
    </WizardPageWrapper>
  );
};
