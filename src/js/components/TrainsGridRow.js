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

    if ( !this.state.isSelected ) {
      this.setState({ isSelected: true});
      this.getFlux().actions.loadCallingPoints(this.props.train.id);
    } else {
      this.setState({ isSelected: false});
      this.getFlux().actions.loadCallingPoints(null);
    }
  },
  onMouseOver: function() {
    this.getFlux().actions.updateRoute(this.props.train.route);
  },
  onMouseLeave: function() {
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
