import React, { Component } from "react";
import { View } from "react-native";
import EventParticipation from "./EventParticipation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EventStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.events = [];
    const { dispatch, campaign } = this.props;

    dispatch({ type: "FETCH_EVENT_INFO", campaignId: campaign.id });
  }

  render() {
    console.log("state:", this.state);
    console.log("matp state to props event: ", this.props.events);
    return (
      <View>
        <EventParticipation events={this.props.events} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { campaign: state.campaign, events: state.event.events };
};

EventStats.propTypes = {
  events: PropTypes.arrayOf(EventStats),
  campaign: PropTypes.shape()
};

EventStats.defaultProps = {
  events: [],
  campaign: {}
};

export default connect(mapStateToProps)(EventStats);
