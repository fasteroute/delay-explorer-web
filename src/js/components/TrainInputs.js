"use strict";

var React = require('react/addons');
var AutoSuggest = require('react-autosuggest');
var NavigationMixin = require('react-router').Navigation;
var FluxMixin = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

var $ = require('jquery');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;

var TrainInputs = React.createClass({
  mixins: [
    NavigationMixin,
    React.addons.LinkedStateMixin,
    FluxMixin,
    StoreWatchMixin('StationsStore')
  ],
  getInitialState: function() {
    return {};
  },
  getStateFromFlux: function() {
    var stationsStore = this.getFlux().store('StationsStore');
    if (stationsStore.loading && this.state !== null) {
      return {
        originText: this.state.originText,
        destinationText: this.state.destinationText
      };
    } else {
      return {
        originText: stationsStore.origin,
        destinationText: stationsStore.destination
      };
    }
  },
  getTime: function() {
    var d = new Date();
    var n = d.toTimeString();

    return n.slice(0, 5);
  },
  componentWillMount: function() {
    // Move the props from the router into the state for this component.
    this.state.from = this.props.from;
    this.state.to = this.props.to;
    this.state.type = this.props.type;
    this.state.time = this.props.time ? this.props.time : this.getTime();
  },
  componentDidMount: function() {
    if (this.refs.destinationSuggest !== undefined && this.refs.destinationSuggest.state.value === "") {
      this.refs.destinationSuggest.setState({value: this.state.destinationText});
    }
    if (this.refs.originSuggest !== undefined && this.refs.originSuggest.state.value === "") {
      this.refs.originSuggest.setState({value: this.state.originText});
    }
  },
  suggestions: function(input, callback) {
    console.log('searching for ' + input);
    $.getJSON('http://localhost:8080/Locations/' + encodeURIComponent(input), function(json) {
      callback(null, json.locations);
    })
    .fail( function() {
      callback(new Error("Couldn't get autocomplete"));
    });

  },
  suggestionRenderer: function(suggestion, input) {
    return (
      <div className="row">
        <div className="col-sm-1">
          <img src="/img/nr.png"/>
        </div>
        <div className="col-sm-11">
          <span>{ suggestion.name + " [" + suggestion.user_code + "]"}</span>
        </div>
      </div>
    );
  },
  suggestionValue: function(suggestionObj) {
    return suggestionObj.name + " [" + suggestionObj.user_code + "]";
  },
  onOriginChange: function(value) {
    if (value === "") {
      this.setState({from: null});
      this.setState({originText: ""});
    }
  },
  onDestinationChange: function(value) {
    if (value === "") {
      this.setState({to: null});
      this.setState({destinationText: ""});
    }
  },
  onOriginSelected: function(suggestion, event) {
    event.preventDefault();
    if (suggestion !== null) {
      this.setState({from: suggestion.user_code});
      this.setState({originText: suggestion.name + " [" + suggestion.user_code + "]"});
    }
  },
  onDestinationSelected: function(suggestion, event) {
    event.preventDefault();
    if (suggestion !== null) {
      this.setState({to: suggestion.user_code});
      this.setState({destinationText: suggestion.name + " [" + suggestion.user_code + "]"});
    }
  },
  render: function() {
    return (
      <div className="section" id="start">
        <Panel className="InputsPanel">
          <form className="form-horizontal">
             <div className="form-group">
               <label className="control-label col-sm-1" htmlFor='originAutoSuggest'>From</label>
               <AutoSuggest suggestions={this.suggestions}
                     suggestionRenderer={this.suggestionRenderer}
                     suggestionValue={this.suggestionValue}
                     onSuggestionSelected={this.onOriginSelected}
                     inputAttributes={{
                        className: "col-sm-12 form-control",
                        id: "originAutoSuggest",
                        onChange: this.onOriginChange,
                        value: this.state.originText
                     }}
                     ref="originSuggest"
                                      />
            </div>
            <div className="form-group">
               <label className="control-label col-sm-1" htmlFor='destinationAutoSuggest'>To</label>
               <AutoSuggest suggestions={this.suggestions}
                     suggestionRenderer={this.suggestionRenderer}
                     suggestionValue={this.suggestionValue}
                     onSuggestionSelected={this.onDestinationSelected}
                     inputAttributes={{
                        className: "col-sm-12 form-control",
                        id: "destinationAutoSuggest",
                        onChange: this.onDestinationChange,
                        value: this.state.destinationText
                     }}
                     ref="destinationSuggest"
                                    />
            </div>
            <div className="row">
              <div className="col-xs-4">
                <Input type="select"
                       ref="typeInput"
                       label="Type"
                       valueLink={this.linkState('type')}
                       labelClassName="col-sm-3"
                       wrapperClassName="col-sm-9">
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                </Input>
              </div>
              <div className="col-xs-3">
                <Input type="text"
                       ref="timeInput"
                       label="Time"
                       valueLink={this.linkState('time')}
                       labelClassName="col-sm-4"
                       wrapperClassName="col-sm-8"/>
              </div>
              <div className="col-xs-4 col-xs-offset-1">
                  <ButtonInput id="findTrains" wrapperClassName="col-sm-6 btn-block" style={{width: "100%"}} type="submit" onClick={this.handleSubmit}>Find Trains</ButtonInput>
              </div>
            </div>
          </form>
        </Panel>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var fromInput = this.state.from ? this.state.from : "_";
    var toInput = this.state.to ? this.state.to : "_";
    var typeInput = this.refs.typeInput.getValue();
    var timeInput = this.refs.timeInput.getValue();
    this.setState({originText: this.refs.originSuggest.state.value})
    this.setState({destinationText: this.refs.destinationSuggest.state.value})
    console.log(fromInput + " " + toInput + " " + typeInput + " " + timeInput + " ");
    this.transitionTo('trainsGrid', {from: fromInput, to: toInput, type: typeInput, time: timeInput});
  },

  componentWillReceiveProps: function(nextProps) {
    // Received new props from the router. Need to update the state of the component.
    this.state.from = nextProps.from;
    this.state.to = nextProps.to;
    this.state.type = nextProps.type;
    this.state.time = nextProps.time ? nextProps.time : this.state.time;
    if (this.refs.destinationSuggest !== undefined && this.refs.destinationSuggest.state.value === "") {
      this.refs.destinationSuggest.setState({value: this.state.destinationText});
    }
    if (this.refs.originSuggest !== undefined && this.refs.originSuggest.state.value === "") {
      this.refs.originSuggest.setState({value: this.state.originText});
    }
  },
  componentDidUpdate: function(prevProps, nextProps) {
    this.refs.originSuggest.setState({value: this.state.originText});
    this.refs.destinationSuggest.setState({value: this.state.destinationText});
  }

});

module.exports = TrainInputs;
