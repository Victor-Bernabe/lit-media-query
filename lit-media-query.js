import { LitElement, html } from 'lit-element';

/**
 * The `lit-media-query` component detects when a media query
 * is `true` or `false`.
 */
class LitMediaQuery extends LitElement {
  /**
   * Fired when `lit-media-query` changes detects a change
   * in the media query (from `true` to `false` and vice versa).
   *
   * @event changed
   * @param {boolean} value If media query is being fulfilled or not.
   */

  static get properties() {
    return {
      /**
       * Media query to be watched by the element.
       *
       * Can be modified at run time by setting a new value.
       */
      query: { type: String },
      _match: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.query = '(max-width:460px)';
    this._match = false;
    this.boundResizeHandler = this._handleRisize.bind(this);
  }

  render() {
    return html`
      <style>
        :host {
          display: none;
        }
      </style>
    `;
  }

  firstUpdated() {
    // Check media query once before 'resize' event
    this._initialMediaQueryCheck();
  }

  connectedCallback() {
    super.connectedCallback();
    // Check if Visual Viewport API is supported
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('resize', this.boundResizeHandler);
    } else {
      window.addEventListener('resize', this.boundResizeHandler);
    }
  }

  disconnectedCallback() {
    // Remove event listeners
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.removeEventListener(
        'resize',
        this.boundResizeHandler
      );
    } else {
      window.removeEventListener('resize', this.boundResizeHandler);
    }
    super.disconnectedCallback();
  }

  _initialMediaQueryCheck() {
    if (window.matchMedia(this.query).matches) {
      this.dispatchEvent(
        new CustomEvent('changed', {
          detail: {
            value: true
          },
          composed: true,
          bubbles: true
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('changed', {
          detail: {
            value: false
          },
          composed: true,
          bubbles: true
        })
      );
    }
  }

  _handleRisize() {
    if (window.matchMedia(this.query).matches) {
      // From no match to match
      if (this._match === false) {
        this.dispatchEvent(
          new CustomEvent('changed', {
            detail: {
              value: true
            },
            composed: true,
            bubbles: true
          })
        );
        this._match = true;
      }
    } else {
      // From match to no match
      if (this._match === true) {
        this.dispatchEvent(
          new CustomEvent('changed', {
            detail: {
              value: false
            },
            composed: true,
            bubbles: true
          })
        );
        this._match = false;
      }
    }
  }
}

customElements.define('lit-media-query', LitMediaQuery);
