'use strict';

import eventEmitter from 'wolfy87-eventemitter';
import Resize from 'throttled-resize';

export default class MQ extends eventEmitter {
  currentBreakpoint: String;
  computationElement: HTMLElement;
  resize: Resize;

  constructor(computationElement) {
    super();

    this.computationElement = computationElement || document.documentElement;

    this.currentBreakpoint = this.breakpoint;

    this.resize = new Resize();
    this.resize.on('resize:end', this.onResize.bind(this));
  };

  onResize() {
    let breakpoint = this.breakpoint;

    if (breakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = breakpoint;

      this.emitEvent('mq:change', [{
        breakpoint
      }]);
    }
  };

  hasMq() {
    return (typeof window.matchMedia !== 'undefined' ||
      typeof window.msMatchMedia !== 'undefined');
  };

  getComputedStyle() {
    return window.getComputedStyle(this.computationElement, ':after');
  };

  get breakpoint() {
    let style = this.getComputedStyle();

    return style && style.getPropertyValue('content') ?
      style.getPropertyValue('content')
      .replace(/("|')/g, '')
      .replace(/("|')/g, '') : undefined;
  };
}
