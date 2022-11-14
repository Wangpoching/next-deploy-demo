import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from '@react-oauth/google'

// Google
const CLIENT_ID_GOOGLE = '641252515386-7m3ibpas1ic11rbqj7hah6simts9duov.apps.googleusercontent.com'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="WNq3IRTEqjmhLO_unhaH8uAa8n_6UIki-8fuP9EBgw8" />
      </Head> 
      <GoogleOAuthProvider
        clientId={CLIENT_ID_GOOGLE}
      >
        <Component {...pageProps} />
      </GoogleOAuthProvider>      
    </>
  )
}

export default MyApp;
