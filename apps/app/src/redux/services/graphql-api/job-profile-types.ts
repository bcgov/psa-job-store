/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ClassificationModel {
  id: string;
  code: string;
}

export interface GetClassificationsResponse {
  classifications: ClassificationModel[];
}

export interface JobProfileModel {
  id: number;
  accountabilities: Accountabilities;
  behavioural_competencies: BehaviouralCompetencies[];
  classification: ClassificationModel | null;
  requirements: (string | TrackedFieldArrayItem)[];
  organization_id: string;
  family_id: number;
  stream: string;
  title: string | TrackedFieldArrayItem;
  number: number;
  context: string;
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
  accountabilities: Accountabilities;
  requirements: string[];
  behavioural_competencies?: BehaviouralCompetenciesInput;
  classification: ClassificationConnectInput;
  state: string;
  parent: ParentConnectInput;
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

export interface GetJobProfileArgs {
  id: number;
}

export interface GetJobProfileResponse {
  jobProfile: JobProfileModel;
}
