# Implementation Plan

- [x] 1. Create API client with proper authentication



  - [x] 1.1 Update API client with auth token handling

    - Update `web-frontend/lib/api.js` with proper endpoint paths
    - Add error handling for 401 responses
    - Add loading state management
    - _Requirements: 6.1, 6.2, 6.3_





- [ ] 2. Create Dashboard components
  - [ ] 2.1 Create DashboardHeader component
    - Create `web-frontend/components/dashboard/DashboardHeader.jsx`
    - Display Arcanext logo with link to home

    - Display user email from auth context
    - Add sign-out button with proper styling
    - _Requirements: 5.1, 5.5_

  - [ ] 2.2 Create StatsGrid component
    - Create `web-frontend/components/dashboard/StatsGrid.jsx`

    - Display repository count, scan count, vulnerability count
    - Add skeleton loading states
    - Use glass-panel styling consistent with design system
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 2.3 Create OnboardingBanner component

    - Create `web-frontend/components/dashboard/OnboardingBanner.jsx`
    - Display welcome message for new users
    - Add "Install GitHub App" button
    - Link to GitHub App installation URL
    - _Requirements: 1.1, 1.2_


  - [ ] 2.4 Create RepositoryList component
    - Create `web-frontend/components/dashboard/RepositoryList.jsx`
    - Display list of connected repositories
    - Show repo name, provider icon, last scan status
    - Handle empty state

    - _Requirements: 2.1, 2.2, 2.3_


  - [ ] 2.5 Create RecentScans component
    - Create `web-frontend/components/dashboard/RecentScans.jsx`
    - Display recent scan jobs in a table/list
    - Show PR number, status badge, commit SHA, timestamp
    - Handle empty state
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_


- [ ] 3. Implement Dashboard page
  - [ ] 3.1 Rewrite Dashboard page with new components
    - Update `web-frontend/pages/dashboard.js`

    - Integrate all dashboard components

    - Fetch data from API on mount
    - Handle loading and error states
    - Show onboarding if no repositories

    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 5.2, 5.3_


  - [ ] 3.2 Add GitHub App installation callback handling
    - Handle `?installation_id` query parameter

    - Show success message after installation
    - Refresh repository list

    - _Requirements: 1.3, 1.4_


- [ ] 4. Add backend endpoint for GitHub install URL
  - [x] 4.1 Create GitHub install URL endpoint

    - Add endpoint to `api-backend/repository_routes.py`
    - Return GitHub App installation URL with state parameter


    - _Requirements: 1.2_

- [ ] 5. Update environment configuration
  - [ ] 5.1 Add GitHub App configuration
    - Add `NEXT_PUBLIC_GITHUB_APP_NAME` to .env.example
    - Update API URL configuration
    - _Requirements: 1.2_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Write property tests
  - [ ] 7.1 Write property test for onboarding display logic
    - **Property 1: Onboarding Display Logic**
    - **Validates: Requirements 1.1**

  - [ ] 7.2 Write property test for repository data consistency
    - **Property 2: Repository Data Consistency**
    - **Validates: Requirements 2.1, 2.2**

- [ ] 8. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
