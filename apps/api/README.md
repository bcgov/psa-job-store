# PSA Job Store API

The PSA Job Store API is a NestJS-based backend service that provides GraphQL endpoints for the Job Store application. It handles data management, authentication, and integration with external systems like PeopleSoft and CRM.

## Architecture Overview

The API is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. It follows a modular architecture with GraphQL as the primary API interface, Prisma for database access, and Elasticsearch for search functionality.

The application is bootstrapped in `main.ts`, which configures the NestJS application with essential middleware, security settings, and global pipes. The API uses Express as the underlying HTTP server framework with session management, CORS protection, and JSON parsing capabilities.

The `AppModule` serves as the root module that imports and configures all feature modules, global providers, and middleware. It uses a modular approach where each domain area (job profiles, position requests, users, etc.) is encapsulated in its own module with clear boundaries and responsibilities.

### Core Components

- **NestJS Framework**: Provides dependency injection, decorators, middleware support, and guards
- **GraphQL API**: Implemented with Apollo Server with automatic schema generation and custom logging plugins
- **Prisma ORM**: Used for database access and migrations with support for read replicas
- **Elasticsearch**: Powers the search capabilities for Job Profiles
- **Authentication**: Session-based with KeyCloak integration for IDIR and BCeID
- **External Integrations**: PeopleSoft and CRM systems
- **Logging**: Structured logging with Pino
- **Scheduling**: Task scheduling with NestJS Schedule module for background processing

### Application Bootstrap Process

The application bootstrap process in `main.ts` includes:

1. Creating the NestJS application
2. Configuring CORS with credentials support for the frontend application
3. Setting up session management with secure cookies and PostgreSQL session store
4. Configuring Passport for authentication
5. Setting up validation pipes for automatic DTO validation
6. Enabling shutdown hooks for graceful termination
7. Starting the HTTP server on the configured port

### Module Structure

The application is organized into domain-specific modules. Some of the modules include:

- **Position Request Module**: Manages position request lifecycle and workflow
- **Job Profile Module**: Handles job profile creation, publication, and search
- **User Module**: Manages user data, synchronization, and role-based access
- **Scheduled Task Module**: Handles background processing and data synchronization
- **Search Module**: Provides Elasticsearch integration for full-text search
- **External Module**: Integrates with PeopleSoft, CRM, and other external systems
- **Keycloak Module**: Manages authentication and user identity
- **Organization Module**: Handles organizational structure and departments
- **Settings Module**: Provides administrative functionality and user import

Each module encapsulates its own controllers, services, resolvers, and data access logic, promoting separation of concerns and maintainability.

## Environment Configuration

The API uses environment variables for configuration. Key variables include:

| Variable             | Description                            | Default               |
| -------------------- | -------------------------------------- | --------------------- |
| `DATABASE_URL`       | PostgreSQL connection string           | -                     |
| `ELASTICSEARCH_NODE` | Elasticsearch endpoint                 | http://localhost:9200 |
| `SESSION_SECRET`     | Secret for session encryption          | -                     |
| `REACT_APP_URL`      | Frontend URL for CORS                  | http://localhost:5173 |
| `USE_MOCKS`          | Use mock services instead of real ones | false                 |
| `E2E_TESTING`        | Enable E2E testing mode                | false                 |
| `E2E_AUTH_KEY`       | Key for E2E authentication             | -                     |

See `sample.env` for a complete list of environment variables.

## Database Management

### Migrations

Prisma is used for database migrations. Common commands are listed below.

To reset database with migrations:

`npx -w api prisma migrate reset` - this will reset the schema and apply the migrations in order.

To create migration:
`npx -w api prisma migrate dev --name MIGRATION_NAME`

To apply new migrations after pulling latest code:

`npx -w api prisma migrate deploy`

Generate Prisma client:
`npx -w api prisma generate`

All migrations are stored in `prisma/migrations`

### Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:

- JobProfile
- PositionRequest
- Organization
- Classification
- User

### Database Seeding

The API uses Prisma's seeding mechanism to populate the database with initial data for development and testing purposes.

#### Seeding Configuration

The seeding process is configured in the `prisma` section of `package.json`:

```json
"prisma": {
  "seed": "npx ts-node --skipProject prisma/choose-seed.js"
}
```

