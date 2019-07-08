import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, events } = constants;

import EventResultDisplay from '../ui/EventResultDisplay'

class RandomEventResult extends React.Component {

  constructor(props) {
    super(props)
    this.getEventResult()
    this.state = {
    }
  }

  getEventResult = () => {
    const data = this.props.screenProps.notification.data.data.data
    console.log("RESULT", data.result)
    this.result = data.result
    this.playerVotes = data.playerVotes
    this.evt = events[data.eventId-1]
    console.log("playervoteobject", data.playerVotes)
  }

  checkResultToShow = () => {
    this.result === 'A' ? this.resultText = this.evt.optionAText : this.resultText = this.evt.optionBText;
    this.result === 'A' ? this.resultHeader = this.evt.optionAButton : this.resultHeader = this.evt.optionBButton;
  }

  render() {
    this.checkResultToShow()
    return (
      <EventResultDisplay backgroundImage={this.props.screenProps.backgroundImage}
        resultText={this.resultText} resultHeader={this.resultHeader}
        playerVotes={this.playerVotes}
      />
    )
  }
}


function mapStateToProps(state) {
  return {
    steps: state.steps,
    campaign: state.campaign,
    player: state.player,
    currentEvent: state.event
  }
}

export default connect(mapStateToProps)(RandomEventResult);