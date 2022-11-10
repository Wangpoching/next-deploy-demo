import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'

const CLIENT_ID = '86mpic7af5qo71'
const CLIENT_SECRET = 'l1IKqVoXwd5FYGRg'
const REDIRECT_URI = 'https://next-deploy-demo-product.vercel.app/login'
const SCOPE = 'r_liteprofile r_emailaddress'

interface getAccessTokenInfo {
  grant_type: string;
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

const LoginPage = () => {
  const router = useRouter()
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  // 取得 authorization code
  const queryAUCode = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  }

  useEffect(() => {
    // Get FB Login Status
    FB.getLoginStatus((response) => {
      console.log('res', response); // 這裡可以得到 fb 回傳的結果
    }, true);
  }, [])

  useEffect(() => {
    if (router.query?.code) {
      setIsSubmitting(true)
      const queryAccessToken: getAccessTokenInfo = {
        grant_type: 'authorization_code',
        code: router.query.code as string,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }

      const formBody = [];
      for (let property in queryAccessToken) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(queryAccessToken[property as keyof getAccessTokenInfo]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        body: formBody.join('&'),
        headers: {
          'content-type': 'x-www-form-urlencoded'
        },
        method: 'POST',
      }).then(() => {
        setIsSubmitting(false)
      })
    }
  }, [router.query.code])

  return (
    <>
      <Script 
        id="fb-sdk"
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        id="fb-init"
        strategy="beforeInteractive"
      >
        {`FB.init({
          appId: '1104431630215983',
          cookie: true,
          xfbml: true,
          version: 'v15.0',
        });`}
      </Script>
      {isSubmitting && 
        <div style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#eee'
        }}/>}
      <Link href={`https://www.linkedin.com/oauth/v2/authorization?${queryString.stringify(queryAUCode)}`}>
        LinkedIn 登入
      </Link>
    </>
  )
};

export default LoginPage