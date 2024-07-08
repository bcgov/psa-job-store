import { CopyOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Spin, Typography, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useEffect } from 'react';
import { useLazyGetPositionProfileQuery } from '../../../../redux/services/graphql-api/position.api';
import { User } from '../../../../redux/services/graphql-api/settings/dtos/user.dto';
import { useLazyGetUserPositionForSettingsQuery } from '../../../../redux/services/graphql-api/settings/settings.api';

const { Paragraph, Text } = Typography;

interface OtherDetailsCardProps {
  user?: User;
}

export const OtherDetailsCard = ({ user }: OtherDetailsCardProps) => {
  const [positionDataTrigger, { data: positionData, isFetching: positionDataIsFetching }] =
    useLazyGetUserPositionForSettingsQuery();

  // const [
  //   supervisorPositionDataTrigger,
  //   { data: supervisorPositionData, isFetching: supervisorPositionDataIsFetching },
  // ] = useLazyGetUserPositionForSettingsQuery();

  const [
    supervisorPositionDataTrigger,
    { data: supervisorPositionData, isFetching: supervisorPositionDataIsFetching },
  ] = useLazyGetPositionProfileQuery();

  useEffect(() => {
    if (user?.metadata.peoplesoft.position_id != null) {
      positionDataTrigger(user.metadata.peoplesoft.position_id);
    }

    if (positionData?.position?.supervisor_id != null) {
      supervisorPositionDataTrigger({ positionNumber: positionData.position.supervisor_id });
    }
  }, [positionData, user]);

  // console.log('user: ', user);
  // console.log('positionData: ', positionData);
  // console.log('supervisorPositionData: ', supervisorPositionData);

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card title="Other Details">
          <div>
            <Text strong>Email</Text>
            {user?.email != null && (
              <>
                <br />
                <Space>
                  <Text>{user?.email}</Text>
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => {
                      copy('handleCopyURL');
                      message.success('Email copied to clipboard');
                    }}
                  />
                </Space>
              </>
            )}
          </div>
          <Divider />
          <Spin spinning={positionDataIsFetching}>
            <div>
              <Paragraph strong>User Details</Paragraph>
              <Text>{user?.name}</Text>
              <Paragraph type="secondary">
                {positionData?.position?.title}, {positionData?.position?.classification.code}
                <br />
                Position #: {positionData?.position?.id}
              </Paragraph>
            </div>
          </Spin>
          <Divider />
          <Spin spinning={positionDataIsFetching}>
            <div>
              <Paragraph strong>Organization Details</Paragraph>
              <Text>{positionData?.position?.organization.name}</Text>
              <Paragraph type="secondary">
                Department: {positionData?.position?.department.name}
                <br />
                Department ID: {positionData?.position?.department.id}
              </Paragraph>
            </div>
          </Spin>
          <Divider />
          <Spin spinning={positionDataIsFetching || supervisorPositionDataIsFetching}>
            <div>
              <Paragraph strong>Reporting Manager</Paragraph>
              <Text>
                {supervisorPositionData?.positionProfile != null &&
                  supervisorPositionData.positionProfile.length > 0 &&
                  supervisorPositionData.positionProfile[0].employeeName}
              </Text>
              <Paragraph type="secondary">
                {supervisorPositionData?.positionProfile != null &&
                  supervisorPositionData.positionProfile.length > 0 && (
                    <>
                      {supervisorPositionData?.positionProfile[0].positionDescription},{' '}
                      {supervisorPositionData?.positionProfile[0].classification}
                      <br />
                      Position #: {supervisorPositionData?.positionProfile[0].positionNumber}
                    </>
                  )}
              </Paragraph>
            </div>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};
