# Design Document: Dashboard & GitHub Integration

## Overview

This design implements a production-ready dashboard with GitHub App installation flow for Arcanext. The system guides new users through GitHub App installation, displays connected repositories and scan jobs, and provides a professional dashboard experience with proper backend integration.

## Architecture

```mermaid
flowchart TD
    subgraph Frontend
        DP[Dashboard Page]
        OB[Onboarding Component]
        RL[Repo List Component]
        SL[Scan List Component]
        ST[Stats Component]
    end
    
    subgraph Backend API
        AUTH[/api/v1/auth/me]
        REPOS[/api/v1/repositories]
        JOBS[/api/v1/jobs]
        INSTALL[/api/v1/github/install-url]
    end
    
    subgraph External
        GH[GitHub App]
        FB[Firebase Auth]
    end
    
    DP --> AUTH
    DP --> REPOS
    DP --> JOBS
    OB --> INSTALL
    OB --> GH
    GH --> |callback| DP
    FB --> |token| AUTH
```

## Components and Interfaces

### 1. Dashboard Page Structure

```
DashboardPage
├── DashboardHeader
│   ├── Logo
│   ├── UserInfo (email, avatar)
│   └── SignOutButton
├── DashboardContent
│   ├── OnboardingBanner (if no repos)
│   ├── StatsGrid
│   │   ├── RepoCount
│   │   ├── ScanCount
│   │   └── VulnerabilityCount
│   ├── RepositoryList
│   │   └── RepositoryCard[]
│   └── RecentScans
│       └── ScanJobRow[]
└── DashboardFooter
```

### 2. API Client Enhancement

```typescript
interface APIClient {
  // Auth
  getCurrentUser(token: string): Promise<User>;
  
  // Repositories
  getRepositories(token: string): Promise<Repository[]>;
  
  // Scan Jobs
  getScanJobs(token: string): Promise<ScanJob[]>;
  
  // GitHub Integration
  getGitHubInstallUrl(token: string): Promise<{ url: string }>;
}
```

### 3. Data Models

```typescript
interface User {
  id: string;
  email: string;
  firebase_uid: string;
}

interface Repository {
  id: string;
  repo_name: string;
  provider: string;
  external_id: string;
}

interface ScanJob {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  commit_sha: string;
  pr_number: number;
  created_at: string;
  repository_id: string;
}

interface DashboardStats {
  repoCount: number;
  scanCount: number;
  vulnerabilityCount: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Onboarding Display Logic

*For any* user with zero repositories, the dashboard SHALL display the onboarding banner prompting GitHub App installation.

**Validates: Requirements 1.1**

### Property 2: Repository Data Consistency

*For any* API response containing repositories, the dashboard SHALL display exactly the same number of repository cards as returned by the API.

**Validates: Requirements 2.1, 2.2**

### Property 3: Scan Status Display

*For any* scan job with a given status, the dashboard SHALL display the corresponding status indicator (pending/success/failure).

**Validates: Requirements 3.3, 3.4, 3.5**

### Property 4: Auth Token Inclusion

*For any* API request made by the frontend, the request SHALL include a valid Firebase auth token in the Authorization header.

**Validates: Requirements 6.1**

## Error Handling

| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| 401 Unauthorized | Session expired | Redirect to sign-in |
| 404 No Workspace | Account setup incomplete | Show setup prompt |
| 500 Server Error | Something went wrong | Show retry button |
| Network Error | Connection failed | Show retry button |

## Testing Strategy

### Property-Based Testing

**Library**: fast-check

**Configuration**: 100 iterations per property test

### Unit Tests

- Dashboard renders correctly with various data states
- Onboarding banner shows/hides based on repo count
- API client includes auth token in requests
- Error states display correctly

