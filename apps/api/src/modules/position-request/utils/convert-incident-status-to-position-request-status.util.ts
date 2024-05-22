import { PositionRequestStatus } from '@prisma/client';
import { IncidentStatus } from '../../external/models/incident-create.input';

export const convertIncidentStatusToPositionRequestStatus = (status: number) => {
  switch (status) {
    case IncidentStatus.Solved:
    case IncidentStatus.SolvedTraining:
      return PositionRequestStatus.COMPLETED;
    case IncidentStatus.Unresolved:
    case IncidentStatus.Updated:
      return PositionRequestStatus.VERIFICATION;
    case IncidentStatus.WaitingClient:
      return PositionRequestStatus.ACTION_REQUIRED;
    case IncidentStatus.WaitingInternal:
      return PositionRequestStatus.REVIEW;
    default:
      // Don't update status if not covered by the above
      return null;
  }
};
