import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, events } = constants;

import EventDisplay from '../ui/EventDisplay'

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
    this.timer = setInterval(() => this._updateTime(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  getTimeNow = () => {
    const createdAt = this.props.screenProps.notification.data.data.data.createdAt.toString();

    let start = new Date(createdAt);
    start = new Date(start.getTime());
    const then = new Date(start.getTime() + 15*60000)

    const localTime = Date.now()
    const msRemaining = then.getTime() - localTime

    this.setState({ start: start, end: then, msRemaining: msRemaining})
  }

  _updateTime = () => {
    let newMs = this.state.msRemaining
    newMs -= 1000;
    this.setState({ msRemaining: newMs })
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
    this.props.dispatch({ 
      type: c.CAST_VOTE, 
      playerId: this.props.player.id, 
      eventId: this.eventId,
      vote: opt,
    })
    this.updateCompletedEvents()
    this.setState({ open: false })
    this.props.navigation.navigate('Campaign')
  }

  updateCompletedEvents = () => {
    let newCompletedArray = [...this.props.campaign.completedEvents]
    newCompletedArray.push(this.evt.id)
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
    steps: state.steps,
    campaign: state.campaign,
    player: state.player,
    currentEvent: state.event
  }
}

export default connect(mapStateToProps)(RandomEvent);