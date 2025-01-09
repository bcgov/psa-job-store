import { Button, Card, Divider, Form, Tooltip } from 'antd';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import { GetJobProfileResponse, JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { GetPositionRequestResponseContent } from '../../../redux/services/graphql-api/position-request.api';

interface OtherDetailsProps {
  wizardData: JobProfileModel | null;
  positionRequestData: GetPositionRequestResponseContent | null;
  originalProfileData: GetJobProfileResponse | undefined;
}

const OtherDetails: React.FC<OtherDetailsProps> = ({ wizardData, positionRequestData, originalProfileData }) => {
  {
    /* Other details card */
  }
  return (
    <Card
      style={{ marginTop: '1rem' }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Other Details</h3>
          </span>
          <Tooltip
            trigger={['hover', 'click']}
            title="Information shown here is dependent on the values that you selected in the previous steps."
          >
            <Button
              id="changes"
              role="note"
              type="link"
              style={{ textDecoration: 'underline' }}
              aria-label="Why can't I make changes? Because information shown here is dependent on the values that you selected in the previous steps."
            >
              Why can't I make changes?
            </Button>
          </Tooltip>
        </div>
      }
      bordered={false}
    >
      <Form layout="vertical" data-testid="job-info">
        <Form.Item
          name="jobTitle"
          label={<h4 style={{ margin: 0 }}>Job title</h4>}
          labelCol={{ className: 'card-label' }}
          colon={false}
        >
          <div style={{ margin: 0 }}>
            {typeof wizardData?.title === 'string' ? wizardData?.title : wizardData?.title?.text}
          </div>
        </Form.Item>

        <Divider className="hr-reduced-margin" />

        <Form.Item
          name="expectedClass"
          label={<h4 style={{ margin: 0 }}>Expected classification level</h4>}
          labelCol={{ className: 'card-label' }}
          colon={false}
        >
          <div style={{ margin: 0 }}>
            {originalProfileData?.jobProfile?.classifications?.[0]?.classification?.name ?? ''}
          </div>
        </Form.Item>

        <Divider className="hr-reduced-margin" />

        <Form.Item
          name="jobTitle"
          label={<h4 style={{ margin: 0 }}>Reporting Manager</h4>}
          labelCol={{ className: 'card-label' }}
          colon={false}
        >
          <div data-testid="reporting-manager-info">
            <PositionProfile
              positionNumber={positionRequestData?.reports_to_position_id}
              positionProfile={positionRequestData?.reports_to_position}
              orgChartData={positionRequestData?.orgchart_json}
            ></PositionProfile>
          </div>
          {/* <div style={{ margin: 0 }}>
       {firstActivePosition2 && !isFetchingPositionProfile2 && !isFetchingPositionProfileError2 && (
         <div data-testid="reporting-manager-info">
           <p
             style={{ margin: 0 }}
           >{`${firstActivePosition2.employeeName}, ${firstActivePosition2.ministry}`}</p>
           <Typography.Paragraph type="secondary">
             {`${firstActivePosition2.positionDescription}, ${firstActivePosition2.classification}`}
             <br></br>
             {`Position No.: ${firstActivePosition2.positionNumber}`}
             {additionalPositions2 > 0 && ` +${additionalPositions2}`}
           </Typography.Paragraph>
         </div>
       )}
       {isFetchingPositionProfile2 && <LoadingSpinnerWithMessage mode={'small'} />}
       {isFetchingPositionProfileError2 && <p>Error loading, please refresh page</p>}
     </div> */}
        </Form.Item>

        <Divider className="hr-reduced-margin" />

        <Form.Item
          name="jobTitle"
          label={<h4 style={{ margin: 0 }}>Type</h4>}
          labelCol={{ className: 'card-label' }}
          colon={false}
        >
          <div style={{ margin: 0 }}>Full-time, regular</div>
        </Form.Item>

        <Divider className="hr-reduced-margin" />

        <Form.Item
          name="jobTitle"
          label={<h4 style={{ margin: 0 }}>Job Store profile number</h4>}
          labelCol={{ className: 'card-label' }}
          colon={false}
        >
          <div style={{ margin: 0 }}>{wizardData?.number}</div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OtherDetails;
