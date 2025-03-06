# Common Kit

A shared utility package for the PSA Job Store application that provides reusable components and utilities across frontend and backend services.

## Overview

The `common-kit` package serves as a repository for shared functionality used throughout the PSA Job Store application. It contains utilities for generating job profiles docx files, managing organization charts, and determining position request states.

## Installation

```bash
# From the root of the monorepo
npm -w common-kit run build
```

## Components

### Job Profile Generation

The `generate-job-profile` utility creates formatted job profile documents in DOCX format. This utility transforms job profile data into a structured document with proper formatting, including:

- BC Government branding
- Formatted headings and sections

```typescript
import { generateJobProfile } from 'common-kit';

// Generate a job profile document
const document = generateJobProfile({
  jobProfile: jobProfileData,
  positionRequest: positionRequestData, // optional
  supervisorProfile: supervisorProfileData, // optional
});
```

### Organization Chart Utilities

The `org-chart` module provides utilities for visualizing and manipulating organizational hierarchies.

```typescript
import { autolayout, updateSupervisorAndAddNewPositionNode, Elements, AutolayoutDirection } from 'common-kit';

// Automatically layout an organization chart
const layoutedElements = autolayout(elements);

// Update supervisor relationships and add a new position
const updatedElements = updateSupervisorAndAddNewPositionNode(
  edges,
  nodes,
  excludedManagerId,
  supervisorId,
  positionNumber,
  positionTitle,
  classification,
  department,
);
```

Key features:

- Automatic layout of organization charts using the dagre library
- Utilities for updating supervisor and excluded manager relationships

### Position Request State Management

The `pr-state` module provides utilities for determining the state of position requests based on various status indicators.

```typescript
import { getALStatus } from '@psa/common-kit';

// Determine the AL status based on context
const status = getALStatus({
  category: 'New Position',
  crm_status: 'Waiting - Client',
  ps_status: 'Proposed',
  ps_effective_status: '',
});
// Returns: 'ACTION_REQUIRED'
```

This utility maps external state indicators to internal application states based on a set of predefined rules, supporting the following states:

- DRAFT
- VERIFICATION
- ACTION_REQUIRED
- REVIEW
- COMPLETED
- CANCELLED
- UNKNOWN
