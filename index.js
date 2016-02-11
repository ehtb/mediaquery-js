'use strict';

import Resize from 'throttled-resize';

export default class MQ extends Resize {
  constructor(computationElement) {
    super();

    this.computationElement = computationElement || document.documentElement;
    this.currentBreakpoint = this.breakpoint;

    this.on('resize:end', this.onResize.bind(this));
  }

  onResize() {
    const breakpoint = this.breakpoint;

    if (breakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = breakpoint;

      this.emitEvent('mq:change', [{
        breakpoint
      }]);
    }
  }

  hasMq() {
    return (typeof window.matchMedia !== 'undefined' ||
      typeof window.msMatchMedia !== 'undefined');
  }

  getComputedStyle() {
    return window.getComputedStyle(this.computationElement, ':after');
  }

  get breakpoint() {
    const style = this.getComputedStyle();

    // Double quote replace to fix an issue on IE9-
    return style && style.getPropertyValue('content')
      ? style.getPropertyValue('content')
          .replace(/("|')/g, '')
          .replace(/("|')/g, '')
      : undefined;
  }
}
