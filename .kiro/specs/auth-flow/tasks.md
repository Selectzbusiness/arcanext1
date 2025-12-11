# Implementation Plan

- [x] 1. Enhance AuthContext with error handling and signing-in state





  - [x] 1.1 Add isSigningIn, authError, and clearError to AuthContext


    - Add `isSigningIn` boolean state to track OAuth flow progress
    - Add `authError` string state for error messages
    - Add `clearError` function to reset error state
    - Update `signinWithGitHub` to set isSigningIn and handle errors
    - Update `signout` to clear all user state (currentUser, arcanextUser)
    - _Requirements: 2.2, 2.4, 5.1, 5.3_

  - [x] 1.2 Write property test for sign-out state cleanup


    - **Property 5: Sign-Out State Cleanup**


    - **Validates: Requirements 5.1, 5.2, 5.3**

- [x] 2. Create useAuthRedirect hook for redirect logic

  - [x] 2.1 Implement useAuthRedirect hook

    - Create `web-frontend/hooks/useAuthRedirect.js`
    - Accept options: redirectAuthenticated, redirectUnauthenticated, preserveUrl
    - Use Next.js router for navigation
    - Read returnUrl from query parameters
    - Return isRedirecting and targetUrl states
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3_

  - [x] 2.2 Write property test for URL preservation during redirect


    - **Property 3: URL Preservation During Redirect**
    - **Validates: Requirements 4.2**

  - [x] 2.3 Write property test for post-auth redirect to original URL

    - **Property 4: Post-Authentication Redirect to Original URL**
    - **Validates: Requirements 4.3**

- [x] 3. Create AuthGuard component for protected routes

  - [x] 3.1 Implement AuthGuard HOC

    - Create `web-frontend/components/auth/AuthGuard.jsx`
    - Show loading screen while auth state is loading
    - Redirect to sign-in page if unauthenticated
    - Preserve original URL in returnUrl query parameter
    - Render children if authenticated
    - Use existing Loading component styling
    - _Requirements: 4.1, 4.2_

  - [x] 3.2 Write property test for protected route redirect

    - **Property 2: Protected Route Redirect for Unauthenticated Users**
    - **Validates: Requirements 4.1**

- [x] 4. Create Sign-In page with GitHub OAuth

  - [x] 4.1 Create Sign-In page component

    - Create `web-frontend/pages/signin.js`
    - Use UnifiedBackground component for consistent background
    - Create centered glass-panel auth card
    - Add Arcanext logo with Shield icon
    - Add welcome message and description
    - Add GitHub sign-in button with GitHub icon
    - Display loading state on button during OAuth
    - Display error message below button when auth fails
    - Add "Back to home" link
    - Apply fade-in and slide-up animations
    - Make responsive for mobile devices
    - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 4.2 Add redirect logic to Sign-In page

    - Use useAuthRedirect hook
    - Redirect authenticated users to dashboard (or returnUrl)
    - Show loading screen while checking auth state
    - _Requirements: 3.2, 4.3_


  - [x] 4.3 Write property test for authenticated user redirect from sign-in

    - **Property 1: Authenticated User Public Page Redirect**
    - **Validates: Requirements 3.1, 3.2**

- [x] 5. Update Header component to link to Sign-In page

  - [x] 5.1 Update Header sign-in button navigation

    - Change "Sign in" button href from `/dashboard` to `/signin`
    - Keep "Get Started" button behavior (can also go to signin)
    - _Requirements: 1.1_


- [x] 6. Update Landing page with auth redirect

  - [x] 6.1 Add authenticated user redirect to Landing page
    - Use useAuthRedirect hook in index.js
    - Redirect authenticated users to dashboard
    - Show loading screen while checking auth state
    - _Requirements: 3.1, 3.3_

- [x] 7. Update Dashboard with AuthGuard protection

  - [x] 7.1 Wrap Dashboard with AuthGuard
    - Import and use AuthGuard component
    - Remove manual redirect logic from useEffect
    - Update sign-out button to use signout from AuthContext
    - Ensure redirect to landing page after sign-out
    - _Requirements: 4.1, 5.2_

- [x] 8. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.



- [x] 9. Write unit tests for auth components

  - [x] 9.1 Write unit tests for Sign-In page

    - Test page renders with logo, welcome message, and GitHub button
    - Test loading state displays during sign-in
    - Test error message displays on auth failure
    - _Requirements: 1.2, 1.4, 2.2, 2.4_


  - [x] 9.2 Write unit tests for AuthGuard component
    - Test loading screen displays while auth loading
    - Test redirect occurs for unauthenticated users
    - Test children render for authenticated users

    - _Requirements: 4.1_

- [x] 10. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
