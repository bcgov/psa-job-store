import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  PositionProfileModel,
  useLazyGetPositionProfileQuery,
} from '../../../../redux/services/graphql-api/position.api';
import LoadingSpinnerWithMessage from '../components/loading.component';

interface PositionProfileProps {
  positionNumber: number | null | undefined;
  prefix?: string;
  mode?: 'compact' | 'full';
}

const PositionProfile: React.FC<PositionProfileProps> = ({ positionNumber, prefix, mode = 'full' }) => {
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
        <LoadingSpinnerWithMessage mode="small" />
      ) : firstActivePosition ? (
        <>
          {mode === 'compact' ? (
            <div>
              <p style={{ margin: 0 }}>
                {prefix && `${prefix} `}
                {`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}
              </p>
            </div>
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
        <div>Position {positionNumber} is unoccupied</div>
      )}
    </>
  );
};

export default PositionProfile;
