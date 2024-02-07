// import { Button, Card, Col, Descriptions, Result, Row } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { PageHeader } from '../../components/app/page-header.component';
// import ContentWrapper from '../home/components/content-wrapper.component';
// import { WizardSteps } from '../wizard/components/wizard-steps.component';

// export const WizardPositionCreatedPage = () => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate('/');
//   };

//   return (
//     <>
//       <PageHeader title="Result" subTitle="Find out the result of your request" />

//       <Row justify="center" style={{ padding: '0 1rem' }}>
//         <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
//           <div style={{ background: 'white' }}>
//             <WizardSteps current={5} xl={24}></WizardSteps>
//           </div>
//         </Col>
//       </Row>

//       <ContentWrapper>
//         <Result
//           status="success"
//           title="Your position has been created."
//           subTitle="Find the information needed for recruitment in the table below."
//           extra={[
//             <Button type="primary" key="console" onClick={handleClick}>
//               Go to Dashboard
//             </Button>,
//           ]}
//         />
//         <Row justify="center" style={{ padding: '0 1rem' }}>
//           <Col xs={24} md={24} lg={24} xl={14} xxl={18}>
//             <Card title="Information" bordered={false}>
//               <Descriptions bordered layout="horizontal" column={1}>
//                 <Descriptions.Item label="Position number">
//                   123456 <Button type="link">Copy</Button>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Job Details">
//                   <Button type="link">View</Button> | <Button type="link">Download</Button>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Organization chart">
//                   <Button type="link">View</Button> | <Button type="link">Download</Button>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Job store job profile">
//                   <Button type="link">View</Button> | <Button type="link">Download</Button>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="Modified job profile">
//                   <Button type="link">View</Button> | <Button type="link">Download</Button>
//                 </Descriptions.Item>
//               </Descriptions>
//             </Card>
//           </Col>
//         </Row>
//       </ContentWrapper>
//     </>
//   );
// };
