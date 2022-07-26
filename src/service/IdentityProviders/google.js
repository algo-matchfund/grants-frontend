import { randomBytes } from 'crypto'

const create_csrf = () => randomBytes(32).toString('hex')

const authenticate = async () => {
  const sessionToken = create_csrf()
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  // 343719731447-1vjhe8rovfqnm0o3de3n33bk0gg028s4.apps.googleusercontent.com
  // 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
  const params = new URLSearchParams({
    client_id: '343719731447-1vjhe8rovfqnm0o3de3n33bk0gg028s4.apps.googleusercontent.com',
    response_type: 'code',
    scope: 'openid email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    state: sessionToken,
    redirect_uri: 'http://grants-frontend.com:9000/settings'
  });

  window.location.replace(`${baseUrl}?${params}`)
}

export default authenticate
