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
      document.getElementById('route-view').innerHTML = that.content;
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