/**
 * Updates session token if there's less than half of the session time left until expiration
 * @param {any} keycloak Keycloak instance
 */
const updateToken = async (keycloak) => {
  const update = await keycloak.updateToken((keycloak.tokenParsed.exp - keycloak.tokenParsed.iat) / 2 - 1);
  console.log('[KEYCLOAK]', 'token update result', update);
};

export default updateToken;
