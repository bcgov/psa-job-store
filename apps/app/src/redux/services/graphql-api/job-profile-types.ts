/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ClassificationModel {
  id: string;
  code: string;
}

export interface ClassificationModelWrapped {
  classification: {
    id: string;
    code: string;
  };
}

export interface JobProfilesMinistriesResponse {
  jobProfilesMinistries: {
    id: string;
    name: string;
  }[];
}

export interface JobProfilesDraftsMinistriesResponse {
  jobProfilesDraftsMinistries: {
    id: string;
    name: string;
  }[];
}

export interface JobProfilesCareerGroupsResponse {
  jobProfilesCareerGroups: {
    id: number;
    name: string;
  }[];
}

export interface JobProfilesDraftsCareerGroupsResponse {
  jobProfilesDraftsCareerGroups: {
    id: number;
    name: string;
  }[];
}

export interface ContextModel {
  id: number;
  description: string;
}

export interface GetClassificationsResponse {
  classifications: ClassificationModel[];
}

export interface JobProfileModel {
  id: number;
  accountabilities: Accountabilities;
  behavioural_competencies: BehaviouralCompetencies[];
  classifications: ClassificationModelWrapped[] | null;
  requirements: (string | TrackedFieldArrayItem)[];
  organization_id: string;
  family_id: number;
  stream: string;
  title: string | TrackedFieldArrayItem;
  number: number;
  context: ContextModel;
  overview: string | TrackedFieldArrayItem;
}

export interface BehaviouralCompetencies {
  behavioural_competency: BehaviouralCompetency;
}

export interface BehaviouralCompetency {
  id: number;
  name: string;
  description: string;
}

interface Accountabilities {
  optional: (string | TrackedFieldArrayItem)[];
  required: (string | TrackedFieldArrayItem)[];
}

export class TrackedFieldArrayItem {
  value: string;
  disabled?: boolean;
  isCustom?: boolean;
}

interface BehaviouralCompetencyConnect {
  id: number;
}

interface BehaviouralCompetencyItem {
  behavioural_competency: {
    connect: BehaviouralCompetencyConnect;
  };
}

interface BehaviouralCompetenciesInput {
  create: BehaviouralCompetencyItem[];
}

interface ClassificationConnectInput {
  connect: {
    id: string;
  };
}

interface ParentConnectInput {
  connect: {
    id: number;
  };
}

export interface CreateJobProfileInput {
  stream: string;
  title: string;
  number: number;
  context: string;
  overview: string;
  requirements: string[];
  accountabilities: Accountabilities;
  behavioural_competencies?: BehaviouralCompetenciesInput;
  classification: ClassificationConnectInput;
  parent: ParentConnectInput;
  state: string;
}

export interface CreateJobProfileResponse {
  id: number;
}

export interface GetJobProfilesArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
}

export interface GetJobProfilesResponse {
  jobProfiles: JobProfileModel[];
  jobProfilesCount: number;
}

export interface GetJobProfilesDraftsResponse {
  jobProfilesDrafts: JobProfileModel[];
  jobProfilesDraftsCount: number;
}

export interface GetJobProfileArgs {
  id?: number;
  number?: number;
}

export interface GetJobProfileResponse {
  jobProfile: JobProfileModel;
}
