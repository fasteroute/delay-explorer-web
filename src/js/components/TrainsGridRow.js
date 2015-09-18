"use strict";

var React = require('react');

var TrainsGridCell = require('./TrainsGridCell');
var FluxMixin = require('fluxxor').FluxMixin(React);

var TrainsGridRow = React.createClass({
  mixins: [FluxMixin],
  componentWillMount: function() {
    this.setState( { isSelected: this.props.isSelected } );
  },
  componentDidMount: function() {
    if (this.props.isSelected) { this.onMouseOver(); }
  },
  onClick: function() {
    if (this.props.train.id === null) { return; }

    if ( !this.state.isSelected ) {
      this.setState({ isSelected: true});
      this.getFlux().actions.loadCallingPoints([this.props.train.id, this.props.origin, this.props.destination]);
    } else {
      this.setState({ isSelected: false});
      this.getFlux().actions.loadCallingPoints(null);
    }
  },
  onMouseOver: function() {
    if (this.props.isCallingPoint) { return; }

    var selectedRoutes = this.props.selectedRow.map(function(val) { return val; });
    if (!this.props.isSelected) {
      selectedRoutes.push(this.props.train.route);
    }
    this.getFlux().actions.updateRoute(selectedRoutes);
  },
  onMouseLeave: function() {
    if (this.props.isCallingPoint) { return; }

    this.getFlux().actions.updateRoute(this.props.selectedRow);
  },
  render: function() {
    var externalScope = this;
    var days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var dayLen = days.length;
    var latenessCounter = 0;
    var latenessLen = this.props.train.lateness.length;
    var latenessArray = this.props.train.lateness;
    return (
      <tr onClick={this.props.isCallingPoint ? "" : this.onClick} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className={this.props.isSelected ? "selected" : "" }>
        <th className="rowHeader">
        {this.props.train.name}
        {this.props.train.time ? [<br/>, <small>Scheduled at {this.props.train.time}</small>] : null}
        </th>
        {
          // Here we receive a list of latenesses for each day that the service is run
          // Since the service doesn't run on all days we need to keep track of which day to put where
          days.map(function(day, index) {
            if (latenessCounter < latenessArray.length && day === latenessArray[latenessCounter].day) {
              var lateness = latenessArray[latenessCounter];
              latenessCounter++;
              return (<TrainsGridCell key={lateness.day} lateness={lateness} isSelected={false} popoverTitle={externalScope.props.popoverTitle}/>);
            } else {
              return <TrainsGridCell key={day} lateness={null} isSelected={false} popoverTitle={externalScope.props.popoverTitle}/>;
            }
          })
        }
      </tr>
    );
  }

});

module.exports = TrainsGridRow;
