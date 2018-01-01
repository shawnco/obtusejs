/**
 * Basic ObtuseJS routing, but this time with support for parameters. Parameters are
 * inserted into the content string by a simple find-and-replace mechanism.
 */
function Router(view, routes) {
    
    // This function handles one of our routes being clicked.
    this.handleClick = function(e) {
      // Remove everything before the hash to get our route
      var url = e.toString();
      var routeString = url.split('#')[1];
    
      
      // Iterate through our routes array until we find the one we want
      for(var r in this.routes) {
        var re = new RegExp(this.routes[r].pattern);
        if(re.test(routeString)) {
          // First we need to retrieve the template from file
          var http = new Http();
          self = this;
          var route = self.routes[r];
          http.get(route.templateFile, function(file) {
            // Now interpolate our params into the output string.
            var output = self.interpolate(routeString, route, file);
            document.getElementById(view).innerHTML = output;          
          });
        }
      }
    }
    
    this.buildRoute = function(route) {
      if(route.indexOf('/:') === -1) {
        return '^' + route;
      } else {
        // Split it and see how many params we have
        var parts = route.split('/:');
        return '^' + parts[0] + '(\\/.*){' + (parts.length - 1) + '}';
      }
    }
    
    this.getParams = function(route) {
      if(route.indexOf('/:') === -1) {
        return [];
      } else {
        var parts = route.split('/:');
        var output = [];
        for(var i = 1; i < parts.length; i++) {
          output.push(parts[i]);
        }
      }
      return output;
    }
    
    this.interpolate = function(routeString, route, output) {
      // First split out the params passed through the route string
      var parts = routeString.split('/');
      parts.shift();
      
      // Now loop through the specified params and do a search-and-replace
      for(var p in route.params) {
        var re = new RegExp('{{' + route.params[p] + '}}', 'g');
        output = output.replace(re, parts[p]);
      }
      return output;
    }
    
    // Save the routes internally
    this.saveRoutes = function(routes) {
      this.routes = [];
      for(var r in routes) {
        // Create the pattern for it
        routes[r].pattern = this.buildRoute(routes[r].route);
        routes[r].params = this.getParams(routes[r].route);
        this.routes.push(routes[r]);
      }
    }
    
    // Register the anchor tags
    this.registerAnchors = function() {
      var self = this;
      this.anchors = document.getElementsByTagName('a');
      for(var i = 0; i < this.anchors.length; i++) {
        // Only override the anchors with the pound sign in them.
        var anchor = this.anchors[i];
        if(anchor.getAttribute('href').indexOf('#') !== -1)
        {
          this.anchors[i].onclick = function(e) {
            self.handleClick(this);
          }
        }
      }
    }
    
    this.view = view;
    this.saveRoutes(routes);
    this.registerAnchors();  
  }