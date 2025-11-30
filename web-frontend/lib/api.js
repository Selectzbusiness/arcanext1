// API Client for Backend Integration

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

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
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Repository endpoints
  async getRepositories(token) {
    return this.request('/api/repositories', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getRepository(repoId, token) {
    return this.request(`/api/repositories/${repoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Scan job endpoints
  async getScanJobs(token) {
    return this.request('/api/jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getScanJob(jobId, token) {
    return this.request(`/api/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createScanJob(repoId, token) {
    return this.request('/api/jobs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ repository_id: repoId }),
    });
  }

  // Webhook endpoints
  async getWebhooks(token) {
    return this.request('/api/webhooks', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new APIClient();

// React hooks for API calls
export const useAPI = () => {
  return {
    getRepositories: (token) => apiClient.getRepositories(token),
    getScanJobs: (token) => apiClient.getScanJobs(token),
    createScanJob: (repoId, token) => apiClient.createScanJob(repoId, token),
  };
};
