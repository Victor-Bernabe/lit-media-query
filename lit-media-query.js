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
    // Check if Visual Viewport API is supported
    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('resize', () => {
        this._handleRisize();
      });
    } else {
      window.addEventListener('resize', () => {
        this._handleRisize();
      });
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
