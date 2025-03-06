# GitHub Actions for PSA Job Store

This directory contains the CI/CD workflows and custom actions used for automating the build, test, deployment, and maintenance processes of the PSA Job Store application.

## Overview

The PSA Job Store project uses GitHub Actions for continuous integration and continuous deployment (CI/CD). These workflows automate various aspects of the development lifecycle, including:

- Building Docker images
- Running unit tests
- Performing database migrations
- Deploying to OpenShift environments
- Running end-to-end tests
- Managing database backups and restores
- Security scanning with StackRox (Deprecated)

## Workflow Structure

The workflows are organized in the `.github/workflows` directory, while custom actions are in the `.github/actions` directory.

### Main Workflows

#### 1. Build Docker Images (`build-apps.yml`)

Triggered on:

- Push to main, stage, or develop branches
- Manual trigger

Key features:

- Detects which applications have changed (api, app)
- Builds Docker images for changed applications
- Pushes images to Artifactory
- Triggers the database migration workflow

#### 2. Database Migration (`migrate-db.yml`)

Triggered on:

- Completion of the build workflow
- Manual trigger

Key features:

- Detects if there are new database migrations
- Applies Prisma migrations to the database
- Updates version information
- Triggers deployments for changed applications
- Triggers E2E tests after successful deployment (on stage branch)

#### 3. End-to-End Tests (`e2e.yml`)

Triggered on:

- Completion of the database migration workflow
- Manual trigger

Key features:

- Waits for deployment to complete
- Sets up in-memory database for testing
- Configures the environment for E2E testing by setting appropriate flags
- Runs Cypress tests in headless mode
- Uploads screenshots and videos if tests fail
- Cleans up the E2E environment after testing

#### 4. Unit Tests (`unit-tests.yml`)

Triggered on:

- Push to stage branch
- Manual trigger

Key features:

- Builds common-kit library
- Runs Jest tests for React (app), NestJS (api), and common-kit

#### 5. Database Backup (`db-backup-manual.yml`)

Triggered on:

- Manual trigger

Key features:

- Creates a backup of the PostgreSQL database
- Allows specifying the cluster name, environment, and backup annotation

#### 6. Database Restore (`db-restore.yml`)

Triggered on:

- Manual trigger

Key features:

- Restores a PostgreSQL database from a backup
- Allows specifying the cluster name, environment, and either a restore timestamp or backup ID

#### 7. Security Scanning (`run-acs.yml`) (DEPRECATED)

Triggered on:

- Manual trigger

Key features:

- Runs StackRox security checks on Docker images
- Scans deployment configurations for security issues

#### 8. Release Management (`release.yml`) (DEPRECATED)

Triggered on:

- Manual trigger

Key features:

- Creates a release pull request using Changesets

## Custom Actions

### 1. Trigger Deploy (`.github/actions/trigger-deploy`)

Purpose: Triggers a deployment in OpenShift.

Inputs:

- OpenShift server
- API token
- Project to redeploy
- Deployment environment

### 2. Migrate DB (`.github/actions/migrate-db`)

Purpose: Executes database migrations.

Inputs:

- Deployment environment
- OpenShift server
- API token
- Database URL

### 3. StackRox Scan (`.github/actions/stackrox-scan`) (DEPRECATED)

Purpose: Scans Docker images for security vulnerabilities.

Inputs:

- Central endpoint
- API token
- Image to scan
- Output format

### 4. StackRox Check (`.github/actions/stackrox-check`) (DEPRECATED)

Purpose: Checks Docker images against security policies.

Inputs:

- Central endpoint
- API token
- Image to check

### 5. StackRox DC Check (`.github/actions/stackrox-dc-check`) (DEPRECATED)

Purpose: Checks deployment configurations against security policies.

Inputs:

- Path to deployment configuration
- Central endpoint
- API token

## Environment Configuration

The workflows use environment-specific configurations:

- `dev` for the develop branch
- `test` for the stage branch
- `prod` for the main branch

Each environment has its own set of secrets configured in GitHub.

## Required Secrets

The following secrets are required for the workflows to function properly:

- `OPENSHIFT_SERVER`: The OpenShift server URL
- `OPENSHIFT_API_TOKEN`: API token for OpenShift authentication
- `ARTIFACTORY_URL`: URL of the Artifactory repository
- `ARTIFACTORY_SA_USERNAME`: Artifactory service account username
- `ARTIFACTORY_SA_PASSWORD`: Artifactory service account password
- `ROX_CENTRAL_ENDPOINT`: StackRox Central endpoint (DEPRECATED)
- `ROX_API_TOKEN`: StackRox API token (DEPRECATED)
- Various application-specific environment variables (VITE\_\*, SESSION_SECRET, etc.)

## Workflow Dependencies

The workflows are designed to work together in a pipeline:

1. Code changes are pushed to a branch
2. `build-apps.yml` builds Docker images for changed applications
3. `migrate-db.yml` applies database migrations and triggers deployments
4. `e2e.yml` runs end-to-end tests after deployment (on stage branch)

## Manual Workflows

Some workflows are designed to be triggered manually:

- `db-backup-manual.yml` for creating database backups
- `db-restore.yml` for restoring from backups
- `run-acs.yml` for security scanning (DEPRECATED)
- `release.yml` for creating release pull requests (DEPRECATED)