#### Seed Files

- **`choose-seed.js`**: A utility script that determines which seed file to run based on the `SEED_FILE` environment variable. If not specified, it defaults to `prisma/run-e2e-seed.ts`.
- **`run-e2e-seed.ts`**: The default seed file that imports and runs the seed function from `src/utils/e2e-test-data-seed.ts`.
- **`e2e-test-data-seed.ts`**: Contains the main seed function that populates the database with test data, including users, job profiles, and other necessary entities for E2E testing.
- **`seed.ts`**: seed file that can be used for a production-type deployment

#### Running Seeds

To reset the database and run the seed:

```bash
npx -w api prisma migrate reset
```

To reset the database specifically with E2E test data:

```bash
npx -w api npm run migrate:reset:e2e-test
```

or

```bash
cross-env SEED_FILE=prisma/run-e2e-seed.ts npx prisma migrate reset
```

The e2e seeding process creates:

- System and test users with appropriate roles and metadata
- Test sessions for authentication
- Sample data for job profiles, position requests, and other entities required for testing

## Authentication System

The API uses session-based authentication with Keycloak integration for identity management. The authentication flow supports both BCeID and IDIR identity providers.

### Authentication Architecture

The authentication system is implemented in the `auth` module (`apps/api/src/modules/auth/`) and consists of the following key components:

- **AuthModule**: Main module that imports necessary dependencies and provides authentication services and guards
- **AuthController**: Handles authentication endpoints for login, logout, and callbacks
- **AuthService**: Core service for validating user information and managing user sessions
- **Guards**: Protect routes and GraphQL operations based on authentication status and user roles
- **Strategies**: Implement authentication strategies for BCeID and IDIR
- **Session Management**: Handles user session persistence and serialization

### Authentication Flow

1. **Login Initiation**: User initiates login via `/auth/login/bceid` or `/auth/login/idir` endpoints
2. **Redirection to Keycloak**: User is redirected to Keycloak for authentication
3. **Identity Provider Selection**: Keycloak presents BCeID or IDIR login options
4. **Authentication**: User authenticates with the selected identity provider
5. **Callback Processing**: After successful authentication, Keycloak redirects to the callback endpoint
6. **User Validation**: The system validates the user information using `AuthService.validateUserinfo()`
7. **Session Creation**: A session is created for the authenticated user
8. **Redirection to Frontend**: User is redirected to the frontend application

### Key Files

- **`auth.module.ts`**: Configures the authentication module and its dependencies
- **`auth.controller.ts`**: Defines authentication endpoints for login, logout, and callbacks
- **`auth.service.ts`**: Implements user validation and session management
- **`session-auth.guard.ts`**: Protects routes and GraphQL operations based on authentication status
- **`bceid.strategy.ts`/`idir.strategy.ts`**: Implement authentication strategies for BCeID and IDIR
- **`session.serializer.ts`**: Handles serialization and deserialization of user sessions
- **`oidc-strategy.factory.ts`**: Factory for creating OIDC client instances

### Session Management

Sessions are managed using Express session middleware with PostgreSQL storage:

- Sessions are stored in the `_session` table in the database
- Session configuration is defined in `main.ts` and `session.utils.ts`
- Session cookies are set to expire after 30 minutes (24 hours in E2E testing mode)
- Sessions are secured with HTTP-only cookies and a session secret

### Role-Based Access Control

The API implements role-based access control through:

- **User Roles**: Assigned based on user position and metadata
- **Guards**: Check user roles for protected routes and GraphQL operations
- **Decorators**: Apply guards to specific controllers, resolvers, and methods

### Testing Authentication

For E2E testing, the system provides:

- **Mock Authentication**: When `USE_MOCKS=true`, mock KeyCloak service is used for the `findUsers` function
- **E2E Authentication Endpoint**: When `E2E_TESTING=true`, the `/e2e-auth/generateSessionCookie` endpoint allows programmatic login

## External Services Integration

The PSA Job Store API integrates with several external services to provide comprehensive functionality. These integrations are managed through the `ExternalModule` located in `apps/api/src/modules/external/`.

### PeopleSoft Integration

The API communicates with PeopleSoft to retrieve and manage HR data such as positions, employees, classifications, departments, and organizations.

#### PeopleSoft Services

