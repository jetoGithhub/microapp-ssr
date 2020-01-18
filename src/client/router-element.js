class RouterElement extends HTMLElement {
  static get observedAttributes() {
    return ['config'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(!window.router) {
      window.router = new RouterMicroApp(JSON.parse(newValue));
    }
    window.router.initialize();
  }
}

window.customElements.define('shell-router', RouterElement);