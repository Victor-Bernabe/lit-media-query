// This file is only to help in local development
import { LitElement, html, css } from 'lit-element';

import '/lit-media-query.js';

class MyApp extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 500px;
        background-image: linear-gradient(to bottom, #232526, #414345);
        color: #dfdfdf;
      }

      #title {
        font-size: 40px;
        text-align: center;
      }

      input {
        width: 500px;
        padding: 18px;
        text-align: center;
        font-size: 34px;
        font-family: 'Courier New', Courier, monospace;
        color: #dfdfdf;
        background-color: #313131;
        border: 1px solid #8d8d8d;
      }

      input:focus {
        border: 1px solid #dfdfdf;
        outline: none;
      }

      input::-moz-placeholder {
        color: #a7a7a7;
      }
      input:-moz-placeholder {
        color: #a7a7a7;
      }
      input::-webkit-input-placeholder {
        color: #a7a7a7;
      }
      input::-ms-input-placeholder {
        color: #a7a7a7;
      }
      input::placeholder {
        color: #a7a7a7;
      }

      #result {
        font-size: 40px;
      }

      #false {
        font-family: SelawkBold, sans-serif;
        color: #e86c6c;
      }

      #true {
        font-family: SelawkBold, sans-serif;
        color: #81e86c;
      }

      @media all and (max-width: 580px) {
        #title {
          font-size: 26px;
        }

        input {
          width: 250px;
          font-size: 20px;
        }

        #result {
          font-size: 26px;
        }
      }
    `;
  }

  static get properties() {
    return {
      _query: { type: String },
      _result: { type: Boolean }
    };
  }

  constructor() {
    super();
    this._query = '(max-width:800px)';
    this._result = false;
  }

  render() {
    return html`
      <!-- lit-media-query -->
      <lit-media-query
        .query="${this._query}"
        @changed="${this._handleMediaQuery}"
      >
      </lit-media-query>

      <!-- Template -->
      <!-- Empty div's to emulate space-evenly -->
      <div></div>
      <div id="title">
        Input your media query and resize the window
      </div>
      <div></div>
      <input
        type="text"
        placeholder="${'(max-width:800px)'}"
        @input="${e => {
          this._query = e.srcElement.value;
        }}"
      />
      <div></div>
      <div id="result">
        <span>Result:&nbsp;</span>
        <span>
          ${this._result
            ? html`
                <span id="true">true</span>
              `
            : html`
                <span id="false">false</span>
              `}
        </span>
      </div>
      <div></div>
    `;
  }

  _handleMediaQuery(event) {
    this._result = event.detail.value;
  }
}

customElements.define('my-app', MyApp);