- **PeoplesoftService**: Primary service for interacting with PeopleSoft REST endpoints

  - Located at `apps/api/src/modules/external/peoplesoft.service.ts`
  - Handles authentication with PeopleSoft using Basic Auth
  - Provides methods for syncing data (classifications, locations, organizations, departments)
  - Supports position management (creation and retrieval)
  - Retrieves employee information and profiles

- **PeoplesoftV2Service**: Enhanced service with improved data handling
  - Located at `apps/api/src/modules/external/peoplesoft-v2.service.ts`
  - Focuses on employee data, profiles, and organizational relationships

#### PeopleSoft Endpoints

The services interact with the following PeopleSoft REST endpoints (note that not all of these endpoints are in use):

| Endpoint                    | Description                                  |
| --------------------------- | -------------------------------------------- |
| `PJS_TGB_REST_JOB_CODE`     | Retrieves classification data                |
| `TGB_PJS_POSITION.v1`       | Creates positions                            |
| `PJS_TGB_REST_DEPT`         | Retrieves department data                    |
| `PJS_TGB_REST_JOBCODE_DEPT` | Retrieves department-classification mappings |
| `PJS_TGB_REST_EMPLOYEE`     | Retrieves employee data                      |
| `PJS_TGB_REST_HRSCOPE`      | Retrieves HR scope information               |
| `PJS_TGB_REST_LOCATION`     | Retrieves location data                      |
| `PJS_TGB_REST_BUS_UNIT`     | Retrieves business unit/organization data    |
| `PJS_TGB_REST_USER_PROFILE` | Retrieves user profile information           |

### CRM Integration

The API integrates with a Customer Relationship Management (CRM) system to manage position requests and incidents.

#### CRM Service

- **CrmService**: Primary service for interacting with CRM REST endpoints
  - Located at `apps/api/src/modules/external/crm.service.ts`
  - Handles authentication with CRM using Basic Auth
  - Provides methods for creating and updating incidents
  - Syncs incident status for position requests
  - Retrieves account and contact information

#### CRM Endpoints

The service interacts with the following CRM REST endpoints:

| Endpoint       | Description                   |
| -------------- | ----------------------------- |
| `accounts`     | Manages account information   |
| `contacts`     | Manages contact information   |
| `incidents`    | Creates and updates incidents |
| `queryResults` | Executes custom queries       |

### GraphQL APIs for External Data

The API exposes several GraphQL endpoints to access external data:

#### Position API

- **PositionResolver**: Provides GraphQL queries for position data
  - Located at `apps/api/src/modules/external/position.resolver.ts`
  - Queries:
    - `position`: Retrieves a single position by ID
    - `positionProfile`: Retrieves position profiles with optional employee details

#### Classification API

- **ClassificationResolver**: Provides GraphQL queries for classification data
  - Located at `apps/api/src/modules/external/classification.resolver.ts`
  - Queries:
    - `classifications`: Retrieves classifications with filtering options
    - `groupedClassifications`: Retrieves classifications grouped by employee group

#### Organization Chart API

- **OrgChartResolver**: Provides GraphQL queries for organizational structure
  - Located at `apps/api/src/modules/external/org-chart.resolver.ts`
  - Queries:
    - `orgChart`: Retrieves organizational chart data for a department
    - `getOrgChartDepartmentFilter`: Retrieves department filter options for org charts

#### Location API

- **LocationResolver**: Provides GraphQL queries for location data
  - Located at `apps/api/src/modules/external/location.resolver.ts`
  - Queries:
    - `locations`: Retrieves location data with filtering options

### Data Synchronization

The API includes scheduled tasks for synchronizing data with external systems:

- **Classification Sync**: Periodically retrieves and updates classification data from PeopleSoft
- **Organization Sync**: Updates organization and department data from PeopleSoft
- **Incident Status Sync**: Updates position request statuses based on CRM incident status

### Mock Services for Development

For development and testing without external dependencies, the API provides mock implementations:

- **MockPeoplesoftService**: Simulates PeopleSoft service responses
- **MockCrmService**: Simulates CRM service responses
- **Mock Resolvers**: Provide GraphQL endpoints for interacting with mock data

## Keycloak Integration

