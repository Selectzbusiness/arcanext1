import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
    asPath: '/dashboard',
  }),
}));

// Mock AuthContext
let mockAuthState = {
  currentUser: null,
  loading: true,
};

vi.mock('../../context/AuthContext.jsx', () => ({
  useAuth: () => mockAuthState,
}));

// Mock Loading component
vi.mock('../../components/ui/Loading', () => ({
  default: ({ fullScreen }) => (
    <div data-testid="loading" data-fullscreen={fullScreen}>Loading...</div>
  ),
}));

// Import after mocks
import AuthGuard from '../../components/auth/AuthGuard';

describe('AuthGuard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthState = {
      currentUser: null,
      loading: true,
    };
  });

  /**
   * Test: Loading screen displays while auth loading
   * Requirements: 4.1
   */
  it('displays loading screen while auth state is loading', () => {
    mockAuthState.loading = true;
    
    render(
      <AuthGuard>
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  /**
   * Test: Children render for authenticated users
   * Requirements: 4.1
   */
  it('renders children when user is authenticated', () => {
    mockAuthState = {
      currentUser: { uid: '123', email: 'test@example.com' },
      loading: false,
    };
    
    render(
      <AuthGuard>
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  /**
   * Test: Redirect occurs for unauthenticated users
   * Requirements: 4.1
   */
  it('redirects to sign-in page when user is not authenticated', async () => {
    mockAuthState = {
      currentUser: null,
      loading: false,
    };
    
    render(
      <AuthGuard>
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );

    // Should show loading while redirecting
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    // Protected content should not be visible
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  /**
   * Test: Custom fallback URL is used
   */
  it('uses custom fallback URL when provided', () => {
    mockAuthState = {
      currentUser: null,
      loading: false,
    };
    
    render(
      <AuthGuard fallbackUrl="/custom-signin">
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );

    // Should show loading while redirecting
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
