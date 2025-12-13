/**
 * API Client for Arcanext Backend Integration
 * 
 * Handles all communication with the FastAPI backend including:
 * - Authentication token management
 * - Repository operations
 * - Scan job operations
 * - Error handling
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');
const GITHUB_APP_NAME = process.env.NEXT_PUBLIC_GITHUB_APP_NAME || 'arcanext';

class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }

  get isAuthError() {
    return this.status === 401;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500;
  }
}

class APIClient {
  constructor() {
    this.baseURL = API_URL;
    this.timeout = API_TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 401) {
          throw new APIError('Session expired. Please sign in again.', 401, errorData);
        }
        if (response.status === 404) {
          throw new APIError(errorData?.detail || 'Resource not found.', 404, errorData);
        }
        if (response.status >= 500) {
          throw new APIError('Server error. Please try again later.', response.status, errorData);
        }
        
        throw new APIError(
          errorData?.detail || `API Error: ${response.status}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof APIError) {
        throw error;
      }
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout. Please try again.', 0);
      }
      
      throw new APIError('Network error. Please check your connection.', 0);
    }
  }

  // Auth endpoints
  async getCurrentUser(token) {
    return this.request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Repository endpoints
  async getRepositories(token) {
    return this.request('/api/v1/repositories', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getGitHubInstallUrl(token) {
    return this.request('/api/v1/repositories/github-install-url', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Fetch user's GitHub repositories using their OAuth token
  async getGitHubUserRepos(firebaseToken, githubToken) {
    return this.request('/api/v1/repositories/github/user-repos', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({ github_token: githubToken }),
    });
  }

  // Connect a GitHub repository for scanning
  async connectGitHubRepo(firebaseToken, repoFullName, githubToken) {
    return this.request('/api/v1/repositories/github/connect', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({ 
        repo_name: repoFullName,
        github_token: githubToken,
      }),
    });
  }

  // Scan job endpoints
  async getScanJobs(token) {
    return this.request('/api/v1/jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getStats(token) {
    return this.request('/api/v1/jobs/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // GitHub App installation URL (client-side fallback)
  getGitHubInstallUrlSync() {
    return `https://github.com/apps/${GITHUB_APP_NAME}/installations/new`;
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new APIClient();
export { APIError };

/**
 * React hook for API operations with auth token
 */
export function useAPI() {
  return {
    getCurrentUser: (token) => apiClient.getCurrentUser(token),
    getRepositories: (token) => apiClient.getRepositories(token),
    getScanJobs: (token) => apiClient.getScanJobs(token),
    getStats: (token) => apiClient.getStats(token),
    getGitHubInstallUrl: (token) => apiClient.getGitHubInstallUrl(token),
    getGitHubInstallUrlSync: () => apiClient.getGitHubInstallUrlSync(),
  };
}