The PSA Job Store API integrates with Keycloak for user management and role-based access control. This integration is managed through the `KeycloakModule` located in `apps/api/src/modules/keycloak/`.

### Keycloak Module Architecture

The Keycloak module consists of the following key components:

- **KeycloakModule**: Main module that provides the Keycloak service
- **KeycloakService**: Core service for interacting with Keycloak's REST API
- **KeycloakResolver**: GraphQL resolver for Keycloak-related queries
- **MockKeycloakService**: Mock implementation for development and testing

### Keycloak Service Functionality

The `KeycloakService` provides several key functions for user management and role assignment:

- **User Management**:

  - `findUsers`: Searches for users based on field and value
  - `getUsers`: Retrieves all users
  - `getUser`: Retrieves a specific user by ID

- **Role Management**:
  - `getRoles`: Retrieves all available roles
  - `getUsersForRole`: Retrieves users assigned to a specific role
  - `getUsersForRoles`: Retrieves users assigned to multiple roles
  - `assignUserRoles`: Assigns roles to a user
  - `unassignUserRole`: Removes a role from a user

The service uses the `@bcgov/citz-imb-sso-css-api` library to communicate with Keycloak, handling the conversion between UUIDs and GUIDs as needed.

### Mock Keycloak Service

For development and testing, the API provides a mock implementation:

- **MockKeycloakService**: Simulates Keycloak service responses using local JSON data
- When `USE_MOCKS=true`, the mock service is used instead of the real Keycloak service. Note that this currently only applies to the `findUsers`
  function, the rest will still use actual Keycloak calls. This enables the usage of a test user during e2e tests that doesn't exist in keycloak.

## User Module

The PSA Job Store API includes a User module that manages user data, synchronization with external systems, and role-based access control. This module is implemented in the `UserModule` located in `apps/api/src/modules/user/`.

### User Module Architecture

The User module consists of the following key components:

- **UserModule**: Main module that imports necessary dependencies for user management
- **UserService**: Core service that handles user operations and synchronization
- **UserResolver**: GraphQL resolver that exposes user management functionality

### User Service Functionality

The `UserService` provides user management capabilities:

- **User Retrieval**:

  - `getUser`: Retrieves a single user by ID or other unique fields from the JobStore database
  - `getUsers`: Retrieves multiple users with filtering, sorting, and pagination from the JobStore database
  - `getUsersWithCount`: Retrieves users with pagination information from the JobStore database
  - `getUserByEmployeeId`: Retrieves a user by their employee ID from the JobStore database

- **User Synchronization**:

  - `syncUser`: Synchronizes a single user's data with Keycloak, PeopleSoft, and CRM
  - `syncUsers`: Synchronizes all users' data with external systems
  - `upsertUser`: Creates or updates a user record in the database

- **Role Management**:

  - `assignUserRoles`: Assigns roles to a user and updates Keycloak
  - `unassignUserRole`: Removes a role from a user and updates Keycloak

- **Organization Chart Access**:
  - `setUserOrgChartAccess`: Sets a user's access to specific departments in the org chart
  - `getOrgChartAssignmentsForUser`: Determines department assignments based on PeopleSoft metadata

### User Metadata Management

The User module maintains metadata for each user:

- **PeopleSoft Metadata**:

  - Employee ID
  - Position ID
  - Department ID
  - Organization ID
  - Profile and employee information

- **CRM Metadata**:

  - Account ID
  - Contact ID

- **Org Chart Metadata**:
  - Department IDs for access control

### User Synchronization Process

The user synchronization process is a key feature of the User module:

1. **Retrieve User Information**:

   - Get user details from Keycloak
   - Retrieve PeopleSoft metadata (profile, employee data)
   - Retrieve CRM metadata (account, contact)

2. **Detect Changes**:

   - Identify changes in PeopleSoft metadata (position, department, organization)
   - Determine necessary updates to org chart access

3. **Update User Record**:

   - Create or update the user in the database
   - Update metadata with the latest information
   - Log significant changes for auditing

4. **Role Management**:
   - Synchronize roles between the application and Keycloak
   - Assign or remove roles based on position and metadata

### GraphQL API for User Management

The `UserResolver` exposes GraphQL queries and mutations for user management:

