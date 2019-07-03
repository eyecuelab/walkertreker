import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import EventDisplay from '../ui/EventDisplay'
import EventResultDisplay from '../ui/EventResultDisplay'
import DayCounter from '../ui/DayCounter';

class RandomEvent extends React.Component {

  constructor(props) {
    super(props)
    this.getEventToDisplay()
    const now = new Date();
    const then = new Date(now.getTime() + 15*60000) // 15 minutes from now
    this.state = {
      start: now,
      end: then,
      timeLeft: '',
      active: true,
      haveAllVotes: false
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this._updateTime(), 1000)
    console.log("SCREEN PROPS", this.props.screenProps.notification.data.data.data.eventID)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  _updateTime = () => {
    let timeLeft = this.state.timeLeft
    const now = new Date()
    const msRemaining = this.state.end.getTime() - now.getTime()
    if (msRemaining <= 0) { 
      timeLeft = '00:00'
      this.setState({ active: false })
    }
    else {
      const minutes = Math.floor(msRemaining / 60000);
      const seconds = Math.floor((msRemaining % 60000) / 1000);
      const minStr = (minutes < 10) ? `0${minutes}` : `${minutes}`;
      const secStr = (seconds < 10) ? `0${seconds}` : `${seconds}`;
      timeLeft = `${minStr}:${secStr}`
    }
    this.setState({ timeLeft })
  }

  getEventToDisplay = async (props) => {
    const evtId = this.props.screenProps.notification.data.data.data.eventID
    this.evt = events[evtId-1]
    this.props.dispatch({ type: c.NEW_EVENT, event: this.evt})
  }

  _timerDisplay = () => {
    if (this.state.timeLeft == '') {
      return "  "
    } else {
      return `Voting Ends In ${this.state.timeLeft}`
    }
  }

  _vote(opt) {
    const OPTIONS = {
      A: `You voted for ${this.evt.optionAButton}`,
      B: `You voted for ${this.evt.optionBButton}`
    }
    console.log("option in voting", OPTIONS[opt])
    this.updateCompletedEvents()
    this.setState({ active: false })
    // this.props.navigation.navigate('CampaignSummary')
  }

  updateCompletedEvents = () => {
    let newCompletedArray = [...this.props.campaign.completedEvents]
    newCompletedArray.push(this.evt.id)
    console.log('newCompletedArray', newCompletedArray)
    this.props.dispatch({ type: c.RECEIVED_EVENT, campId: this.props.campaign.id, completedEvents: newCompletedArray })
  }

  render() {
    if (this.state.active) {
      return (
        <EventDisplay backgroundImage={this.props.screenProps.backgroundImage}
          onVote={(opt) => this._vote(opt)}
          timeLeft={this.state.timeLeft}
          antecedent={this.evt.antecedent}
          optionAButton={this.evt.optionAButton}
          optionBButton={this.evt.optionBButton}
        />
      );
    } else {
      return (
        <EventResultDisplay backgroundImage={this.props.screenProps.backgroundImage}
          event={this.evt}
        />
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    currentEvent: state.event
  }
}

export default connect(mapStateToProps)(RandomEvent);
