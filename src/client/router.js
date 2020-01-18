class RouterMicroApp {
  
  constructor(config) {
    this.rutas = config;
    this.stateNavigate = {
      curent: null,
      previous: null,
    }
  }

  initialize() {
    this.render(location.hash.slice(1));
    window.addEventListener('hashchange', () => {
      this.render(location.hash.substr(1));
    });
    // this.atachEvent()
  }

  render(path) {
    let route;
    if(!path) {
      route = this._getPathDefault();
      this.stateNavigate.curent = route;
      window.location.href = `#${route.path}`;
      return;
    }
    
    route = route || this.rutas.filter((ruta) => ruta.path === path)[0];
    const outlet = document.getElementById("app");
    if(outlet && route) {
      outlet.innerHTML = '';
      if(document.querySelector(`script[router-load="${route.tag}"]`)) {
        outlet.innerHTML = `<${route.tag}></${route.tag}>`;
        this.stateNavigate.previous = Object.assign({}, this.stateNavigate.curent);
        this.stateNavigate.curent = route;
      } else {
        this._loadScript(route.resources, route.tag).then(() => {
          outlet.innerHTML = `<${route.tag}></${route.tag}>`;
          this.stateNavigate.previous = Object.assign({}, this.stateNavigate.curent);
          this.stateNavigate.curent = route;
        });
      }
    }
  }

  _getPathDefault() {
    return this.rutas[0];
  }

  _loadScript(resource, tag) {
   return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = resource;
      script.onload = resolve;
      script.onerror = reject;
      script.setAttribute('router-load', tag);
      document.body.appendChild(script);
   });
  }

  
}