- **Queries**:

  - `users`: Retrieves multiple users
  - `usersWithCount`: Retrieves users with pagination information
  - `user`: Retrieves a single user by ID
  - `userByEmployeeId`: Retrieves a user by employee ID
  - `searchUsers`: Searches for users by name or position

- **Mutations**:
  - `setUserOrgChartAccess`: Sets a user's access to departments
  - `assignUserRoles`: Assigns roles to a user
  - `unassignUserRole`: Removes a role from a user

## Job Profile Module

The Job Profile module is a core component of the PSA Job Store API, providing comprehensive functionality for managing job profiles. This module is implemented in the `JobProfileModule` located in `apps/api/src/modules/job-profile/`.

### Job Profile Data Model

The job profile data model is comprehensive and includes:

- **Core Profile Information**:

  - Title, number, overview, and purpose
  - Role, scope, and organizational context
  - Classification and employee group
  - Ministry and department associations

- **Requirements and Qualifications**:

  - Professional registration requirements
  - Education and experience requirements
  - Knowledge, skills, and abilities
  - Behavioral competencies
  - Security screenings
  - Willingness statements and preferences

- **Relationships**:

  - Job family and stream associations
  - Reporting relationships
  - Related positions

- **Versioning and State Management**:
  - Version tracking for each profile
  - State transitions (Draft, Published, Archived)
  - Audit information (creation, modification, publication)

### Job Profile Lifecycle Management

The Job Profile module manages the complete lifecycle of job profiles:

1. **Creation and Drafting**:

   - Creating new job profiles with metadata
   - Saving profiles as drafts during development
   - Duplicating existing profiles as a starting point

2. **Review and Publication**:

   - Transitioning profiles from draft to published state
   - Version management for published profiles
   - Tracking publication metadata (date, user)

3. **Maintenance and Updates**:

   - Creating new versions of existing profiles
   - Tracking changes between versions

4. **Archiving and Deletion**:
   - Archiving obsolete profiles
   - Unarchiving profiles when needed
   - Permanent deletion

### Search and Discovery

The Job Profile module provides search capabilities:

- **Full-Text Search**: Integration with Elasticsearch for powerful text search
- **Filtered Search**: Complex filtering by classification, organization, job family, etc.
- **Sorting Options**: Multiple sorting criteria including title, classification, and organization
- **Pagination**: Efficient retrieval of large result sets

### GraphQL API for Job Profile Management

The `JobProfileResolver` exposes a comprehensive GraphQL API:

- **Queries**:

  - `jobProfiles`: Retrieves published job profiles with filtering, sorting, and pagination
  - `jobProfilesDrafts`: Retrieves draft job profiles for the current user
  - `jobProfilesArchived`: Retrieves archived job profiles
  - `jobProfile`: Retrieves a specific job profile by ID and version
  - `jobProfileByNumber`: Retrieves a job profile by its number
  - `jobProfileMeta`: Retrieves metadata about a job profile (views, versions, etc.)
  - `jobProfilesMinistries`: Retrieves ministries associated with job profiles
  - `jobProfilesClassifications`: Retrieves classifications used in job profiles
  - `getRequirementsWithoutReadOnly`: Retrieves requirements that can be used in job profiles

- **Mutations**:
  - `createOrUpdateJobProfile`: Creates a new job profile or updates an existing one
  - `duplicateJobProfile`: Creates a copy of an existing job profile
  - `updateJobProfileState`: Changes the state of a job profile (draft, published, archived)
  - `deleteJobProfile`: Permanently removes a job profile
  - `unarchiveJobProfile`: Restores an archived job profile
  - `updateJobProfileViewCount`: Updates the view count for job profiles

### Integration with Position Requests

The Job Profile module integrates with the Position Request workflow:

- Job profiles can be associated with position requests
- Changes to job profiles are tracked in relation to position requests through versioning

## Position Request Module

The Position Request module is a core component of the PSA Job Store application, responsible for managing the entire lifecycle of position requests from creation to completion. This module handles the workflow for creating new positions, updating existing ones, and integrating with external systems like PeopleSoft and CRM.

### Position Request Lifecycle

Position requests follow a defined workflow:

