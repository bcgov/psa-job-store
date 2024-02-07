export interface IncidentUpdateInput {
  subject?: string;
  primaryContact?: { id: number };
  assignedTo?: {
    staffGroup: {
      lookupName: string;
    };
  };
  category?: {
    id: number;
  };
  statusWithType?: {
    status: {
      id: number;
    };
  };
  severity?: {
    lookupName: string;
  };
  threads?: {
    channel: { id: number };
    contentType: { id: number };
    entryType: { id: number };
    text: string;
  }[];
  fileAttachments?: {
    name: string;
    fileName: string;
    contentType: string;
    data: string;
  }[];
}
