import React from 'react';
import Document, {
  Head, Html, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // Let Next render styled components on the server
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />),
    );
    const styleElement = sheet.getStyleElement();
    return { ...page, styleElement };
  }

  render() {
    return (
      <Html lang="en-CA">
        <Head>
          <></>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
