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
  onMouseOver: function() {
    console.log("selects route" + this.props.train.route);
    this.getFlux().actions.updateRoute(this.props.train.route);
  },
  onMouseLeave: function() {
    console.log("clears Routes");
    this.getFlux().actions.updateRoute(null);
  },
  render: function() {
    var externalScope = this;
    return (
      <tr onClick={this.props.isCallingPoint ? "" : this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className={this.props.isSelected ? "selected" : "" }>
        <th className="rowHeader">
        {this.props.train.name}
        {this.props.train.time ? [<br/>, <small>Scheduled at {this.props.train.time}</small>] : null}
        </th>
        {this.props.train.lateness.map(function(lateness) {
          return <TrainsGridCell key={lateness.day} lateness={lateness} isSelected={false} popoverTitle={externalScope.props.popoverTitle}/>;
        })}
      </tr>
    );
  }

});

module.exports = TrainsGridRow;
