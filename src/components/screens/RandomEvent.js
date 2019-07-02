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
import DayCounter from '../ui/DayCounter';

class RandomEvent extends React.Component {

  constructor(props) {
    super(props)
    // hard-coding event info for now, this would presumably come from server and get mapped to these values in state later.
    const evt = events[Math.floor(Math.random() * events.length)];
    const now = new Date();
    const then = new Date(now.getTime() + 15*60000) // 15 minutes from now
    this.state = {
      start: now,
      end: then,
      timeLeft: '',
      antecedent: evt.antecedent,
      optionAButton: evt.optionAButton,
      optionBButton: evt.optionBButton,
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this._updateTime(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  _updateTime = () => {
    let timeLeft = this.state.timeLeft
    const now = new Date()
    const msRemaining = this.state.end.getTime() - now.getTime()
    if (msRemaining <= 0) { timeLeft = '00:00' }
    else {
      const minutes = Math.floor(msRemaining / 60000);
      const seconds = Math.floor((msRemaining % 60000) / 1000);
      const minStr = (minutes < 10) ? `0${minutes}` : `${minutes}`;
      const secStr = (seconds < 10) ? `0${seconds}` : `${seconds}`;
      timeLeft = `${minStr}:${secStr}`
    }
    this.setState({ timeLeft })
  }

  getEventToDisplay = () => {
    // const releventTypeEvents = events.filter(val => !pastEvents.includes(val))
    const evt = events[Math.floor(Math.random() * events.length)];
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
      A: `You voted for ${this.state.optionAButton}`,
      B: `You voted for ${this.state.optionBButton}`
    }
    console.log("option in voting", OPTIONS[opt])
    this.props.navigation.navigate('CampaignSummary')
  }

  render() {
    return (
      <EventDisplay backgroundImage={this.props.screenProps.backgroundImage}
        onVote={(opt) => this._vote(opt)}
        timeLeft={this.state.timeLeft}
        antecedent={this.state.antecedent}
        optionAButton={this.state.optionAButton}
        optionBButton={this.state.optionBButton}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    // player: state.player,
  }
}

export default connect(mapStateToProps)(RandomEvent);
