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
        if(this.routes[r].route === routeString) {
          // Match has been found, let's show the string
          document.getElementById(view).innerHTML = this.routes[r].content;
        }
      }
    }
    
    // Save the routes internally
    this.saveRoutes = function(routes) {
      this.routes = [];
      for(var r in routes) {
        this.routes.push(routes[r]);
      }
      console.log(this.routes)
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