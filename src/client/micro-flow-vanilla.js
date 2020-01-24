var style = document.createElement('style');
style.textContent = `
  .container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

`

class MicroFlowJavascript extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    var shadow = this.attachShadow({mode: 'open'});
    var container = document.createElement('div');
    container.classList = 'container';
    container.innerHTML = `
      <div>
        <h3>Micro Flow, create with Javascript Vanilla using to WebComponents</h3>
        <a href="#/admin-user/list" >Ir Home</a>
      </div>
    `;
    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

window.customElements.define('microflow-vanilla', MicroFlowJavascript);