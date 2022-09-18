import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider, VideosProvider } from 'lib';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <VideosProvider videos={pageProps.videos}>
        {router?.route !== '/signup' && router?.route !== '/login' ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </VideosProvider>
    </AuthProvider>
  );
}

export default MyApp;
