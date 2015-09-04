"use strict";

// Import the libraries needed for this app.
var Fluxxor = require('fluxxor');
var React = require('react');
var Router = require('react-router');

// Import the bits of this project that are needed.
var App = require('./components/App');
var TrainExplorer = require('./components/TrainExplorer');
var TrainsGrid = require('./components/TrainsGrid');
var CallingPointsGrid = require('./components/CallingPointsGrid');

var RoutesStore = require('./stores/RoutesStore');
var SegmentsStore = require('./stores/SegmentsStore');
var StationsStore = require('./stores/StationsStore');
var TrainsStore = require('./stores/TrainsStore');

var TrainExplorerActions = require('./actions/TrainExplorerActions');

// Build an object that contains all the stores for this app.
var stores = {
  RoutesStore: new RoutesStore(),
  SegmentsStore: new SegmentsStore(),
  StationsStore: new StationsStore(),
  TrainsStore: new TrainsStore()
};

// Build an object which contains all the objects for this app.
var actions = {
  loadTrainExplorer: TrainExplorerActions.loadTrainExplorer
};

// Set up fluxxor 
var flux = new Fluxxor.Flux(stores, actions);
//window.flux = flux;

// Debug helper that prints to the console whenever something is dispatched by fluxxor.
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

// Set up router and routes.
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TrainExplorer}/>
    <Route name="trainExplorer" path="TrainExplorer" handler={TrainExplorer}/>
    <Route name="trainsGrid" path="TrainExplorer/:from/:to/:type/:time" handler={TrainExplorer}/>
    <Route name="callingPointsGrid" path="TrainExplorer/:from/:to/:type/:time/:trainId" handler={TrainExplorer}/>
  </Route>
);

// Function to launch the app.
var run = function() {
  Router.run(routes, function(Handler) {
    console.log("Running router");
    React.render(
      <Handler flux={flux} />,
      document.getElementById("app")
    );
  });
};

// Make the run function get called once the page has loaded.
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}


