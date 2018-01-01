/**
 * A component is just a Javascript class associated to an HTML file. Variables used in
 * the HTML come from the component.
 */
 
function Component(file, component) {
    // Load the file
    var keys = new component();
    var http = new Http();
    var that = this;
    http.get(file, function(content) {
      // Interpolate
      var content = that.interpolate(content, keys);
      document.getElementById('route-view').innerHTML = content;
    });
    
    this.interpolate = function(content, keys) {
      for (var k in keys) {
        var re = new RegExp('{{' + k + '}}', 'g');
        content = content.replace(re, keys[k]);
      }
      return content;
    }
  }