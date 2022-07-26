import { User } from '/service/doc';

const isModerator = (keycloak) => keycloak?.tokenParsed?.realm_access?.roles?.includes('moderator');

/**
 * Get display name of a user
 * @param {User} user User data object
 * @returns {string}
 */
const getUserName = (user) => (user.first_name && user.last_name
  ? `${user.first_name} ${user.last_name} (${user.email})`
  : user.email);

export {
  isModerator,
  getUserName,
};
