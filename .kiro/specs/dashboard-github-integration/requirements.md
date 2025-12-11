# Requirements Document

## Introduction

This document specifies the GitHub App installation flow and production-ready dashboard for Arcanext. The feature enables users to install the Arcanext GitHub App, connect their repositories, view scan results, and manage their security scanning workflow. First-time users must install the GitHub App before they can use the service.

## Glossary

- **GitHub_App**: The Arcanext GitHub App that users install to grant repository access
- **Installation_Flow**: The process of redirecting users to GitHub to install the app and handling the callback
- **Dashboard**: The main authenticated user interface showing repositories, scans, and stats
- **Onboarding_State**: Whether a user has completed GitHub App installation
- **Workspace**: A user's container for repositories and scan jobs
- **Scan_Job**: A security scan triggered by a PR event

## Requirements

### Requirement 1

**User Story:** As a new user, I want to be guided to install the GitHub App after signing in, so that Arcanext can access my repositories.

#### Acceptance Criteria

1. WHEN a user signs in for the first time with no repositories THEN the Dashboard SHALL display an onboarding prompt to install the GitHub App
2. WHEN a user clicks the "Install GitHub App" button THEN the Dashboard SHALL redirect the user to the GitHub App installation page
3. WHEN GitHub redirects back after installation THEN the Dashboard SHALL process the installation and fetch the user's repositories
4. WHEN installation is complete THEN the Dashboard SHALL display the connected repositories

### Requirement 2

**User Story:** As a user, I want to see my connected repositories on the dashboard, so that I can monitor their security status.

#### Acceptance Criteria

1. WHEN the Dashboard loads THEN the Dashboard SHALL fetch and display all repositories from the backend API
2. WHEN repositories are displayed THEN the Dashboard SHALL show repository name, provider, and last scan status
3. WHEN a repository has no scans THEN the Dashboard SHALL display "No scans yet" status
4. WHEN the API request fails THEN the Dashboard SHALL display an error message with retry option

### Requirement 3

**User Story:** As a user, I want to see recent scan jobs on my dashboard, so that I can track security scanning activity.

#### Acceptance Criteria

1. WHEN the Dashboard loads THEN the Dashboard SHALL fetch and display recent scan jobs from the backend API
2. WHEN scan jobs are displayed THEN the Dashboard SHALL show PR number, status, commit SHA, and timestamp
3. WHEN a scan job status is "queued" THEN the Dashboard SHALL display a pending indicator
4. WHEN a scan job status is "completed" THEN the Dashboard SHALL display a success indicator
5. WHEN a scan job status is "failed" THEN the Dashboard SHALL display a failure indicator

### Requirement 4

**User Story:** As a user, I want to see summary statistics on my dashboard, so that I can quickly understand my security posture.

#### Acceptance Criteria

1. WHEN the Dashboard loads THEN the Dashboard SHALL display total repository count
2. WHEN the Dashboard loads THEN the Dashboard SHALL display total scan count
3. WHEN the Dashboard loads THEN the Dashboard SHALL display vulnerability count (placeholder for now)
4. WHEN data is loading THEN the Dashboard SHALL display skeleton loading states

### Requirement 5

**User Story:** As a user, I want a professional dashboard layout, so that I have a good user experience.

#### Acceptance Criteria

1. WHEN the Dashboard renders THEN the Dashboard SHALL display a header with logo, user info, and sign-out button
2. WHEN the Dashboard renders THEN the Dashboard SHALL use the dark theme consistent with the landing page
3. WHEN the Dashboard renders THEN the Dashboard SHALL be responsive for mobile and desktop
4. WHEN the user clicks sign out THEN the Dashboard SHALL sign out and redirect to landing page

### Requirement 6

**User Story:** As a developer, I want the frontend to properly integrate with the backend API, so that data flows correctly.

#### Acceptance Criteria

1. WHEN making API requests THEN the Frontend SHALL include the Firebase auth token in the Authorization header
2. WHEN the API returns 401 THEN the Frontend SHALL redirect to sign-in page
3. WHEN the API returns an error THEN the Frontend SHALL display a user-friendly error message
4. WHEN the API is slow THEN the Frontend SHALL display loading states

