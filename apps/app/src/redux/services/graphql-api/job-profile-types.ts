/* eslint-disable @typescript-eslint/no-explicit-any */

export interface NextAvailableJobProfileNumberResponse {
  nextAvailableJobProfileNumber: number;
}

export interface IsJobProfileNumberAvailableResponse {
  isJobProfileNumberAvailable: boolean;
}

export interface ClassificationModel {
  id: string;
  code: string;
  name: string;
  grade: string;
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

interface JobFamilyDetail {
  id: number;
  name: string;
}

interface StreamDetail {
  id: number;
  job_family_id: number;
  name: string;
}

export interface JobFamily {
  jobFamily: JobFamilyDetail;
}

export interface Stream {
  stream: StreamDetail;
}

export interface JobProfileModel {
  id: number;
  accountabilities: Accountabilities;
  behavioural_competencies: BehaviouralCompetencies[];
  classifications: ClassificationModelWrapped[] | null;
  requirements: (string | TrackedFieldArrayItem)[];
  organization_id: string;
  streams: Stream[];
  jobFamilies: JobFamily[];
  title: string | TrackedFieldArrayItem;
  number: number;
  context: ContextModel;
  overview: string | TrackedFieldArrayItem;
  type: string;
  role: { id: number };
  total_comp_create_form_misc: {
    employee_group: string;
  };
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

interface NumberConnectInput {
  connect: {
    id: number;
  };
}

interface ClassificationConnectInput {
  classification: {
    connect: {
      id: string;
    };
  };
}

interface OrganizationConnectInput {
  organization: {
    connect: {
      id: string;
    };
  };
}

interface BehaviouralCompetencyConnectInput {
  connect: {
    id: number;
  };
}

interface BehaviouralCompetencyCreateInput {
  behavioural_competency: BehaviouralCompetencyConnectInput;
}

interface BehaviouralCompetenciesInput {
  create: BehaviouralCompetencyCreateInput[];
}

interface JobFamilyConnectInput {
  connect: {
    id: number;
  };
}

interface JobFamilyCreateInput {
  jobFamily: JobFamilyConnectInput;
}

interface StreamConnectInput {
  connect: {
    id: number;
  };
}

interface StreamCreateInput {
  stream: StreamConnectInput;
}

interface AccountabilitiesInput {
  optional: string[];
  required: string[];
}

export interface CreateJobProfileInput {
  data: {
    title: string;
    type: string;
    number: number;
    overview: string;
    state?: string;
    program_overview: string;
    review_required: boolean;
    accountabilities: AccountabilitiesInput;
    requirements: string[];
    professional_registration_requirements: string[];
    preferences: string[];
    knowledge_skills_abilities: string[];
    willingness_statements: string[];
    security_screenings: string[];
    total_comp_create_form_misc: any;
    behavioural_competencies: BehaviouralCompetenciesInput;
    classifications: {
      create: ClassificationConnectInput[];
    };
    organizations: {
      create: OrganizationConnectInput[];
    };
    context: {
      create: {
        description: string;
      };
    };
    role: NumberConnectInput; // Assuming this connects to a classification-like entity
    role_type: NumberConnectInput; // Assuming this connects to a classification-like entity
    scope: NumberConnectInput; // Assuming this connects to a classification-like entity
    jobFamilies: {
      create: JobFamilyCreateInput[];
    };
    streams: {
      create: StreamCreateInput[];
    };
    reports_to: {
      create: ClassificationConnectInput[];
    };
  };
  id?: number;
}

export interface CreateJobProfileResponse {
  createOrUpdateJobProfile: {
    id: number;
  };
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
