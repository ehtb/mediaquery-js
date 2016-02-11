'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttledResize = require('throttled-resize');

var _throttledResize2 = _interopRequireDefault(_throttledResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MQ = function (_Resize) {
  _inherits(MQ, _Resize);

  function MQ(computationElement) {
    _classCallCheck(this, MQ);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQ).call(this));

    _this.computationElement = computationElement || document.documentElement;
    _this.currentBreakpoint = _this.breakpoint;

    _this.on('resize:end', _this.onResize.bind(_this));
    return _this;
  }

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
    get: function get() {
      var style = this.getComputedStyle();

      // Double quote replace to fix an issue on IE9-
      return style && style.getPropertyValue('content') ? style.getPropertyValue('content').replace(/("|')/g, '').replace(/("|')/g, '') : undefined;
    }
  }]);

  return MQ;
}(_throttledResize2.default);

exports.default = MQ;
