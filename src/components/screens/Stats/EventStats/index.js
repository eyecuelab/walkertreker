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

  render() {
    console.log(this.props.campaign)
    return (
      <View>
        <EventParticipation events={this.props.events}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return({campaign : state.campaign.players});
}

export default connect(mapStateToProps)(EventStats);
