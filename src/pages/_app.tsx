import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import { appWithTranslation } from 'next-i18next';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useState } from 'react';
import { NextSeo } from 'next-seo';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <NextSeo
              title="Derna Call"
              description={
                'A project to help those damaged by the floods in the great city of Derna.'
              }
            />
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default appWithTranslation(App);
