/**
 * This is the class that holds our components, and other major pieces.
 */
function Obtuse(view, routes) {
    this.selector = 'data-obtuse';
    this.components = [];
    this.router = new Router(view, routes);
    
    this.component = function(name, file, component) {
      this.components[name] = new Component(file, component);
      console.log(this.components);
    }
  }