1. **Creation**: A user creates a draft position request with basic information.
2. **Editing**: The user completes the position request with detailed information, including job profile, reporting structure, and organizational details.
3. **Submission**: The completed request is submitted, which creates a CRM incident and initiates the approval process if necessary.
4. **Verification**: The request undergoes verification by appropriate stakeholders.
5. **Review**: Classification experts review the position request.
6. **Action Required**: If changes are needed, the request is sent back to the requester.
7. **Completion**: Once approved, the position is created in PeopleSoft and marked as completed.

### Status Management

Position requests have several statuses that reflect their current state in the workflow:

- **DRAFT**: Initial state for new position requests
- **VERIFICATION**: Request is being verified by stakeholders
- **REVIEW**: Request is under review by classification experts
- **ACTION_REQUIRED**: Changes are required from the requester
- **COMPLETED**: Position has been created and the request is complete
- **CANCELLED**: Request has been cancelled

The module includes a utility function (`getALStatus`) that maps CRM incident status and PeopleSoft position status to position request statuses, ensuring consistency between systems.

### Integration with External Systems

The Position Request module integrates with two external systems:

- **CRM**: Creates and updates incidents for tracking position requests
- **PeopleSoft**: Creates and updates position information

When a position request is submitted, the service:

1. Creates a position in PeopleSoft
2. Creates a CRM incident with position details
3. Updates the organization chart snapshot stored with the position request to include the new position, supervisor info and the excluded manager info

### GraphQL API

The module exposes a comprehensive GraphQL API through the `PositionRequestApiResolver`:

#### Queries

- `getPositionRequests`: Retrieves a list of position requests with filtering and search capabilities
- `getPositionRequest`: Retrieves a specific position request by ID
- `getSharedPositionRequest`: Retrieves a position request by its share UUID
- `getPositionRequestByNumber`: Retrieves a position request by position number
- `positionRequestsCount`: Counts position requests by status
- `positionNeedsReview`: Checks if a position request needs review
- `getPositionRequestUserClassifications`: Retrieves classifications available to the current user
- `suggestedManagers`: Retrieves suggested excluded managers for a position for the "Additional Details" step of the process

#### Mutations

- `createPositionRequest`: Creates a new position request
- `updatePositionRequest`: Updates an existing position request
- `submitPositionRequest`: Submits a position request for approval
- `deletePositionRequest`: Deletes a position request

### Organization Chart Management

A key feature of the Position Request module is the management of organizational charts:

- Position requests include an organization chart showing the reporting structure
- When a position is created or updated, the organization chart is automatically updated. The organizational chart is embedded into the position request as a snapshot and includes infromation about the new position as well as the reporting manager and the excluded manager.

## Database Access with Prisma

The PSA Job Store API uses Prisma ORM for database access and management. This integration is handled through the `PrismaModule` located in `apps/api/src/modules/prisma/`.

### Prisma Module Architecture

The Prisma module consists of the following key components:

- **PrismaModule**: Global module that provides database access services to the entire application
- **PrismaService**: Core service that extends the Prisma client with custom functionality
- **PGLitePrismaService**: In-memory database service used for E2E testing
- **ExtendedPrismaClient**: Custom Prisma client with extensions for enhanced functionality. This is where replica client is setup that routes SQL queries to different Postgres instances, depending if they are write commands vs. read commands (write commands are routed to the primary instance, while read queries can be routed to any instance)

### Service Selection Based on Environment

The `PrismaModule` dynamically selects the appropriate Prisma service based on the environment:

- In development environments, it uses the standard `PrismaService` with a PostgreSQL database
- In E2E testing environments (when `E2E_TESTING=true` and not in development), it uses the `PGLitePrismaService` with an in-memory database

### Extended Prisma Client

The API extends the standard Prisma client with custom functionality:

- **Read Replicas**: Support for database read replicas to improve performance
- **FindManyAndCount**: Custom method that returns both data and pagination information in a single query

### In-Memory Database for E2E Testing

For E2E testing, the API uses `PGLitePrismaService`, which provides an in-memory PostgreSQL-compatible database:

- Uses `@electric-sql/pglite` for in-memory database functionality
- Automatically initializes the database schema and seeds test data
- Provides the same API as the standard Prisma service

This approach allows E2E tests to run without an external database dependency, making tests more reliable and faster.

### Pagination Support

The Prisma module includes built-in support for pagination through:

- **FindManyAndCount Extension**: Custom Prisma extension that returns data and pagination information
- **PageInfo Model**: GraphQL object type for standardized pagination response

