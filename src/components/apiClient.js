import axios from 'axios';

import { getApiBaseUri } from '../settings/apis';
import { getLogger } from './logger';

const logger = getLogger();

const apiClient = axios.create({
  baseURL: getApiBaseUri(),
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    logger.error(err);
    return Promise.reject(err);
  },
);

export default apiClient;
