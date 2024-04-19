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
  employee_group_id: string;
}

export interface ClassificationModelWrapped {
  classification: {
    id: string;
    code: string;
    name: string;
  };
}

export interface JobProfilesMinistriesResponse {
  jobProfilesMinistries: {
    id: string;
    name: string;
  }[];
}

export interface JobProfilesClassificationsResponse {
  jobProfilesClassifications: ClassificationModel[];
}

export interface JobProfilesDraftsClassificationsResponse {
  jobProfilesDraftsClassifications: ClassificationModel[];
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

export interface GetClassificationResponse {
  classification: ClassificationModel;
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
  accountabilities: AccountabilitiesModel[];
  behavioural_competencies: BehaviouralCompetencies[];
  classifications: ClassificationModelWrapped[] | null;
  education: AccountabilitiesModel[];
  job_experience: AccountabilitiesModel[];
  organization_id: string;
  streams: Stream[];
  jobFamilies: JobFamily[];
  title: string | TrackedFieldArrayItem;
  number: number;
  context: ContextModel | string;
  overview: string | TrackedFieldArrayItem;
  type: string;
  role: { id: number; name?: string };
  updated_at?: string;
  total_comp_create_form_misc?: {
    employeeGroup: string;
    markAllNonEditable: boolean;
    markAllSignificant: boolean;
    markAllNonEditableEdu: boolean;
    markAllSignificantEdu: boolean;
    markAllNonEditableJob_experience: boolean;
    markAllSignificantJob_experience: boolean;
    markAllNonEditableSec: boolean;
  };
  role_type: { id: number; name?: string };
  reports_to: ClassificationModelWrapped[];
  organizations: OrganizationsModelWrapped[];
  scope: { id: number; name?: string; description?: string };
  review_required: boolean;
  professions: ProfessionsModel[];
  program_overview: string | TrackedFieldArrayItem;
  professional_registration_requirements: TrackedFieldArrayItem[];
  optional_requirements: TrackedFieldArrayItem[];
  preferences: TrackedFieldArrayItem[];
  knowledge_skills_abilities: TrackedFieldArrayItem[];
  willingness_statements: TrackedFieldArrayItem[];
  security_screenings: SecuritiyScreeningModel[];
  all_organizations: boolean;
  all_reports_to: boolean;
  state?: string;
}

export interface ProfessionsModel {
  jobFamily: number;
  jobStreams: number[];
}

export interface OrganizationsModelWrapped {
  organization: {
    id: string;
    name?: string;
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

export interface AccountabilitiesModel {
  text: string | TrackedFieldArrayItem;
  is_readonly?: boolean;
  is_significant?: boolean;

  // HM view
  isCustom?: boolean;
  disabled?: boolean;
}

export interface SecuritiyScreeningModel {
  text: string | TrackedFieldArrayItem;
  is_readonly?: boolean;

  // HM view
  isCustom?: boolean;
  disabled?: boolean;
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

export interface ClassificationConnectInput {
  classification: {
    connect: {
      id: string;
    };
  };
}

export interface OrganizationConnectInput {
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
    education: string[];
    job_experience: string[];
    professional_registration_requirements: string[];
    optional_requirements: string[];
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

export interface DuplicateJobProfileResponse {
  duplicateJobProfile: number;
}

export interface DeleteJobProfileResponse {
  deleteJobProfile: number;
}

export interface UnarchiveJobProfileResponse {
  deleteJobProfile: number;
}

export interface GetJobProfilesArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
  sortByClassificationName?: boolean;
  sortByJobFamily?: boolean;
  sortByOrganization?: boolean;
  sortOrder?: string;
  selectProfile?: string | null | undefined;
}

export interface GetJobProfilesResponse {
  jobProfiles: JobProfileModel[];
  jobProfilesCount: number;
  pageNumberForSelectProfile: number;
}

export interface GetJobProfilesDraftsResponse {
  jobProfilesDrafts: JobProfileModel[];
  jobProfilesDraftsCount: number;
}

export interface GetJobProfilesArchivedResponse {
  jobProfilesArchived: JobProfileModel[];
  jobProfilesArchivedCount: number;
}

export interface GetJobProfileArgs {
  id?: number;
  number?: number;
}

export interface GetJobProfileResponse {
  jobProfile: JobProfileModel;
}