### Usage in Services

Services throughout the application inject and use the `PrismaService` to interact with the database:

```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    // other dependencies...
  ) {}

  async getUser(args?: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args);
  }

  async getUsersWithCount(args?: FindManyUserArgs) {
    const [users, page, pageCount, pageSize, totalCount] = await this.prisma.user.findManyAndCount(args);

    return {
      users,
      pageInfo: {
        page,
        pageCount,
        pageSize,
        totalCount,
      },
    };
  }
}
```

## Mock Services

For development without external dependencies, the API can use mock services:

In case CRM/PeopleSoft/KeyCloak API services are not available, there is a mechanism to use mock services instead. For this, set `USE_MOCKS` in
apps/api to `true`.

With this flag on, API will use data stored in:

`\apps\api\test\mock-peoplesoft-data.json` (for KeyCloak and PeopleSoft data)

and

`\apps\api\test\mock-crm-data.json` for CRM data

## E2E Testing Configuration

For E2E testing, set `E2E_TESTING=true` in your `.env` file. This will:

Setting `E2E_TESTING` flag to `true` will:

- Extend session cookie to 24 hours (instead of 30 minutes)
- Enable the `e2e-auth/generateSessionCookie` endpoint that will allow generation of session cookies without the use of KeyCloak, enabling
  cypress to login into the system programmatically (requires `E2E_AUTH_KEY` as well)
