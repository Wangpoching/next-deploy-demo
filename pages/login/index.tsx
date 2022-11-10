import queryString from 'query-string'

const CLIENT_ID = '86mpic7af5qo71'
const CLIENT_SECRET = 'l1IKqVoXwd5FYGRg'
const REDIRECT_URI = 'next-deploy-demo-product.vercel.app/login'
const SCOPE = 'r_liteprofile%20r_emailaddress'

const LoginPage = () => {
  const _LinkedInSignIn = async () => {
    // 取得 authorization code
    const queryAUCode = {
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPE,
    }
    fetch(`https://www.linkedin.com/oauth/v2/authorization?${queryString.stringify(queryAUCode)}`)
  }
  return (
    <button onCkick={_LinkedInSignIn}>LinkedIn 登入</button>
  );
};


export default LoginPage;
