# PSA Job Store Deployments

This directory contains all deployment-related configurations and resources for the PSA Job Store application. It includes build configurations, OpenShift deployment templates, and environment-specific configurations.

## Directory Structure

```
deployments/
├── builds/                  # Docker build configurations
│   ├── nginx_rp/            # Nginx reverse proxy configuration
│   │   ├── Dockerfile       # OpenResty-based Nginx container with OpenIDC support
│   │   ├── nginx.conf       # Base Nginx configuration
│   │   ├── nginx.serv.conf  # Service-specific Nginx configuration
│   │   ├── nginx.test.conf  # Test environment Nginx configuration
│   │   └── entrypoint.sh    # Container entrypoint script
│   └── logrotate/           # Log rotation configuration
│       ├── Dockerfile       # Alpine-based logrotate container
│       ├── logrotate.conf   # Logrotate configuration
│       └── logrotate-script.sh # Log rotation script
├── openshift/               # OpenShift deployment configurations
│   ├── kustomize/           # Kustomize-based deployment configurations
│   │   ├── base/            # Base configurations for all components
│   │   │   ├── api/         # API service base configuration
│   │   │   ├── app/         # Frontend application base configuration
│   │   │   ├── crunchy/     # Crunchy PostgreSQL database configuration
│   │   │   ├── elasticsearch/ # Elasticsearch service configuration
│   │   │   ├── kibana/      # Kibana dashboard configuration
│   │   │   ├── report-mailer/ # Report mailer service configuration
│   │   │   └── secrets-backup/ # Secrets backup configuration
│   │   ├── overlays/        # Environment-specific overlays
│   │   │   ├── api/         # API environment-specific configurations
│   │   │   ├── app/         # Frontend environment-specific configurations
│   │   │   ├── crunchy/     # Database environment-specific configurations
│   │   │   └── elasticsearch/ # Elasticsearch environment-specific configurations
│   │   ├── sidecar/         # Sidecar container configurations
│   │   └── images/          # Image configurations
│   └── templates/           # OpenShift templates
│       └── secrets/         # Secret templates
└── DEVELOPER.md             # Developer documentation for deployments
```

## Build Configurations

### Nginx Reverse Proxy (`builds/nginx_rp/`)

The Nginx reverse proxy is built on OpenResty with OpenIDC support for authentication. It serves as the authentication layer for accessing Kibana with IDIR.

Key features:

- OpenIDC integration for authentication
- Reverse proxy configuration for API and frontend services
- Environment-specific configurations

### Log Rotation (`builds/logrotate/`)

A dedicated container for log rotation to manage application logs.

Key features:

- Alpine-based lightweight container
- Configurable log rotation policies
- Automated log management

## OpenShift Deployment

### Kustomize Configuration (`openshift/kustomize/`)

The deployment uses Kustomize to manage environment-specific configurations. The structure follows the base/overlay pattern:

- **Base**: Contains the core configuration for each component
- **Overlays**: Contains environment-specific overrides (dev, test, prod, etc.)

### Components

1. **API Service**: Backend service handling business logic and data access
2. **Frontend Application**: User interface for the Job Store
3. **Database (Crunchy PostgreSQL)**: Persistent storage for application data
4. **Elasticsearch**: Used for Job Profiles search feature as well as storing of logs
5. **Kibana**: Data visualization dashboard for Elasticsearch logs
6. **Report Mailer**: Service for generating and sending reports
7. **Secrets Backup**: Configuration for backing up openshift secrets

## Getting Started

For detailed information on setting up and deploying the application, refer to the [DEVELOPER.md](./DEVELOPER.md) file

## Environment Variables

The application is configured using environment variables. For local development, use the `.env` files in the respective application directories:

- `apps/api/.env` - Backend service configuration
- `apps/app/.env` - Frontend application configuration

For production deployments, environment variables are managed through OpenShift secrets and config maps.

## Deployment Process

The deployment process varies by environment:

1. **Local Development**: Uses Docker Compose for local services
2. **Development/Test/Production**: Uses OpenShift with Kustomize for environment-specific configurations

Refer to the [DEVELOPER.md](./DEVELOPER.md) file for detailed deployment instructions for each environment.
