import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider, VideosProvider } from 'lib';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <VideosProvider videos={pageProps.videos}>
        <Component {...pageProps} />
      </VideosProvider>
    </AuthProvider>
  );
}

export default MyApp;
