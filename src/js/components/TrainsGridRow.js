"use strict";

var React = require('react');

var TrainsGridCell = require('./TrainsGridCell');

var TrainsGridRow = React.createClass({

  render: function() {

    return (
      <tr>
        <th className="rowHeader">{this.props.train.name}</th>
        {this.props.train.lateness.map(function(lateness) {
          return <TrainsGridCell lateness={lateness}/>;
        })}
      </tr>
    );
  }

});

module.exports = TrainsGridRow;
