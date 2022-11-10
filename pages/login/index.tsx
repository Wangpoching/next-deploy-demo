import queryString from 'query-string'
import Link from 'next/link'

const CLIENT_ID = '86mpic7af5qo71'
const CLIENT_SECRET = 'l1IKqVoXwd5FYGRg'
const REDIRECT_URI = 'https://next-deploy-demo-product.vercel.app/login'
const SCOPE = 'r_liteprofile&r_emailaddress'

const LoginPage = () => {
  // 取得 authorization code
  const queryAUCode = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  }
  console.log(queryString.stringify(queryAUCode))
  return (
    <Link href={`https://www.linkedin.com/oauth/v2/authorization?${queryString.stringify(queryAUCode)}`}>
      LinkedIn 登入
    </Link>
  )
};

export default LoginPage