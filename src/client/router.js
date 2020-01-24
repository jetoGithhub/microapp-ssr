class RouterMicroApp {
  
  constructor(config, contentDom) {
    this.rutas = config;
    this.stateNavigate = {
      curent: null,
      previous: null,
    }

    this.contentDom = contentDom;
  }

  initialize(preNavigate) {
    this.preNavigate = preNavigate;
    this.render(location.hash.slice(1));
    window.addEventListener('hashchange', () => {
      this.render(location.hash.substr(1));
    });
    // this.atachEvent()
    /*window.dispatchEvent(new CustomEvent("cat", {
      detail: {
        hazcheeseburger: true
      }
    }));*/
  }

  render(path) {
    let route;
    if(!path) {
      route = this._getRouteToPath(this.preNavigate.pathDefault);
      if(this.preNavigate.defender && this.preNavigate.whiteList.indexOf(route.path) ===-1) {
        let runNavigate = this.preNavigate.defender();
        if(runNavigate) {
          this.stateNavigate.curent = route;
          window.location.href = `#${route.path}`;
        };
      } else {
        this.stateNavigate.curent = route;
        window.location.href = `#${route.path}`;
      }
      return;
    }
    
    route = route = this._getRouteToPath(path);
    
    if(route) {
      const outlet = this._getOutlet(route.layout);
      if(outlet) {
        if(this.preNavigate.defender && this.preNavigate.whiteList.indexOf(route.path) ===-1) {
          let runNavigate = this.preNavigate.defender();
          if(runNavigate) {
            this._clearOutlet();
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
            outlet.style.display = 'block';
          }
        } else {
          this._clearOutlet();
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
          outlet.style.display = 'block';
        }
      }
    }
  }
  _getOutlet(typeLayout) {
    return this.contentDom.assignedElements().filter(element => {
      if(element.attributes.length > 0) {
        return element.attributes[0].value === typeLayout;
      }
    })[0];
  }

  _clearOutlet() {
    this.contentDom.assignedElements().forEach(element => {
      element.innerHTML = '';
      element.style.display = "none";
    });
  }

  _getRouteToPath(path) {
    return this.rutas.filter((ruta) => ruta.path === path)[0];
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
