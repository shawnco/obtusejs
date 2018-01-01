/**
 * A basic implementation of the HTTP class. It uses a design similar to the Observable, but doesn't actually implement it.
 */

function Http() {
    this.xhttp = new XMLHttpRequest();
    
    this.get = function(url, callback) {
      this.xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
          callback(this.responseText);
        }
      }
      this.xhttp.open('GET', url, true);
      this.xhttp.send();
    }
    
    this.post = function(url, params, callback) {
      this.xhttp.readystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
          callback(this.responseText);
        }
      }
      this.xhttp.open('POST', url, true);
      this.xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      this.xhttp.send(params);
    }
  }