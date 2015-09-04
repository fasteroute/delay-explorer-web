"use strict";

var Fluxxor = require('fluxxor');
var React = require('react');
var Router = require('react-router');

var BottomBar = require('./BottomBar');
var TopBar = require('./TopBar');

var RouteHandler = Router.RouteHandler;

var FluxMixin = Fluxxor.FluxMixin(React);

var App = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return (
      <div>
        <TopBar/>
        <RouteHandler/>
        <BottomBar/>
      </div>
     );
  },

  componentDidMount: function() {
    console.log("Component did mount");
  }
});

module.exports = App;
