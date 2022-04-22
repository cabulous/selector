import './styles/countdown.scss';

import { createElement, emptyElement } from '../../utils/elements';
import is from '../../utils/is';
import countdownDefaults from './types/countdownDefaults';

class Countdown {

  /**
   * @param {HTMLElement} el - DOM node of the countdown
   * @param {CountdownOptionTypes} [options]
   */
  constructor(el, options) {
    this.el = el;

    /**
     * @type {CountdownOptionTypes}
     */
    this.options = {};

    /**
     * Interval reference or false if counter is stopped
     * @type {Boolean || Number}
     */
    this.interval = false;

    this.classNames = {
      digit: 'digit',
      separator: 'separator',
    };

    this.#mergeOptions(options);
    this.#init();
  }

  #init() {
    // don't start if the countdown is already started
    if (this.interval) {
      return;
    }

    this.#render();

    if (this.options.refresh) {
      this.interval = window.setInterval(() => {
        this.#render();
      }, this.options.refresh);
    }
  };

  /**
   * @param {number | string} digit
   * @return {HTMLElement}
   */
  #createDigit(digit) {
    return createElement('span', {
      class: this.classNames.digit,
    }, `${digit}`);
  };

  /**
   * @return {HTMLElement}
   */
  #createSeparator() {
    return createElement('span', {
      class: this.classNames.separator,
    }, ':');
  };

  /**
   * Get the difference between now and the end date
   * @return {CountdownDiffTypes} Object with the diff information (years, days, hours, min, sec, millisec)
   */
  #getDiffDate() {
    if (typeof this.options.date !== 'object') {
      this.options.date = new Date(this.options.date);
    }

    let diff = (this.options.date.getTime() - Date.now() + this.options.offset)
      / 1000;

    const dateData = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    if (diff <= 0) {
      if (this.interval) {
        this.#stop();
        if (is.function(this.options.onEnd)) {
          this.options.onEnd();
        }
      }
      return dateData;
    }

    if (diff >= (365.25 * 86400)) {
      dateData.years = Math.floor(diff / (365.25 * 86400));
      diff -= dateData.years * 365.25 * 86400;
    }

    if (diff >= 86400) {
      dateData.days = Math.floor(diff / 86400);
      diff -= dateData.days * 86400;
    }

    if (diff >= 3600) {
      dateData.hours = Math.floor(diff / 3600);
      diff -= dateData.hours * 3600;
    }

    if (diff >= 60) {
      dateData.min = Math.floor(diff / 60);
      diff -= dateData.min * 60;
    }

    dateData.sec = Math.round(diff);

    dateData.millisec = diff % 1 * 1000;

    return dateData;
  };

  /**
   * Add leading zeros to a number
   * @param  {Number} num    Input number
   * @param  {Number} length Length of the desired output
   * @return {String}        String of the desired length with leading zeros
   */
  static leadingZeros = (num, length) => {
    const digitLength = length || 2;
    const digit = String(num);
    if (digit.length > digitLength) {
      return digit;
    }
    return (Array(digitLength + 1).join('0') + digit).substr(-digitLength);
  };

  /**
   * Merge default options and options into this.options
   * @param {CountdownOptionTypes} customOptions
   */
  #mergeOptions(customOptions) {
    this.options = { ...countdownDefaults, ...customOptions };
    if (is.string(this.options.date)) {
      this.options.date = new Date(this.options.date);
    }
  };

  /**
   * Render the countdown
   */
  #render() {
    emptyElement(this.el);

    const data = this.#getDiffDate();
    let totalHours = 0;

    if (!is.zero(data.days)) {
      totalHours += data.days * 24;
    }

    totalHours += data.hours;

    if (!is.zero(totalHours)) {
      const hours = this.#createDigit(Countdown.leadingZeros(totalHours, 2));
      const mins = this.#createDigit(Countdown.leadingZeros(data.min, 2));
      const secs = this.#createDigit(Countdown.leadingZeros(data.sec, 2));
      const separator1 = this.#createSeparator();
      const separator2 = this.#createSeparator();
      this.el.append(hours, separator1, mins, separator2, secs);

      return;
    }

    if (!is.zero(data.min)) {
      const mins = this.#createDigit(Countdown.leadingZeros(data.min, 2));
      const secs = this.#createDigit(Countdown.leadingZeros(data.sec, 2));
      const separator = this.#createSeparator();
      this.el.append(mins, separator, secs);

      return;
    }

    const secs = this.#createDigit(Countdown.leadingZeros(data.sec, 2));
    this.el.append(secs);
  };

  /**
   * Restart the countdown and update options
   * @param {CountdownOptionTypes} customOptions
   */
  restart(customOptions) {
    this.#mergeOptions(customOptions);
    this.interval = false;
    this.#init();
    return this;
  };

  /**
   * Stop the countdown refresh / rerender
   * @return {Countdown} Countdown instance
   */
  #stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = false;
    }
    return this;
  };

  /**
   * Update the end date of the countdown
   * @param  {Date} newDate Date object or a String/Number that can be passed to the Date constructor
   * @return {Countdown} Countdown instance
   */
  update(newDate) {
    if (typeof newDate !== 'object') {
      this.options.date = new Date(newDate);
    }
    this.options.date = newDate;
    this.#render();
    return this;
  };

  /**
   * Update the offset
   * @param  {Number} offset New offset in ms
   * @return {Countdown} Countdown instance
   */
  updateOffset(offset) {
    this.options.offset = offset;
    return this;
  };
}

export default Countdown;
