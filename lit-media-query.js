import { LitElement, html } from 'lit-element';

class LitMediaQuery extends LitElement {
  static get properties() {
    return {
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
    if(typeof window.visualViewport !== 'undefined') {
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
    if(window.matchMedia(this.query).matches) {
      // From no match to match
      if(this._match === false) {
        this.dispatchEvent(new CustomEvent('changed', {
          detail: {
            value: true
          },
          composed: true,
          bubbles: true
        }));
        this._match = true;
      }
    } else {
      // From match to no match
      if(this._match === true) {
        this.dispatchEvent(new CustomEvent('changed', {
          detail: {
            value: false
          },
          composed: true,
          bubbles: true
        }));
        this._match = false;
      }
    }
  }
}

customElements.define('lit-media-query', LitMediaQuery);