- Enable the `health/resetIndex` endpoint that allows resetting of elastic search index using API
- Prevents updating of user records upon login if using KeyCloak (if user doesn't exist they will still be created)
- If running in production environment, the system will use in-memory database instead of Postgres (locally will still use Postgres)
- Will disable all chron tasks except CRM sync, that will now run on every tick (so we can verify position request status syncing)

The `E2E_AUTH_KEY` variable is used to access protected API endpoints during E2E testing via the `x-e2e-key` header.

### E2E_AUTH_KEY variable

This variable can be used to access certain protected API endpoints when performing e2e testing. This is done via the E2EAuthGuard decorator that
checks for the presence of `x-e2e-key` header in the request and comparing it to the stored value. E2EAuthGuard is applied the following
endpoints:

- `e2e-auth/generateSessionCookie` (requires `E2E_TESTING` flag set to true as well)
- `health/dumpCreateSchema` - creates a sql dump of the current database and returns in response
- `health/testLoad` and `health/testLoadNoDB` to perform load testing for two scenarios: one that involves a database and one that does not.

## API Endpoints

### GraphQL

The main API interface is GraphQL, available at `/graphql`. Key query and mutation areas:

- Job Profiles
- Position Requests
- Organizations
- Classifications
- Users
- Search

### REST Endpoints

Some functionality is exposed via REST endpoints:

- `/health` - Health check and system status
- `/e2e-auth` - E2E testing authentication (when enabled)
- `/auth` - Authentication endpoints

## Deployment

The API is deployed to OpenShift using GitHub Actions. The deployment process:

1. Builds the Docker image
2. Pushes to Artifactory
3. Deploys to OpenShift
4. Runs database migrations

See the GitHub Actions workflows in `.github/workflows` for details.

## Scheduled Tasks

The PSA Job Store API includes a scheduled task system for background processing and data synchronization. This functionality is implemented in the `ScheduledTaskModule` located in `apps/api/src/modules/scheduled-task/`.

### Scheduled Task Architecture

The scheduled task system consists of the following key components:

- **ScheduledTaskModule**: Main module that imports necessary dependencies and initializes tasks on application startup
- **ScheduledTaskService**: Core service that implements and manages scheduled tasks
- **Task Lock System**: Prevents concurrent execution of the same task across multiple instances
- **Task Metadata**: Tracks task execution history and frequency

### Task Types

The API implements several scheduled tasks:

1. **CRM Synchronization** (`CrmSync`):

   - Frequency: Runs every minute
   - Purpose: Synchronizes position request statuses with CRM incident statuses as well as PeopleSoft positions tatus
   - Implementation: Retrieves incident status updates from CRM as well as PeopleSoft position status and updates corresponding position requests

2. **PeopleSoft Synchronization** (`PeoplesoftSync`):

   - Frequency: Runs every 24 hours
   - Purpose: Synchronizes reference data from PeopleSoft
   - Implementation: Updates classifications, locations, organizations, and departments

3. **User Synchronization** (`UserSync`):

   - Frequency: Runs every 24 hours
   - Purpose: Synchronizes user data with Keycloak and PeopleSoft
   - Implementation: Updates user metadata, roles, and department associations

4. **Job Profile View Count Update**:
   - Frequency: Runs every 20 seconds
   - Purpose: Updates job profile view counts from cache to database
   - Implementation: Retrieves view counts from cache and increments database counters

### Task Execution Flow

Each scheduled task follows a consistent execution flow:

1. **Frequency Check**: Determines if enough time has passed since the last execution
2. **Lock Acquisition**: Attempts to acquire a database lock to prevent concurrent execution
3. **Task Execution**: Performs the actual task logic
4. **Metadata Update**: Updates the last run time and frequency in the database
5. **Lock Release**: Releases the lock to allow future executions

### Lock Management

The system uses a database-based locking mechanism to prevent concurrent execution of tasks:

- Locks are stored in the `CronLock` table with task name and expiration time
- Before execution, the system attempts to acquire a lock with a specified timeout
- Expired locks are automatically cleaned up to prevent deadlocks
- Locks are released after task completion or failure

### Task Metadata

Task execution history is tracked in the `ScheduledTaskMetadata` table:

- Stores the last execution time for each task
- Tracks the configured frequency for each task
- Used to determine if a task needs to be executed

### E2E Testing Considerations

During E2E testing (when `E2E_TESTING=true`):

- Most scheduled tasks are disabled to prevent interference with tests
- Only the CRM synchronization task runs, with modified behavior to execute on every tick
- This allows testing of position request status synchronization without waiting for the normal schedule

### Initialization on Application Startup

When the application starts, the `ScheduledTaskModule` triggers an initial execution of key tasks:

```typescript
async onApplicationBootstrap() {
  await this.scheduledTaskService.syncPositionStatuses();
  await this.scheduledTaskService.syncPeoplesoftData();
  await this.scheduledTaskService.syncUsers();
}
```

This ensures that the system has up-to-date data immediately after startup, without waiting for the scheduled execution.

### Logging and Monitoring

The scheduled task system includes logging:

- Task start and completion times are logged
- Errors during task execution are captured and logged
- Structured logging via `globalLogger` for integration with monitoring systems

### Position Status Synchronization

1. Retrieves incident status updates from CRM
2. For each updated incident:
   - Finds the corresponding position request in the database
   - Retrieves the position details from PeopleSoft
   - Calculates the new status based on CRM and PeopleSoft data
   - Updates the position request status in the database
   - Handles unknown states with appropriate metadata

This task ensures that position request statuses in the application accurately reflect their current state in both CRM and PeopleSoft systems.

## Settings Module

The PSA Job Store API includes a Settings module that provides administrative functionality for system configuration and user management. This module is implemented in the `SettingsModule` located in `apps/api/src/modules/settings/`.

### User Import System

The User Import feature allows administrators to search for users in Keycloak and import them into the application. The user import process follows these steps:

1. **User Search**: Administrators search for users by email address

   - Searches both the application database and Keycloak
   - Combines results with source information (job-store, keycloak)
   - Returns a unified list of users with their source systems

2. **User Import**: Administrators select a user to import
   - Triggers the `UserService.syncUser()` method to synchronize user data
   - Retrieves user data from Keycloak, PeopleSoft, and CRM
   - Creates or updates the user record with complete metadata

### Integration with User Module

The Settings module leverages the User module's functionality:

- Uses `UserService.getUsers()` to search for existing users in the database
- Uses `UserService.syncUser()` to import and synchronize user data
- Uses `UserService.getUser()` to retrieve the imported user with complete metadata

## Error handling with AlexandriaError exception class

When there's an API error that hasn't been handled, user on the front end will see the "Unknown error", but if there's an issue that is expected, an AlexandriaError gets thrown. For example if Total Compensation user tries to create a job profile with a number that already exists the following code willrun:

`throw AlexandriaError('A job profile with this number already exists. Please use a different number.');`

Then on the client there's code that checks if the error returned was of `AlexandriaError` type and in that case it will display that message to the user.
