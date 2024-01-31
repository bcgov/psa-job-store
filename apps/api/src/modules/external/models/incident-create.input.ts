export enum IncidentStatus {
  Discontinued = 107,
  Solved = 2,
  SolvedTraining = 102,
  Unresolved = 1,
  Updated = 8,
  WaitingClient = 3,
  WaitingInternal = 101,
  WaitingVendor = 106,
}

export enum IncidentThreadChannel {
  CSSWeb = 6,
}

export enum IncidentThreadContentType {
  TextHtml = 2,
}

export enum IncidentThreadEntryType {
  Customer = 3,
}

export interface IncidentCreateInput {
  subject: string;
  primaryContact: { id: number };
  assignedTo: {
    staffGroup: {
      lookupName: string;
    };
  };
  category: {
    id: number;
  };
  statusWithType: {
    status: {
      id: IncidentStatus;
    };
  };
  severity: {
    lookupName: string;
  };
  threads: {
    channel: { id: IncidentThreadChannel };
    contentType: { id: IncidentThreadContentType };
    entryType: { id: IncidentThreadEntryType };
    text: string;
  }[];
  fileAttachments: {
    name: string;
    fileName: string;
    contentType: string;
    data: string;
  }[];
}
