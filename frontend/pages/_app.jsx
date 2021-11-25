import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Frame from '../components/Frame';
import { withData } from '../lib';

import '../components/styles/normalize.css';
import '../components/styles/antd.css';
import '../components/styles/App.scss';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </ApolloProvider>
  );
}

// Tell Next JS to fetch queries, mutations from child componenets
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return pageProps;
};

// Higher order componenet to use Apollo + Next JS (SSR)
export default withData(MyApp);
