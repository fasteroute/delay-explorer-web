"use strict";

var React = require('react');

var BottomBar = React.createClass({

    render: function() {
        return (
          <nav className="navbar navbar-default navbar-fixed-bottom">
            <div id="attribution">
              <a href="http://www.nationalrail.co.uk"><img src="/img/Powered_by_NRE.png"/></a>
            </div>
            <div className="container-fluid">
            </div>
          </nav>
        );
    }

});

module.exports = BottomBar;
