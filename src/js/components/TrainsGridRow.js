"use strict";

var React = require('react');

var TrainsGridCell = require('./TrainsGridCell');
var FluxMixin = require('fluxxor').FluxMixin(React);

var TrainsGridRow = React.createClass({
  mixins: [FluxMixin],
  componentWillMount: function() {
    this.setState( { isSelected: this.props.isSelected } );
  },
  onClick: function() {
    if (this.props.train.id === null) { return; }

    console.log("isSelected = " + this.state.isSelected);
    if ( !this.state.isSelected ) {
      this.setState({ isSelected: true});
      console.log("Changed isSelected to " + this.state.isSelected);
      this.getFlux().actions.loadCallingPoints(this.props.train.id);
    } else {
      this.setState({ isSelected: false});
      console.log("Changed isSelected to " + this.state.isSelected);
      this.getFlux().actions.loadCallingPoints(null);
    }
  },
  render: function() {
    return (
      <tr onClick={this.onClick}>
        <th className="rowHeader">{this.props.train.name}</th>
        {this.props.train.lateness.map(function(lateness) {
          return <TrainsGridCell key={lateness.day} lateness={lateness}/>;
        })}
      </tr>
    );
  }

});

module.exports = TrainsGridRow;
