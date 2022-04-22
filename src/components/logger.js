import { isDebugOn } from '../settings/env';
import is from '../utils/is';

const LOG_PREFIX = '[App Name]';
const LOGGER_NAME = 'YourLoggerName';
const noop = () => {};

class Logger {
  constructor() {
    this.enabled = window.console && isDebugOn();
  }

  get log() {
    return this.enabled
      // eslint-disable-next-line no-console
           ? Function.prototype.bind.call(console.log, console, LOG_PREFIX)
           : noop;
  }

  get warn() {
    return this.enabled
      // eslint-disable-next-line no-console
           ? Function.prototype.bind.call(console.warn, console, LOG_PREFIX)
           : noop;
  }

  get error() {
    return this.enabled
      // eslint-disable-next-line no-console
           ? Function.prototype.bind.call(console.error, console, LOG_PREFIX)
           : noop;
  }
}

/**
 * @return {Logger}
 */
export function getLogger() {
  let logger = window[LOGGER_NAME];

  if (!is.nullOrUndefined(logger)) {
    return logger;
  }

  logger = new Logger();
  window[LOGGER_NAME] = logger;

  return logger;
}

