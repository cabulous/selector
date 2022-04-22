import { isDevEnv, isProductEnv, isStagingEnv } from './env';

export function getApiBaseUri() {
  if (isDevEnv()) return '';
  if (isStagingEnv()) return '';
  if (isProductEnv()) return '';
  throw new Error('Unknown environment');
}

export function getStaticBaseUri() {
  if (isDevEnv()) return '';
  if (isStagingEnv()) return '';
  if (isProductEnv()) return '';
  throw new Error('Unknown environment');
}

export const apiConstants = {
  EXAMPLE: `${getApiBaseUri()}/example`,
};
