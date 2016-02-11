'use strict';

import test from 'tape';
import MQ from './index';

document.body.innerHTML = `
  <style>
  html:after {
    clip: rect(0 0 0 0);
    height: 0;
    left: -9999px;
    overflow: hidden;
    position: absolute;
    top: -9999px;
    visibility: hidden;
    width: 0;
  }

  @media (max-width: 600px) {
    html:after {
      content: 'sm';
    }
  }

  @media (min-width: 601px) {
    html:after {
      content: 'lg';
    }
  }
  </style>
`;

const mq = new MQ(document.documentElement);

test('returns breakpoint', function(t) {
  t.plan(1);
  
  t.assert(
    ~['sm', 'lg'].indexOf(mq.breakpoint),
    'has a valid breakpoint'
  );
});

test('resize emits events', function(t) {
  t.plan(1);

  mq.currentBreakpoint = '';
  mq.on('mq:change', () => {
    t.pass('mq change event dispatched');
  });

  fire();
});

function fire() {
  if (document.createEvent) {
    var ev = document.createEvent('Event');
    ev.initEvent('resize', true, true);
    window.dispatchEvent(ev);
  } else {
    document.fireEvent('onresize');
  }
}
