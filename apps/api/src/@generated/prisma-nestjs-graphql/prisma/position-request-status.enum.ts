import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
  ESCALATED = 'ESCALATED',
  ACTION_REQUIRED = 'ACTION_REQUIRED',
}

registerEnumType(PositionRequestStatus, { name: 'PositionRequestStatus', description: undefined });
