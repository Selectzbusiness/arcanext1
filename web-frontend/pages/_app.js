import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css'; // This imports your Tailwind CSS

function MyApp({ Component, pageProps }) {
  return (
    // This AuthProvider wraps your entire site,
    // giving all pages access to the user's login state.
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;