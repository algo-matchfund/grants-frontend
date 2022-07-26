import axios from 'axios';
/* eslint-disable no-unused-vars */
import {
  Project, ProjectBody, PendingProject, PendingProjectFilter,
  PendingProjectModeration, User, Transactions, ProfileBody,
} from './doc';
/* eslint-enable no-unused-vars */

const withAuthorization = (token) => ({
  Authorization: `Bearer ${token}`,
});

const withParams = (...rest) => new URLSearchParams(
  Object.entries(rest.reduce((result, obj) => ({ ...result, ...obj }), {})).filter(([, v]) => (v instanceof Array ? v.length !== 0 : v)),
);

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.BACKEND_URL,
    });
  }

    /**
   * Get user profile
   * @param {string} token Authorization token
   * @returns {ProfileBody} User profile
   */
  getUserProfile = (token) => axios.get(`${process.env.KEYCLOAK_URL}/realms/grants/account/`, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Update user profile
   * @param {ProfileBody} profileBody Filtering options
   * @param {string} token Authorization token
   */
  updateUserProfile = (profileBody, token) => axios.post(`${process.env.KEYCLOAK_URL}/realms/grants/account/`,
    profileBody, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Create user account
   * @param {string} userId user ID
   * @param {string} token Authorization token
   */
  createUser = (userId, token) => this.client.post(`/users`, userId, {
    headers: {
      ...withAuthorization(token),
      'Content-Type': 'application/json',
    },
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Get a list of projects
   * @param {string} token Authorization token
   * @param {GetProjectsFilter} filter Filtering options
   * @returns {Array<Project>} List of projects
   */
  getProjects = (filter) => this.client.get('/projects', {
    params: withParams(filter),
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Get a list of projects
   * @param {GetProjectsFilter} filter Filtering options
   * @returns {Array<Project>} List of projects
   */
  getProject = (id) => this.client.get(`/projects/${id}`)
  .then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Create a new project
   * @param {ProjectBody} projectBody New project data
   * @param {string} token Authorization token
   * @returns {string} New project id
   */
  postProject = (projectBody, token) => this.client.post('projects', projectBody, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Fund project
   * @param {string} token Authorization token
   * @param {number} amount Fund amount
   * @returns {string}
   */
  fundProject = (id, amount, token) => this.client.post(`/project/${id}/fund`, amount, {
    headers: {
      ...withAuthorization(token),
      'Content-Type': 'application/json',
    },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  submitFundTx = (id, txid, type, token) => this.client.post(`/project/${id}/fund/tx`, JSON.stringify(txid), {
    headers: {
      ...withAuthorization(token),
      'Content-Type': 'application/json',
    },
    params: withParams({ type }),
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get newly calculated match based on user's fund amount
   * @param {string} projectId ID of target project
   * @param {number} amount Fund amount
   * @returns {number} New match amount
   */
  getMatchCalculation = (id, amount) => this.client.get(`/projects/${id}/calculate?amount=${amount}`)
  .then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get a pending new project or project information change by moderation ID
   * @param {string} token Authorization token
   * @param {string} moderationId Moderation ID 
   * @returns {PendingProject} Object with pending project information
   */
  getProjectModerationById = (moderationId, token) => this.client.get(`/moderate/projects/${moderationId}`, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Submit moderation for a project by moderation ID
   * @param {string} token Authorization token
   * @param {string} moderationId Moderation ID 
   * @param {PendingProjectModeration} body Project moderation result
   * @returns {string}
   */
  postProjectModerationById = (moderationId, body, token) => this.client.post(`/moderate/projects/${moderationId}`, body, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get list of pending new projects and project changes
   * @param {string} token Authorization token
   * @param {PendingProjectFilter} filter Filtering options
   * @returns {Array<PendingProject>} List of pending projects
   */
  getProjectsForModeration = (token, filter) => this.client.get('/moderate/projects', {
    headers: { ...withAuthorization(token) },
    params: withParams(filter),
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Submit moderation for projects
   * @param {string} token Authorization token
   * @param {Array<PendingProjectModeration>} body List of moderation results
   * @returns {string}
   */
  postProjectsModeration = (body, token) => this.client.post('/moderate/projects', body, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get list of pending changes to all projects' information created by the user
   * @param {string} token Authorization token
   * @returns {Array<Project>} List of pending changes to all projects. Only changed fields and name are present
   */
  getAllPendingProjectChanges = (token) => this.client.get('/projects/pending', {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get pending changes for a project by project ID
   * @param {string} id Project ID
   * @param {string} token Authorization token
   * @returns {Project} changed fields and name of project
   */
  getPendingProjectById = (id, token) => this.client.get(`/projects/${id}/pending`, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Cancel pending changes to a project by project ID
   * @param {string} id Project ID
   * @param {string} token Authorization token
   * @returns {string}
   */
  cancelPendingProjectById = (id, token) => this.client.delete(`/projects/${id}/pending`, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get basic statistics
   * @param {string} token Authorization token
   * @returns {Stats} Basic grants statistics
   */
  getStats = () => this.client.get('/stats')
  .then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /*
   * Get a list of users
   * @param {string} token KeyCloak access token
   * @param {boolean} taOnly If all the fetched users should be TA users
   * @param {Pagination} pagination Pagination options
   * @returns {Array<User>}
   */
  getUsers = (token, taOnly = false, pagination = Pagination) => this.client.get('/users', {
    headers: { ...withAuthorization(token) },
    params: withParams({ taOnly }, pagination),
  }).then((r) => [r.data, r.status]).catch((error) => [[], error.response ? error.response.status : 500]);

  /**
   * Get a user by its ID
   * @param {string} userId User ID
   * @param {string} token KeyCloak access token
   * @returns {User}
   */
  getUser = (userId, token) => this.client.get(`/user/${userId}`, {
    headers: { ...withAuthorization(token) },
  }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);

  /**
   * Get unsigned transactions for "optin" amd "set_donation"
   * @param {string} appId ID of the smart contract application
   * @param {string} amount Donation amount
   * @param {string} address Address of funder
   * @param {string} token KeyCloak access token
   * @returns {Transactions}
   */
   getUnsignedTransactions = (appId, amount, address, token) => this.client.get(`transactions/${appId}?amount=${amount}&address=${address}`, {
     headers: { ...withAuthorization(token) },
   }).then((r) => [r.data, r.status]).catch((error) => [undefined, error.response ? error.response.status : 500]);
}

export default ApiService;
