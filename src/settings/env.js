export function isDebugOn() {
  return process.env.DEBUG;
}

export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function isStagingEnv() {
  return process.env.NODE_ENV === 'staging';
}

export function isProductEnv() {
  return process.env.NODE_ENV === 'production';
}
