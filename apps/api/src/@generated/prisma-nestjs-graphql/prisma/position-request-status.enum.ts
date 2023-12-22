import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
}

registerEnumType(PositionRequestStatus, { name: 'PositionRequestStatus', description: undefined });
