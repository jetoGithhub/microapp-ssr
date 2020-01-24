var style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  .container-app {
    display: grid;
    grid-template-rows: 30px 54px;
    grid-template-areas:
    'head1'
    'head2'
    'main';
  }
  .head-1 {
    grid-area: head1;
  }
  .head-1 > span.title {
   grid-row-start: 1;
   color: #202e44;
   font-size: 16px;
   font-weight: 200;
  }
  .head-1 > img.everis {
    grid-row-start: 1;
    position: absolute;
    width: 40px;
    /* top: 0; */
    right: 9px;
  }
  .head-2 {
    border-top: 1px solid #d8dfea;
    background-color: #f2f4f8;
    grid-area: head2;
  }
  .head-2 ul > li {
    display: inline-block;
    width: auto;
    padding: 5px 0 5px;
    color: #7cb342;
    border: 0px;
    text-align: center;
    color: #fff;
    margin-right: 10px;
  }
  .head-2 ul > li:hover {
    color: #8d8d8d;
    border-bottom: 2px solid #7cb342;
    
  }
  .head-2 ul > li a {
    text-decoration:none;
    color:#8d8d8d;;
    font-size:14px;
  } 
  .outlet-app {
    grid-area: main;
    padding: 35px 0 0 0;
  }
`

class AppLayout extends HTMLElement {

  constructor() {
    super()
    var shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `
    <div class="container-app">
        <div class="head-1">
          <span class="title">Demo Micro Flow / ECNF</span>
          <img class="everis" src="resources/images/everis.jpg" alt="everis">
        </div>
        <div class="head-2">
          <ul>
            <li><a href="#/vanillajs">VanillaJS</a></li>
            <li><a href="#/admin-user/list">Angular Elements</a></li>
          </ul>
        </div >
        <section class="outlet-app" ><slot></slot></section>
    </div>
    `;
    shadow.appendChild(style);
  }
}

window.customElements.define('app-layout', AppLayout);