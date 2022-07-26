import { useApi, useAsyncEffect } from '/hooks';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory();
  const { keycloak } = useKeycloak();
  const api = useApi();

  useAsyncEffect(async () => {
    // call "createUser" for newly created-users
    console.log(keycloak);
    if (keycloak?.token) {
      await api.createUser(keycloak.tokenParsed.sub, keycloak.token);
      history.push('/');
      return;
    }

    // to Keycloak registration form for non-users
    keycloak?.register({
      redirectUri: `${process.env.DEPLOYMENT_URL}${location.pathname}`,
    });
  }, [keycloak, api, history]);

  return <></>;
}

export default Register;
