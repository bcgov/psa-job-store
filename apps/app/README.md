# PSA Job Store Frontend Application

The PSA Job Store Frontend is a modern React application that provides the user interface for the BC Public Service Agency's Job Store system. It enables users to create, manage, and search job profiles, submit position requests from organizational charts.

## Architecture Overview

The frontend application is built using modern web technologies and follows a component-based architecture:

- **React**: Core UI library for building component-based interfaces
- **TypeScript**: Provides static typing for improved developer experience and code quality
- **Vite**: Fast, modern build tool and development server
- **Redux Toolkit**: State management with RTK Query for API integration
- **React Router**: Client-side routing with role-based access control
- **Ant Design**: UI component library providing a consistent design system
- **ReactFlow**: Interactive flow diagrams for organizational charts
- **Jest**: Testing framework for unit and integration tests

## Getting Started

### Prerequisites

- Node.js >=20.11.1 <21.0.0
- Access to the PSA Job Store API (running locally or in a development environment)

### Installation

Set up environment variables:

- Copy `sample.env` to `.env`
- Update the values as needed for your environment

### Development

Start the development server:

```bash
npm -w app run dev
```

This will start the Vite development server at http://localhost:3000 with hot module replacement enabled.

## Environment Configuration

The application uses environment variables for configuration. Key variables include:

| Variable             | Description                               | Default               |
| -------------------- | ----------------------------------------- | --------------------- |
| `VITE_BACKEND_URL`   | API endpoint URL                          | http://localhost:4000 |
| `VITE_SUPPORT_EMAIL` | Support email address                     | test@test.com         |
| `VITE_ENV`           | Environment name (local, dev, test, prod) | local                 |

## Application Structure

The application follows a modular structure organized by features:

```
src/
├── @types/            # TypeScript type definitions
├── assets/            # Static assets (images)
├── components/        # Shared UI components
│   ├── app/           # Application-level components
│   ├── guards/        # Contains role guard
│   ├── icons/         # Custom icon components
│   └── shared/        # Reusable UI components
├── redux/             # Redux state management
│   ├── services/      # RTK Query API services
│   └── redux.hooks.ts # Custom Redux hooks
├── router/            # Routing configuration
│   ├── next.router.tsx       # Main router configuration
│   └── next-route.guard.tsx  # Route guards for authentication
├── routes/            # Application routes/pages
│   ├── auth/          # Authentication pages
│   ├── home/          # Home/dashboard pages
│   ├── job-profiles/  # Job profile management
│   ├── org-chart/     # Organization chart visualization
│   ├── settings/      # User settings and administration
│   ├── wizard/        # Step-by-step wizard
│   └── ...
├── utils/             # Utility functions and helpers
├── global.css         # Global CSS styles
└── main.tsx           # Application entry point
```

## Key Features

### Authentication and Authorization

- Integration with BC Government's Keycloak authentication service
- Support for IDIR and BCeID identity providers
- Role-based access control for different user types (hiring managers, classification staff, etc.)
- Session management and secure routing

### Job Profile Management

- Create, edit, and publish standardized job profiles
- Version control for job profile changes
- Search and filter capabilities for finding relevant profiles
- Draft management for work-in-progress profiles

### Position Request Workflow

- Step-by-step wizard for creating position requests
- Integration with job profiles for standardized positions
- Status tracking throughout the approval process

### Organization Chart Visualization

- Interactive visualization of organizational structures
- Integration with position requests creation process

### User Interface

- BC Government design system compliance
- Accessible components following WCAG guidelines
