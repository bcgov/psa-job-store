import { Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  PositionProfileModel,
  useLazyGetPositionProfileQuery,
} from '../../../../redux/services/graphql-api/position.api';
import LoadingSpinnerWithMessage from '../components/loading.component';

interface PositionProfileProps {
  positionNumber: number | string | null | undefined;
  prefix?: string;
  mode?: 'compact' | 'compact2' | 'full';
  unOccupiedText?: string;
  loadingStyle?: 'spinner' | 'skeleton';
}

const PositionProfile: React.FC<PositionProfileProps> = ({
  positionNumber,
  prefix,
  mode = 'full',
  loadingStyle = 'spinner',
  unOccupiedText,
}) => {
  const [getPositionProfile, { data: positionProfileData, isFetching }] = useLazyGetPositionProfileQuery();
  const [firstActivePosition, setFirstActivePosition] = useState<PositionProfileModel | null>(null);
  const [additionalPositions, setAdditionalPositions] = useState<number>(0);

  useEffect(() => {
    if (positionNumber) {
      getPositionProfile({ positionNumber: positionNumber.toString() });
    }
  }, [positionNumber, getPositionProfile]);

  useEffect(() => {
    if (positionProfileData && positionProfileData.positionProfile) {
      const activePositions = positionProfileData.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition(activePositions[0] || null);
      setAdditionalPositions(activePositions.length - 1);
    }
  }, [positionProfileData]);

  return (
    <>
      {isFetching ? (
        loadingStyle == 'spinner' ? (
          <LoadingSpinnerWithMessage mode="small" />
        ) : (
          <Skeleton.Input active={true} size={'small'} />
        )
      ) : firstActivePosition ? (
        <>
          {mode === 'compact' ? (
            <div>
              <p style={{ margin: 0 }}>
                {prefix && `${prefix} `}
                {`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}
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
              <p style={{ margin: 0 }}>{`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}</p>
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
        <div>{unOccupiedText === undefined ? `Position ${positionNumber} is unoccupied` : unOccupiedText}</div>
      )}
    </>
  );
};

export default PositionProfile;
