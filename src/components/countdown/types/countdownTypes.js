/**
 * @typedef {Object} CountdownOptionTypes
 * @property {number | string | Date} [date]
 * @property {number} [refresh]
 * @property {number} [offset]
 * @property {Function} [onEnd]
 * @property {CountdownRenderFunction} [render]
 */

/**
 * @callback CountdownRenderFunction
 * @param {CountdownDiffTypes} data
 * @param {Element} el
 */

/**
 * @typedef {Object} CountdownDiffTypes
 * @property {number} years
 * @property {number} days
 * @property {number} hours
 * @property {number} min
 * @property {number} sec
 * @property {number} millisec
 *
 */
