import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EventParticipation from './EventParticipation';
import { connect } from 'react-redux';

class EventStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch, campaign } = this.props;
    
    dispatch({type: "FETCH_EVENT_INFO", campaignId: campaign.id});
  }

  render() {
    return (
      <View>
        <EventParticipation events={this.props.events}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return({ campaign : state.campaign, events: state.event.events });
}

export default connect(mapStateToProps)(EventStats);