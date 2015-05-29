'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _wolfy87Eventemitter = require('wolfy87-eventemitter');

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

var _throttledResize = require('throttled-resize');

var _throttledResize2 = _interopRequireDefault(_throttledResize);

var MQ = (function (_eventEmitter) {
  function MQ(computationElement) {
    _classCallCheck(this, MQ);

    _get(Object.getPrototypeOf(MQ.prototype), 'constructor', this).call(this);

    this.computationElement = computationElement || document.documentElement;

    this.currentBreakpoint = this.breakpoint;

    this.resize = new _throttledResize2['default']();
    this.resize.on('resize:end', this.onResize.bind(this));
  }

  _inherits(MQ, _eventEmitter);

  _createClass(MQ, [{
    key: 'onResize',
    value: function onResize() {
      var breakpoint = this.breakpoint;

      if (breakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = breakpoint;

        this.emitEvent('mq:change', [{
          breakpoint: breakpoint
        }]);
      }
    }
  }, {
    key: 'hasMq',
    value: function hasMq() {
      return typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined';
    }
  }, {
    key: 'getComputedStyle',
    value: function getComputedStyle() {
      return window.getComputedStyle(this.computationElement, ':after');
    }
  }, {
    key: 'breakpoint',
    get: function () {
      var style = this.getComputedStyle();

      return style && style.getPropertyValue('content') ? style.getPropertyValue('content').replace(/("|')/g, '').replace(/("|')/g, '') : undefined;
    }
  }]);

  return MQ;
})(_wolfy87Eventemitter2['default']);

exports['default'] = MQ;
module.exports = exports['default'];
