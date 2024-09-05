/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Radio, Row, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { usePosition } from '../../components/app/common/contexts/position.context';
import {
  GetPositionRequestResponseContent,
  useUpdatePositionRequestMutation,
} from '../../redux/services/graphql-api/position-request.api';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { DepartmentFilter } from '../org-chart/components/department-filter.component';
import { OrgChart } from '../org-chart/components/org-chart';
import { TreeChartSearchProvider } from '../org-chart/components/tree-org-chart/tree-org-chart-search-context';
import { TreeOrgChartSearch } from '../org-chart/components/tree-org-chart/tree-org-chart-search.component';
import TreeOrgChart from '../org-chart/components/tree-org-chart/tree-org-chart.component';
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
  setCurrentStep?: React.Dispatch<React.SetStateAction<number | null>>;
}

export const WizardOrgChartPage = ({
  onCreateNewPosition,
  positionRequest,
  setCurrentStep,
}: WizardOrgChartPageProps) => {
  const [updatePositionRequest] = useUpdatePositionRequestMutation();
  const { positionRequestDepartmentId, resetWizardContext, positionRequestData, positionRequestId } =
    useWizardContext();

  // this page gets displayed on two routes: /requests/positions/create and /requests/positions/:id
  // if we navigate to /requests/positions/create, wipe all wizard context info
  const [locationProcessed, setLocationProcessed] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/requests/positions/create') {
      resetWizardContext();
      setSelectedDepartment(null);
      setSelectedPositionId(null);
    }
    setLocationProcessed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null | undefined>(positionRequestDepartmentId);
  // const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [nextButtonTooltipTitle, setNextButtonTooltipTitle] = useState<string>('');
  const [positionVacant, setPositionVacant] = useState<boolean>(false);
  const positionVacantTooltipText = "You can't create a new position which reports to a vacant position.";

  const [currentView] = useState<'chart' | 'tree'>('chart');
  const [horizontal, setHorizontal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

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
      setNextButtonTooltipTitle(positionIsVacant ? positionVacantTooltipText : '');
      setPositionVacant(positionIsVacant);
    }

    // if (nextButtonIsDisabled() === true) {
    //   setNextButtonTooltipTitle("You can't create a new position which reports to a vacant position.");
    // } else {
    //   setNextButtonTooltipTitle('');
    // }
  }, [nextButtonIsDisabled, orgChartData.nodes, selectedPositionId]);

  const { createNewPosition } = usePosition();
  const { getNodes, getEdges } = useReactFlow();

  const next = async ({ switchStep = true }: { switchStep?: boolean } = {}) => {
    if (selectedDepartment == null || selectedPositionId == null) return;

    // setIsLoading(true);

    try {
      // 1-second delay
      // await new Promise((resolve) => setTimeout(resolve, 300));

      // const png = await generatePNGBase64(getNodes);

      // downloadImage('data:image/png;base64,' + png, 'org-chart.png');

      const result = await createNewPosition({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reportingPositionId: selectedPositionId as any,
        selectedDepartment: selectedDepartment,
        orgChartData: orgChartData,
        current_reports_to_position_id: positionRequestData?.reports_to_position_id,
        reSelectSupervisor: reSelectSupervisor,
        changeStep: switchStep,
        // svg: png,
      });

      if (result != 'CANCELLED' && switchStep) {
        onCreateNewPosition?.(); // this will increment the step in parent, switching the tab to the next step
      } else {
        setIsResetting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsResetting(false);
      }

      return result;
    } catch (error) {
      console.error('An error occurred:', error);
      return undefined;
    } finally {
      // setIsLoading(false);
    }
  };

  const reSelectSupervisor = () => {
    // reset the selected position and department to original values
    setSelectedPositionId(positionRequestData?.reports_to_position_id?.toString());
    setSelectedDepartment(positionRequestData?.department_id);
  };

  const switchStep = async (step: number) => {
    const code = await next({ switchStep: false });

    if (code == 'NO_CHANGE') {
      setCurrentStep?.(step); // if the user didn't change the supervisor, just switch the step
      if (positionRequestId)
        updatePositionRequest({
          id: positionRequestId,
          step: step,
        });
    } else if (code != 'CANCELLED') {
      setCurrentStep?.(2); // if the user changed the supervisor, switch to step 2, even if user selected something else
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // ensure that position request and profile data are loaded to prevent race condition
  // for what node to select when org chart loads: targetId={selectedPositionId ?? profileData?.profile.position_id}
  // selectedPositionId is sourced from positionRequest data, which will always be defined when this component renders
  if (locationProcessed === false || !profileData?.profile) {
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
        <Button onClick={() => navigate('/')} key="cancel">
          Cancel
        </Button>,
        <Tooltip title={nextButtonTooltipTitle} key="saveAndNext">
          <Button
            type="primary"
            disabled={nextButtonIsDisabled()}
            onClick={() => {
              next();
            }}
            // loading={isLoading}
          >
            Save and next
          </Button>
        </Tooltip>,
      ]}
    >
      <WizardSteps
        current={0}
        // onStepClick={handleStepClick}
        // hasUnsavedChanges={hasUnsavedChanges}
        maxStepCompleted={positionRequest?.max_step_completed}
        onStepClick={switchStep}
        disabledTooltip={
          positionVacant ? positionVacantTooltipText : nextButtonTooltipTitle != '' ? nextButtonTooltipTitle : null
        }
      ></WizardSteps>
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
          <TreeChartSearchProvider>
            <Row
              gutter={16}
              align="middle"
              justify="space-between"
              style={{ padding: '10px', position: currentView === 'chart' ? 'absolute' : undefined }}
            >
              {/* <Col>
                <ViewToggle
                  view={currentView}
                  onToggle={(view) => {
                    setCurrentView(view);
                  }}
                />
              </Col> */}
              <Col flex="500px">
                {currentView === 'tree' && (
                  <TreeOrgChartSearch
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    disabled={selectedDepartment == null || isFetchingUserProfile}
                    searchTerm={searchTerm}
                  />
                )}
              </Col>
              <Col>
                {currentView === 'tree' && (
                  <Radio.Group value={horizontal} onChange={(e) => setHorizontal(e.target.value)}>
                    <Radio.Button value={true}>Horizontal</Radio.Button>
                    <Radio.Button value={false}>Vertical</Radio.Button>
                  </Radio.Group>
                )}
              </Col>
              <Col flex="auto"> {/* This empty column will create the gap */}</Col>
              <Col flex="500px">
                {currentView === 'tree' && (
                  <DepartmentFilter
                    setDepartmentId={setSelectedDepartment}
                    departmentId={selectedDepartment}
                    loading={isFetchingUserProfile}
                  />
                )}
              </Col>
            </Row>

            <>
              {/* <div className="sr-only" style={{ display: currentView !== 'chart' ? 'none' : 'block' }} tabIndex={0}>
                This chart view is not keyboard accessible. Please switch to the tree view for a keyboard-navigable
                version.
              </div> */}
              <div
                style={{ display: currentView !== 'chart' ? 'none' : 'block', height: '100%' }}
                aria-hidden={true}
                tabIndex={-1}
              >
                <OrgChart
                  type={OrgChartType.DYNAMIC}
                  context={OrgChartContext.WIZARD}
                  setDepartmentId={setSelectedDepartment}
                  onSelectedNodeIdsChange={(ids, elements) => {
                    // console.log('elements: ', JSON.stringify(elements, null, 2));
                    setSelectedPositionId(ids.length > 0 ? ids[0] : undefined);
                    setOrgChartData(elements);
                  }}
                  departmentId={selectedDepartment}
                  departmentIdIsLoading={isFetchingUserProfile}
                  targetId={selectedPositionId ?? profileData?.profile.position_id}
                  wrapProvider={false}
                  // wizardNextHandler={next}
                />
              </div>
              {
                currentView !== 'chart' && (
                  <TreeOrgChart
                    departmentIdIsLoading={isFetchingUserProfile}
                    departmentId={selectedDepartment ?? ''}
                    isHorizontal={horizontal}
                    searchTerm={searchTerm}
                    source={'wizard'}
                    onSelectedPositionIdChange={(positionId: string | null) => {
                      setSelectedPositionId(positionId);
                      const elements = { edges: getEdges(), nodes: getNodes() };
                      // console.log('elements: ', JSON.stringify(elements, null, 2));
                      setOrgChartData(elements);
                    }}
                  />
                )
                // 022-2801
              }
            </>
          </TreeChartSearchProvider>
        )}
      </div>
    </WizardPageWrapper>
  );
};
