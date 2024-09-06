/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetOrganizationQuery } from '../../../../redux/services/graphql-api/organization';
import { PositionProfileModel, useGetPositionProfileQuery } from '../../../../redux/services/graphql-api/position.api';
import LoadingSpinnerWithMessage from '../components/loading.component';

interface PositionProfileProps {
  positionNumber?: number | string | null | undefined;
  positionProfile?: PositionProfileModel;
  prefix?: string;
  mode?: 'compact' | 'compact2' | 'full';
  unOccupiedText?: string;
  loadingStyle?: 'spinner' | 'skeleton';
  orgChartData?: any;
}

const PositionProfile: React.FC<PositionProfileProps> = ({
  positionNumber,
  positionProfile,
  prefix,
  mode = 'full',
  loadingStyle = 'spinner',
  unOccupiedText,
  orgChartData,
}) => {
  const {
    data: positionProfileData,
    isLoading,
    error: positionProfileError,
  } = useGetPositionProfileQuery(
    {
      positionNumber: positionNumber?.toString() ?? '',
    },
    { skip: (positionNumber?.toString() ?? '') == '' },
  );
  // const [getPositionProfile, { data: positionProfileData, isFetching, error: positionProfileError }] =
  //   useLazyGetPositionProfileQuery();
  const [firstActivePosition, setFirstActivePosition] = useState<PositionProfileModel | null>(null);
  const [additionalPositions, setAdditionalPositions] = useState<number>(0);
  const [ministryId, setMinistryId] = useState<string | null>(null);

  const {
    data: organizationData,
    isFetching: isOrganizationFetching,
    error: organizationError,
  } = useGetOrganizationQuery({ id: ministryId ?? '' }, { skip: !ministryId || mode === 'compact2' });

  useEffect(() => {
    if (positionProfile && !firstActivePosition) {
      setFirstActivePosition(positionProfile);
      setAdditionalPositions(0);
    }
  }, [positionProfile, firstActivePosition]);

  useEffect(() => {
    if (orgChartData && positionNumber && !positionProfile) {
      const node = orgChartData.nodes.find((node: any) => node.id === positionNumber.toString());
      if (node) {
        const activePositions = node.data.employees.filter((employee: any) => employee.status === 'Active');
        const firstActiveEmployee = activePositions[0];
        if (firstActiveEmployee) {
          setFirstActivePosition({
            employeeName: firstActiveEmployee.name,
            ministry: node.data.department.organization_id || '',
            positionDescription: node.data.title,
            departmentName: node.data.department.name,
            positionNumber: node.id,
            classification: node.data.classification.name,
            status: firstActiveEmployee.status,
          });
          setAdditionalPositions(activePositions.length - 1);
          setMinistryId(node.data.department.organization_id);
        }
      }
    }
  }, [positionNumber, orgChartData, positionProfile]);

  useEffect(() => {
    if (positionProfileData && positionProfileData.positionProfile) {
      const activePositions = positionProfileData.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition(activePositions[0] || null);
      setAdditionalPositions(activePositions.length - 1);
    }
  }, [positionProfileData]);

  const ministryName = organizationData?.organization?.name || '';

  if (positionProfileError || organizationError) {
    return <span>Could not get position information, please reload the page.</span>;
  }

  return (
    <>
      {isLoading || isOrganizationFetching ? (
        loadingStyle === 'spinner' ? (
          <LoadingSpinnerWithMessage mode="small" />
        ) : (
          <Skeleton.Input active={true} size={'small'} />
        )
      ) : firstActivePosition && firstActivePosition.employeeName ? (
        <>
          {mode === 'compact' ? (
            <div>
              <p style={{ margin: 0 }}>
                {prefix && `${prefix} `}
                {`${firstActivePosition.employeeName}, ${ministryName}`}
              </p>
            </div>
          ) : mode === 'compact2' ? (
            <h1 style={{ fontWeight: 'normal', margin: 0, fontSize: 'initial' }}>
              <Typography.Text type="secondary">
                {prefix && `${prefix} `}
                {`${firstActivePosition.positionDescription} · ${firstActivePosition.departmentName}`}
              </Typography.Text>
            </h1>
          ) : (
            <div>
              <p style={{ margin: 0 }}>{`${firstActivePosition.employeeName}, ${ministryName}`}</p>
              <Typography.Paragraph type="secondary">
                {`${firstActivePosition.positionDescription}, ${firstActivePosition.classification}`}
                <br />
                {`Position No.: ${firstActivePosition.positionNumber}`}
                {additionalPositions > 0 && ` +${additionalPositions}`}
              </Typography.Paragraph>
            </div>
          )}
        </>
      ) : (
        positionNumber && (
          <div>{unOccupiedText === undefined ? `Position ${positionNumber} is unoccupied` : unOccupiedText}</div>
        )
      )}
    </>
  );
};

export default PositionProfile;
