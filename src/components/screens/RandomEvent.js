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
    this.getEventToDisplay()
    this.state = {
      start: '',
      end: '',
      timeLeft: '',
      msRemaining: '',
      open: true,
      haveAllVotes: false,
      eventId: ''
    }
  }
  
  componentWillMount() {
    this.getTimeNow()
  }

  componentDidMount = async () => {
    // this.getTimeNow()
    this.timer = setInterval(() => this._updateTime(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  getTimeNow = () => {
    const createdAt = this.props.screenProps.notification.data.data.data.createdAt.toString();
    let start = new Date(createdAt);
    start = new Date(start.getTime() + this.props.campaign.timezone*3600000);
    const then = new Date(start.getTime() + 15*60000)
    const localTime = Date.now()
    const msRemaining = then.getTime() - localTime
    this.setState({ start: start, end: then, msRemaining: msRemaining})
  }

  _updateTime = () => {
    let newMs = this.state.msRemaining
    newMs -= 1000;
    this.setState({ msRemaining: newMs })
    // let timeLeft = this.state.timeLeft
    // const createdAt = this.props.screenProps.notification.data.data.data.createdAt;
    // const now = new Date(createdAt)
    // const msRemaining = this.state.end.getTime() - now.getTime()
    if (this.state.msRemaining <= 0) { 
      timeLeft = '00:00'
      this.setState({ open: false })
    }
    else {
      const minutes = Math.floor(this.state.msRemaining / 60000);
      const seconds = Math.floor((this.state.msRemaining % 60000) / 1000);
      const minStr = (minutes < 10) ? `0${minutes}` : `${minutes}`;
      const secStr = (seconds < 10) ? `0${seconds}` : `${seconds}`;
      timeLeft = `${minStr}:${secStr}`
    }
    this.setState({ timeLeft })
  }

  getEventToDisplay = async (props) => {
    const evtNumber = this.props.screenProps.notification.data.data.data.eventNumber
    this.eventId = this.props.screenProps.notification.data.data.data.eventId
    this.evt = events[evtNumber-1]
    this.props.dispatch({ type: c.NEW_EVENT, event: this.evt})
  }

  _timerDisplay = () => {
    if (this.state.timeLeft == '') {
      return "  "
    } else {
      return `Voting Ends In ${this.state.timeLeft}`
    }
  }

  _vote = (opt) => {
    const OPTIONS = {
      A: `You voted for ${this.evt.optionAButton}`,
      B: `You voted for ${this.evt.optionBButton}`
    }
    console.log("opt in voting", opt)
    this.props.dispatch({ 
      type: c.CAST_VOTE, 
      playerId: this.props.player.id, 
      eventId: this.eventId,
      vote: opt,
    })
    this.updateCompletedEvents()
    this.setState({ open: false })
    this.props.navigation.navigate('CampaignSummary')
  }

  updateCompletedEvents = () => {
    let newCompletedArray = [...this.props.campaign.completedEvents]
    newCompletedArray.push(this.evt.id)
    console.log('newCompletedArray', newCompletedArray)
    this.props.dispatch({ type: c.RECEIVED_EVENT, campId: this.props.campaign.id, completedEvents: newCompletedArray })
  }

  render() {
    return (
      <EventDisplay backgroundImage={this.props.screenProps.backgroundImage}
        onVote={(opt) => this._vote(opt)}
        timeLeft={this.state.timeLeft}
        antecedent={this.evt.antecedent}
        optionAButton={this.evt.optionAButton}
        optionBButton={this.evt.optionBButton}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    player: state.player,
    currentEvent: state.event
  }
}

export default connect(mapStateToProps)(RandomEvent);