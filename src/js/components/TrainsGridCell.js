"use strict";

var React = require('react');

var TrainsGridCell = React.createClass({

  render: function() {

    return (
      <td>
       {this.props.lateness.average_lateness}
      </td>
    );
  }

});

module.exports = TrainsGridCell;
