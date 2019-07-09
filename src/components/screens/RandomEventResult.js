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

  componentDidMount() {
    this.resolveEventConsequences()
  }

  updateInventory = (item, invenItem) => {
    item ? item > 0 ? invenItem.push(item) : invenItem.splice(Math.floor(Math.random()*invenItem.length), 1) : null; 
  }

  resolveEventConsequences = () => {
    
    const result = this.result === 'A' ? this.evt.optionAResult : this.evt.optionBResult;
    let newInventory = {...this.props.campaign.inventory}
    let newPlayerObj = {...this.props.player}
    const currentDay = this.props.campaign.currentDay
    console.log(currentDay);

    this.updateInventory(result.food, newInventory.foodItems);
    this.updateInventory(result.meds, newInventory.medicineItems);
    this.updateInventory(result.weapons, newInventory.weaponItems);
    console.log(newInventory)

    result.stepTarget ? newPlayerObj.stepTargets[currentDay] += (newPlayerObj.stepTargets[currentDay]*result.stepTarget): newPlayerObj;

    result.health ? newPlayerObj.health - result.health : null; 

    this.props.dispatch({ type: c.UPDATE_PLAYER, 
      playId: newPlayerObj.id, 
      health: newPlayerObj.health, 
      stepTargets: newPlayerObj.stepTargets,
      player: newPlayerObj
    })
    this.props.dispatch({ type: c.UPDATE_CAMPAIGN, 
      campId: this.props.campaign.id, 
      inventory: newInventory
    })
  }

  getEventResult = () => {
    const data = this.props.screenProps.notification.data.data.data
    this.result = data.result
    this.evt = events[data.eventId-1]
    let playerVotes = 
      Object.assign({}, ...Object.keys(data.playerVotes).map(key => ( 
        {[key]: data.playerVotes[key] === 'A' ? this.evt.optionAButton : this.evt.optionBButton } )));
    this.playerVotes = playerVotes
  }

  navigateBack = () => {
    this.props.navigation.goBack();
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
        playerVotes={this.playerVotes} navigateBack = {this.navigateBack}
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