class RouterElement extends HTMLElement {

  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<slot></slot>';
  }
  static get observedAttributes() {
    return ['config'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(!window.router) {
      window.router = new RouterMicroApp(JSON.parse(newValue), this.shadowRoot.querySelector('slot'));
    }
  }
}

window.customElements.define('shell-router', RouterElement);