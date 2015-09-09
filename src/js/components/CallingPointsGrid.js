"use strict";

var React = require('react');
var TrainsGridRow = require('./TrainsGridRow');


var CallingPointsGrid = React.createClass({

  render: function() {
    console.log("rendering callingPointsGrid");
    var externalScope = this;
    return (
      <table>
      {externalScope.props.callingPoints.map( function(callingPoint) {
          return (<TrainsGridRow key={callingPoint.name} train={callingPoint} />);
        })
      }
      </table>
    );
  }

});

module.exports = CallingPointsGrid; 
