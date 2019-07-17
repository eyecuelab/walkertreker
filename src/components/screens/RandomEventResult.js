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
    this.updateJournal()
  }

  updateInventory = (item, invenItem) => {
    const newInven = invenItem
    item ? item > 0 ? newInven.push(item) : newInven.splice(Math.floor(Math.random()*invenItem.length), 1) : null; 
    return newInven
  }

  resolveEventConsequences = () => {
    const result = this.result === 'A' ? this.evt.optionAResult : this.evt.optionBResult;
    let inventory = {...this.props.campaign.inventory}
    let newInventory = {};
    let newPlayerObj = {...this.props.player}
    const currentDay = this.props.campaign.currentDay
    console.log("DAY: ", currentDay);

    newInventory.foodItems = this.updateInventory(result.food, inventory.foodItems);
    newInventory.medicineItems = this.updateInventory(result.meds, inventory.medicineItems);
    newInventory.weaponItems = this.updateInventory(result.weapons, inventory.weaponItems);
    console.log("the new inventory", newInventory)

    result.stepTarget ? newPlayerObj.stepTargets[currentDay] += (newPlayerObj.stepTargets[currentDay]*result.stepTarget): newPlayerObj;

    result.health ? newPlayerObj.health = newPlayerObj.health - result.health : null; 

    this.props.dispatch({ type: c.UPDATE_PLAYER, 
      playId: newPlayerObj.id, 
      health: newPlayerObj.health, 
      stepTargets: newPlayerObj.stepTargets,
      player: newPlayerObj
    })
    this.props.dispatch({ type: c.UPDATE_CAMPAIGN, 
      campId: this.props.campaign.id, 
      inventory: inventory === newInventory ? inventory : newInventory
    })
  }
  
  updateJournal = () => {
    const eventEntry = this.evt.antecedent;
    const journalId = this.props.screenProps.notification.data.data.data.journalId
    this.props.dispatch({ type: c.UPDATE_JOURNAL, 
      journalId: journalId,
      entry: eventEntry,
      votingList: this.votesList,
    })
  }

  getEventResult = () => {
    const data = this.props.screenProps.notification.data.data.data
    this.result = data.result
    this.evt = events[data.eventId-1]
    let playerVotes = 
      Object.assign({}, ...Object.keys(data.playerVotes).map(key => ( 
        {[key]: data.playerVotes[key] === 'A' ? this.evt.optionAButton : this.evt.optionBButton } )));
       let votesList = []
      Object.entries(playerVotes).map(([key, value], index) => {
        votesList.push(`${key} voted to ${value}`)
      })
      console.log("ENTRY LIST", votesList)
      this.votesList = votesList
  }

  navigateBack = () => {
    this.props.navigation.navigate("Campaign");
  }

  checkResultToShow = () => {
    console.log("Result in randomeventresult \n", this.result, this.evt)
    this.result === 'A' ? this.resultText = this.evt.optionAText : this.resultText = this.evt.optionBText;
    this.result === 'A' ? this.resultHeader = this.evt.optionAButton : this.resultHeader = this.evt.optionBButton;
  }

  render() {
    this.checkResultToShow()
    return (
      <EventResultDisplay backgroundImage={this.props.screenProps.backgroundImage}
        resultText={this.resultText} resultHeader={this.resultHeader}
        playerVotes={this.playerVotes} navigateBack = {this.navigateBack} votesList={this.votesList}
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