/**
 * right now the router does the interpolating, which is a problem
 * because it's being activated every time the components are build.
 * what i want it to do is simply know how to associate a route to a
 * component, but leave the rendering to the component itself. the
 * components already have the rendering code built, but we need a way
 * such that when a link is clicked, the router alerts the parent Obtuse
 * object what route the user wants to go to. i think this can be done
 * with the observable/observer pattern.
 */


/**
 * A component is just a Javascript class associated to an HTML file. Variables used in
 * the HTML come from the component.
 */
 
function Component(file, component) {
    this.file = file;
    this.http = new Http();
    this.content = '';
    this.component = new component();
    this.template = '';
    var that = this;
    
    this.http.get(this.file, function(content) {
      // Interpolate
      that.template = content;
      that.interpolate();
    });
    
    this.interpolate = function() {
      that.content = that.template;
      for (var k in that.component) {
        var re = new RegExp('{{' + k + '}}', 'g');
        that.content = that.content.replace(re, that.component[k]);
      }
      document.getElementById('captain-view').innerHTML = that.content;
    }
    
    this.setListeners = function() {
      var events = [
        'click',
        'mouseenter',
        'mouseleave',
        'mousemove',
        //'mouseover',
        'mouseout',
        'keydown',
        'keyup',
        'keypress'
      ];
      for (var e in events) {
        window.addEventListener(events[e], function() {
          that.interpolate()
        });
      }
    }
    
    this.setListeners();
  }