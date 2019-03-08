# lit-media-query

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-media-query) ![npm](https://img.shields.io/npm/v/lit-media-query.svg)

Web component for media queries (like iron-media-query) implemented with LitElement.

See [Documentation](https://www.webcomponents.org/element/lit-media-query), [Demo](https://lit-media-query.victorbp.site/).

## Installation

```shell
npm install lit-media-query --save
```

Then, import lit-media-query into your element:

```javascript
import 'lit-media-query/lit-media-query.js';
```

or in an html file:

```html
<script type="module" src="/path/to/lit-media-query.js"></script>
```

## Usage

In your LitElement class:
```javascript
static get properties() {
  return {
    _query: { type: String },
    _isMobile: { type: Boolean }
  }
}

constructor() {
  super();
  this._query = '(max-width: 460px)';
  this._isMobile = false;
}

render() {
  return html`
  <lit-media-query
    .query="${this._query}"
    @changed="${this._handleMediaQuery}">
  </lit-media-query>
  `;
}

_handleMediaQuery(event) {
  this._isMobile = event.detail.value;
}
```

Variable `value` from the event is a `Boolean`. Will be `true` if the media query is fulfilled, otherwise is `false`.

In this example, when the viewport is less than 460px the variable `_isMobile` will be `true`.

## Browser compatibility

`lit-media-query` uses [Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API) which is not yet compatible with all browsers, but it will fall back to `window onresize` event, increasing the browsers compatibility.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D