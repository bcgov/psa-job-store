import { PositionRequestStatus } from '@prisma/client';
import { IncidentStatus } from '../../external/models/incident-create.input';

export const convertIncidentStatusToPositionRequestStatus = (status: number | string) => {
  switch (+status) {
    case IncidentStatus.Solved:
    case IncidentStatus.SolvedTraining:
      return PositionRequestStatus.COMPLETED;
    case IncidentStatus.Unresolved:
    case IncidentStatus.Updated:
      return PositionRequestStatus.IN_REVIEW;
    case IncidentStatus.WaitingClient:
      return PositionRequestStatus.ACTION_REQUIRED;
    case IncidentStatus.WaitingInternal:
      return PositionRequestStatus.ESCALATED;
    default:
      // Don't update status if not covered by the above
      return null;
  }
};
