# resize

ES6 throttled browser resize event dispatcher based on requestAnimationFrame.

## JS


```js
import MQ from 'mediaquery-js';

let mq = new MQ(computationalElement);

// Mediaquery change event
mq.on('mq:change', fn);

// Get the current Mediaquery
mq.breakpoint;

```

## CSS

You can set computationalElement to any element in the DOM.
If you don't pass an argument, it will fall back to the ```<html>``` element.

Next you add some CSS to the element you want to test your mediaquery to.
It uses the content attribute to identify the breakpoint.

```css
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
```

## Browser Support

[![Browser Support](http://ci.testling.com/ehtb/resize.png)](http://ci.testling.com/ehtb/resize)
