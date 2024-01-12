/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Form, Input, Row, Select, Tabs } from 'antd';
import { CSSProperties } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import {
  useGetJobProfilesDraftsCareerGroupsQuery,
  useGetJobProfilesDraftsMinistriesQuery,
} from '../../redux/services/graphql-api/job-profile.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import './total-comp-published-profies.page.css';
const { Option } = Select;

export const TotalCompCreateProfilePage = () => {
  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  const srOnlyStyle: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: '0',
  };

  const tabItems = [
    {
      key: '1',
      label: 'Basic details',
      children: (
        <Row justify="center" style={{ margin: '1rem 0' }}>
          <Col xs={24} sm={24} md={24} lg={20} xl={16}>
            <Form layout="vertical">
              <Card title="Job Title" bordered={false} className="custom-card">
                <Row justify="start">
                  <Col xs={24} sm={12} md={10} lg={8} xl={6}>
                    <Form.Item>
                      <label style={srOnlyStyle} htmlFor="jobTitle">
                        Job Title
                      </label>
                      <Input id="jobTitle" placeholder="Ex.: Program Assistant" aria-label="Job Title" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="JobStore Number" style={{ marginTop: 16 }} bordered={false} className="custom-card">
                <Form.Item name="jobStoreNumber">
                  <label style={srOnlyStyle} htmlFor="jobStoreNumber">
                    JobStore Number
                  </label>
                  <Input placeholder="Ex.: 1001" />
                </Form.Item>
              </Card>

              <Card title="Classification" style={{ marginTop: 16 }} bordered={false}>
                <Form.Item name="employeeGroup" label="Employee group">
                  <Select placeholder="Choose an employee group">
                    {/* Options should be rendered dynamically based on your data */}
                    <Option value="group1">Group 1</Option>
                    <Option value="group2">Group 2</Option>
                    {/* ...other options */}
                  </Select>
                </Form.Item>

                <Form.Item name="classification" label="Classification">
                  <Select placeholder="Choose a classification">
                    {/* Options should be rendered dynamically based on your data */}
                    <Option value="classification1">Classification 1</Option>
                    <Option value="classification2">Classification 2</Option>
                    {/* ...other options */}
                  </Select>
                </Form.Item>
              </Card>
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Job profile',
      children: (
        <>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              job profile form
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              actions
            </Col>
          </Row>
        </>
      ),
    },
  ];

  if (!ministriesData || !careerGroupData) return <>Loading..</>;

  return (
    <>
      <PageHeader title="New profile" subTitle="New profile" />

      <ContentWrapper>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      </ContentWrapper>
    </>
  );
};
