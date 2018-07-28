import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

class Home extends React.Component {
  render() {
    return (
      <main>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <title>oneDeeds</title>
          <meta name="description" content="oneDeeds" />
        </Head>
        Hello oneDeeds!
      </main>
    );
  }
}

export default Home;
