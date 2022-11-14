import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import Link from 'next/link'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import Script from 'next/script'

// LinkedIn
const CLIENT_ID = '86mpic7af5qo71'
const CLIENT_SECRET = 'l1IKqVoXwd5FYGRg'
const REDIRECT_URI = 'https://bocyun.tw/login'
const SCOPE = 'r_emailaddress r_liteprofile'

interface getAccessTokenInfo {
  grant_type: string;
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

const LoginPage = () => {
  const router = useRouter()

  // 這是 LinkedIn 要取得 authorization token 要帶的 queryString
  const queryAUCode = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  }

  // false 代表有串好有快取就不重發 api 檢查登入狀態
  const _fbLogin = () => {
    // Get FB Login Status
    FB.getLoginStatus((response) => {
      // 如果沒登入就要 CALL 登入
      if (response.status !== 'connected') {
        return FB.login(function (response) {
           // 登入好了送 ACCESS_TOKEN 到後台
          console.log(JSON.stringify(response))
        }, {
          scope: 'email',
          return_scopes: true
        })
      } else {
         // 如果登入了就要送 ACCESS_TOKEN 到後台
         console.log(JSON.stringify(response))
      }
    }, true);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
  });

  useEffect(() => {
    // 一開始就把 FB 初始化
    FB.init({
      appId: '1104431630215983',
      cookie: true,
      xfbml: true,
      status: false, // 快取登入狀態
      version: 'v3.2',
    })
  }, [])

  {/* LinkedIn 登入: 當網址有帶 code 的時候代表 linkedin 回傳 authorization code，
    此時要將 authorization code 用 POST 拿到 access_token，
    可是會被 CORS 擋住，可能要用 FORM 寫(?
  */}
  useEffect(() => {
    if (router.query?.code) {
      console.log(router.query.code)
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
        // 把 ACCESS_TOKEN 打給後台
      })
    }
  }, [router.query.code])

  return (
    <>
      {/* 引入 FB 模組 => 要等模組載完才能做其他事 */}
      <Script 
        id="fb-sdk"
        src="https://connect.facebook.net/en_US/all.js"
        strategy="beforeInteractive"
      ></Script>
      {/* LinkedIn 登入點擊導轉到登入畫面 */}
      <Link href={`https://www.linkedin.com/oauth/v2/authorization?${queryString.stringify(queryAUCode)}`}>
        LinkedIn 登入
      </Link>
      {/* FB 登入點擊導轉到登入畫面 */}
      <button onClick={_fbLogin}>FB 登入</button>
      {/* Google 登入點擊導轉到登入畫面 */}
      <button onClick={() => googleLogin()}>
        Sign in with Google 🚀{' '}
      </button>
    </>
  )
};

export default LoginPage