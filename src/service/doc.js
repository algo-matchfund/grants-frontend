import PropTypes from 'prop-types';

/**
 * @typedef {object} Pagination Common pagination options
 * @property {number} offset    Offset
 * @property {number} limit     Number of items per page
 */
const Pagination = {
  offset: 0,
  limit: 0,
};

/**
 * @typedef {object} ProfileBody              Body of updating user profile
 * @property {string} firstName               User first name
 * @property {string} lastName                User last name
 * @property {object} attributes              Other user attributes
 */
 const profileBody = {
  firstName: '',
  lastName: '',
  attributes: {},
 }

/**
 * @typedef {object} Project                  Project information
 * @property {string} icon                    Project icon
 * @property {string} description             Project description
 * @property {string} algorandWallet          Project's Algorand wallet for accepting donations
 * @property {string} name                    Project name
 * @property {string} id                      Project id
 * @property {string} content                 Project content for project details page, in markdown
 * @property {number} match                   Project match
 * @property {Array} campaigns                Project campaigns
 * @property {Array} contributions            Individual contributions to the project
 * @property {number} donors                  Donors count
 * @property {number} fundAmount              Total amount funded to project
 * @property {number} appId                  Smart contract app ID
 */
 const Project = {
  icon: '',
  description: '',
  algorand_wallet: '',
  name: '',
  id: '',
  content: '',
  match: 0,
  campaigns: null,
  contributions: [],
  donors: 0,
  fundAmount: 0,
  appId: 0,
};

const ProjectShape = {
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  algorand_wallet: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  match: PropTypes.number.isRequired,
  campaigns: PropTypes.array,
  contributions: PropTypes.array,
  donors: PropTypes.number.isRequired,
  fundAmount: PropTypes.number.isRequired,
  appId: PropTypes.number.isRequired,
};

/**
 * @typedef {object} ProjectBody              Body for creating a new project
 * @property {string} name                    Project name
 * @property {string} homepage                Project homepage url
 * @property {string} github                  Project GitHub url
 * @property {string} shortDescription        Project description
 * @property {string} country                 Project country origin
 * @property {string} icon                    Project icon
 * @property {string} content                 Project content for project details page, in markdown
 * @property {string} screenshot              Project screenshot
 */
 const ProjectBody = {
  icon: '',
  description: '',
  name: '',
  id: '',
  content: '',
  match: '',
  campaigns: '',
  contributions: '',
  donors: '',
  fundAmount: '',
};

/**
 * @typedef {object} PendingProject           Pending project information
 * @property {string} moderationId            Moderation id
 * @property {string} date                    Date and time of the change/project creation
 * @property {Project} before                 Project definition before the change. Can be empty if it's a new project
 * @property {Project} after                  Project definition after changes
 */
 const PendingProject = {
  moderationId: '',
  date: '',
  before: {},
  after: {},
};

const PendingProjectShape = {
  moderationId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  before: PropTypes.shape(Project),
  after: PropTypes.shape(Project).isRequired,
};

/**
 * @typedef {object} PendingProjectFilter Pending project filter
 * @property {string} name                Pending project name
 * @property {number} offset              Offset
 * @property {number} limit               Number of items per page
 */
 const PendingProjectFilter = {
  name: '',
  ...Pagination,
};

const PendingProjectFilterShape = {
  name: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

/**
 * @typedef {object} PendingProjectModeration Represents a new project or project information change moderation result
 * @property {string} moderationId            Moderation id
 * @property {string} projectId               Project id. Can be empty if moderating a new project
 * @property {Status} status                  Moderation decision: [approve, deny]
 * @property {string} comment                 Approval or denial reasoning
 */
const PendingProjectModeration = {
  moderationId: '',
  projectId: '',
  status: '',
  comment: '',
};

const PendingProjectModerationShape = {
  moderationId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  status: PropTypes.shape(Status).isRequired,
  comment: PropTypes.string.isRequired,
};

/**
 * @typedef Status
 * @property {string} APPROVE 'approve'
 * @property {string} DENY 'deny'
 *
 * @enum {Status}
 */
const Status = {
  APPROVE: 'approve',
  DENY: 'deny',
};

/**
 * @typedef {object} Stats Stats for current matching round
 * @property {number} donationAmount    Total donation amount
 * @property {number} donationCount     Number of donations
 * @property {number} matchAmount       Match amount
 * @property {number} projectCount      Number of projects
 * @property {number} contributorCount  Number of contributors
 */
const Stats = {
  donationAmount: 0,
  donationCount: 0,
  matchAmount: 0,
  projectCount: 0,
  contributorCount: 0,
  matchStartDate: '',
  matchEndDate: '',
};

const StatsShape = {
  donationAmount: PropTypes.number.isRequired,
  donationCount: PropTypes.number.isRequired,
  matchAmount: PropTypes.number.isRequired,
  projectCount: PropTypes.number.isRequired,
  contributorCount: PropTypes.number.isRequired,
  matchStartDate: PropTypes.string.isRequired,
  matchEndDate: PropTypes.string.isRequired,
};

/**
 * @typedef {object} User   user
 * @property {string} id          User ID
 * @property {string} first_name  User's first name
 * @property {string} last_name   User's last name
 * @property {string} email       User's email
 * @property {Array<string>} roles List of user's Keycloak roles
 */
const User = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  roles: [],
};

const UserShape = {
  id: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

/**
 * @typedef {object} Transactions Unsigned transactions for calling smart contract app
 * @property {string} optin          For calling "optin"
 * @property {string} set_donation   For calling "set_donation"
 */
 const Transactions = {
  optin: '',
  set_donation: '',
};

 const TransactionsShape = {
  optin: PropTypes.string.isRequired,
  set_donation: PropTypes.string.isRequired,
};

export {
  Pagination,

  profileBody,

  Project,
  ProjectShape,

  PendingProject,
  PendingProjectShape,

  PendingProjectFilter,
  PendingProjectFilterShape,

  PendingProjectModeration,
  PendingProjectModerationShape,
  Status,

  Stats,
  StatsShape,

  User,
  UserShape,

  Transactions,
  TransactionsShape,
};
