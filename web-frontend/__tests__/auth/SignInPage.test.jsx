import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock Next.js router
const mockPush = vi.fn();
const mockQuery = {};
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: mockQuery,
    asPath: '/signin',
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock AuthContext
const mockSigninWithGitHub = vi.fn();
const mockClearError = vi.fn();
let mockAuthState = {
  currentUser: null,
  loading: false,
  isSigningIn: false,
  authError: null,
};

vi.mock('../../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    ...mockAuthState,
    signinWithGitHub: mockSigninWithGitHub,
    clearError: mockClearError,
  }),
}));

// Mock UnifiedBackground
vi.mock('../../components/layout/UnifiedBackground', () => ({
  default: () => <div data-testid="unified-background" />,
}));

// Mock Loading component
vi.mock('../../components/ui/Loading', () => ({
  default: ({ fullScreen }) => (
    <div data-testid="loading" data-fullscreen={fullScreen}>Loading...</div>
  ),
}));

// Import after mocks
import SignIn from '../../pages/signin.jsx';


describe('SignIn Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthState = {
      currentUser: null,
      loading: false,
      isSigningIn: false,
      authError: null,
    };
  });

  /**
   * Test: Page renders with logo, welcome message, and GitHub button
   * Requirements: 1.2, 1.4
   */
  it('renders sign-in page with logo, welcome message, and GitHub button', () => {
    render(<SignIn />);

    // Check for welcome message
    expect(screen.getByText('Welcome to Arcanext')).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText(/Sign in with your GitHub account/i)).toBeInTheDocument();
    
    // Check for GitHub sign-in button
    expect(screen.getByRole('button', { name: /Continue with GitHub/i })).toBeInTheDocument();
    
    // Check for back to home link
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  /**
   * Test: Loading state displays during sign-in
   * Requirements: 2.2
   */
  it('displays loading state on button during sign-in', () => {
    mockAuthState.isSigningIn = true;
    
    render(<SignIn />);

    // Button should show signing in state
    expect(screen.getByRole('button', { name: /Signing in/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  /**
   * Test: Error message displays on auth failure
   * Requirements: 2.4
   */
  it('displays error message when auth fails', () => {
    mockAuthState.authError = 'Sign-in was cancelled. Please try again.';
    
    render(<SignIn />);

    // Error message should be visible
    expect(screen.getByText('Sign-in was cancelled. Please try again.')).toBeInTheDocument();
  });

  /**
   * Test: GitHub sign-in button triggers OAuth flow
   */
  it('triggers GitHub OAuth when button is clicked', async () => {
    mockSigninWithGitHub.mockResolvedValue({ user: { uid: '123' } });
    
    render(<SignIn />);

    const signInButton = screen.getByRole('button', { name: /Continue with GitHub/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSigninWithGitHub).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test: Shows loading screen while checking auth state
   */
  it('shows loading screen while auth state is loading', () => {
    mockAuthState.loading = true;
    
    render(<SignIn />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
