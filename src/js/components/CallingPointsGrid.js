"use strict";

var React = require('react');

var Panel = require('react-bootstrap').Panel;

var panelTitle = (<h3>Calling Points Grid</h3>);

var CallingPointsGrid = React.createClass({
  
  render: function() {
    return (
      <Panel header={panelTitle}>
        <h2>Not Doing Anything</h2>
      </Panel>
    );
  }

});

module.exports = CallingPointsGrid; 
