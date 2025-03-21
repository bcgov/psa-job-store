/* eslint-disable @typescript-eslint/no-explicit-any */

import { PageInfo } from '../dtos/page-info.dto';

export interface NextAvailableJobProfileNumberResponse {
  nextAvailableJobProfileNumber: number;
}

export interface IsJobProfileNumberAvailableResponse {
  isJobProfileNumberAvailable: boolean;
}

export interface ClassificationModel {
  id: string;
  employee_group_id: string;
  peoplesoft_id: string;
  code: string;
  name: string;
  grade: string;
}

export interface CommentModel {
  id: string;
  author_id: string;
  record_id: string;
  record_type: string;
  text: string;
  created_at: string;
  updated_at?: string;
}

export interface ClassificationModelWrapped {
  classification: {
    id: string;
    employee_group_id: string;
    peoplesoft_id: string;
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

export interface GetClassificationsResponse {
  classifications: ClassificationModel[];
}

export interface GetClassificationResponse {
  classification: ClassificationModel;
}

export interface GetCommentsResponse {
  comments: CommentModel[];
}

export interface GetCommentResponse {
  comment: CommentModel;
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

export interface Scope {
  id: number;
  name?: string;
  description?: string;
}

export interface ScopeItem {
  scope: {
    id: number;
    name?: string;
    description?: string;
  };
}

export interface JobProfileModel {
  id: number;
  accountabilities: AccountabilitiesModel[];
  behavioural_competencies: BehaviouralCompetency[];
  classifications?: ClassificationModelWrapped[] | null;
  education: AccountabilitiesModel[];
  job_experience: AccountabilitiesModel[];
  organization_id: string;
  streams: Stream[];
  jobFamilies: JobFamily[];
  title: string | TrackedFieldArrayItem;
  number: number;
  context: string;
  overview: string | TrackedFieldArrayItem;
  type: string;
  role: { id: number; name?: string };
  owner: { id: string; name?: string };
  created_at: string;
  updated_at?: string;
  updated_by?: { id: string; name?: string };
  published_at?: string;
  published_by?: { id: string; name?: string };
  total_comp_create_form_misc?: {
    employeeGroup: string;
    markAllNonEditable: boolean;
    markAllSignificant: boolean;
    markAllNonEditableEdu: boolean;
    markAllSignificantEdu: boolean;
    markAllNonEditableProReg: boolean;
    markAllSignificantProReg: boolean;
    markAllNonEditableJob_experience: boolean;
    markAllSignificantJob_experience: boolean;
    markAllNonEditableSec: boolean;
    markAllSignificantSecurityScreenings: boolean;
    isAccountabilitiesSectionSignificant: boolean;
    isEducationSectionSignificant: boolean;
    isRelatedExperienceSectionSignificant: boolean;
    isProfessionalRegistrationSectionSignificant: boolean;
    isSecurityScreeningsSectionSignificant: boolean;
  };
  role_type: { id: number; name?: string };
  reports_to: ClassificationModelWrapped[];
  organizations: OrganizationsModelWrapped[];
  scope?: Scope; // new is Scope[], old is Scope for backwards compat
  scopes: ScopeItem[];
  review_required: boolean;
  professions: ProfessionsModel[];
  program_overview: string | TrackedFieldArrayItem;
  professional_registration_requirements: TrackedFieldArrayItem[];
  optional_requirements: TrackedFieldArrayItem[];
  preferences: TrackedFieldArrayItem[];
  knowledge_skills_abilities: TrackedFieldArrayItem[];
  willingness_statements: TrackedFieldArrayItem[];
  security_screenings: SecuritiyScreeningModel[];
  all_reports_to: boolean;
  state?: string;
  is_archived?: boolean;
  version: number;
}

export interface IdVersion {
  id: number;
  version: number;
}
export interface JobProfileMetaModel {
  totalViews: number;
  firstPublishedBy: {
    date: string | null;
    user: string | null;
  };
  firstCreatedBy: {
    date: string | null;
    owner: string | null;
  };
  versions: Array<IdVersion>;
}

export interface ProfessionsModel {
  jobFamily: number;
  jobStreams: number[];
}

export interface EmployeeGroupClassificationsModel {
  employeeGroup: string | null;
  classification: string | null;
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

export interface EditFieldModel {
  text: string;
  is_readonly?: boolean;
  is_significant?: boolean;

  // HM view
  isCustom?: boolean;
  disabled?: boolean;
}

export interface AccountabilitiesModel {
  text: string | TrackedFieldArrayItem;
  is_readonly?: boolean;
  tc_is_readonly?: boolean;
  is_significant?: boolean;

  // HM view
  isCustom?: boolean;
  disabled?: boolean;

  // total comp
  nonEditable?: boolean;
}

export interface SecuritiyScreeningModel {
  text: string | TrackedFieldArrayItem;
  is_readonly?: boolean;
  is_significant?: boolean;
  tc_is_readonly?: boolean;

  // HM view
  isCustom?: boolean;
  disabled?: boolean;
}

export interface DocumentModel {
  id: string;
  file_extension: string;
  title: string;
  description: string;
  url: string;
  category: string;
  jobStreams: Stream[];
  jobFamilies: JobFamily[];
  created_at: string;
  updated_at: string;
}

export class TrackedFieldArrayItem {
  text: string;
  disabled?: boolean;
  isCustom?: boolean;
  is_significant?: boolean;
  is_readonly?: boolean;
  tc_is_readonly?: boolean;

  // total comp
  nonEditable?: boolean;
}
interface NumberConnectInput {
  connect: {
    id: number;
  };
}

export interface ClassificationConnectInput {
  classification: {
    connect: {
      id_employee_group_id_peoplesoft_id: {
        id: string;
        employee_group_id: string;
        peoplesoft_id: string;
      };
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

interface JobFamilyConnectInput {
  connect: {
    id: number;
  };
}

interface JobFamilyCreateInput {
  jobFamily: JobFamilyConnectInput;
}

interface ScopeCreateInput {
  scope: JobFamilyConnectInput;
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
    behavioural_competencies: BehaviouralCompetency[];
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
    role: NumberConnectInput;
    role_type: NumberConnectInput;
    scope: ScopeCreateInput;
    jobFamilies: {
      create: JobFamilyCreateInput[];
    };
    streams: {
      create: StreamCreateInput[];
    };
    reports_to: {
      create: ClassificationConnectInput[];
    };
    owner_id: string;
    created_at: string;
    updated_at?: string;
    updated_by_id?: string;
    published_at?: string;
    published_by_id?: string;
  };
  id?: number;
}

export interface updateJobProfileViewCountInput {
  //jobProfileId, addViews
  jobProfiles: number[];
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

export interface UpdateJobProfileResponse {
  updateJobProfile: number;
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
  departmentId?: string;
}

export interface GetJobProfilesResponse {
  jobProfiles: JobProfileModel[];
  jobProfilesCount: number;
  pageNumberForSelectProfile: number;
}

export interface GetJobProfileMetaResponse {
  jobProfileMeta: JobProfileMetaModel;
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
  version?: number;
}

export interface GetJobProfileResponse {
  jobProfile: JobProfileModel;
}

export interface GetJobProfileMetaResponse {
  jobProfile: JobProfileMetaModel;
}

export interface GetJobProfileByNumberResponse {
  jobProfileByNumber: JobProfileModel;
}

export interface GetDocumentsResponse {
  documentsWithCount: { data: DocumentModel[]; pageInfo: PageInfo };
}

export interface GetDocumentByIdResponse {
  document: DocumentModel | null;
}

export interface CheckURLResponse {
  checkURL: DocumentModel | null;
}

export class GetDocumentsArgs {
  where?: {
    AND: Record<string, unknown>[];
  };
  orderBy?:
    | { name: { sort: 'asc' | 'desc' } }
    | { email: { sort: 'asc' | 'desc' } }
    | ({ name: { sort: 'asc' | 'desc' } } | { email: { sort: 'asc' | 'desc' } })[];
  skip?: number;
  take?: number;
}
