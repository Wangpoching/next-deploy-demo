import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="WNq3IRTEqjmhLO_unhaH8uAa8n_6UIki-8fuP9EBgw8" />
      </Head> 
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
