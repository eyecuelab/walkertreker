import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import constants from "../../constants";

import EventResultDisplay from "../ui/EventResultDisplay";

const { c, events, item } = constants;

class RandomEventResult extends React.Component {
  constructor(props) {
    super(props);
    this.getEventResult();
    this.formatInventory();
    this.state = {};
  }

  componentDidMount() {
    this.resolveEventConsequences();
    this.updateJournal();
  }

  updateInventory = async (inven, invenItem, type) => {
    const { dispatch } = this.props;
    const { data } = this.props.screenProps.notification.data.data;
    if (inven && inven > 0) {
      const itemNumber =
        type === "food" // eslint-disable-line no-nested-ternary
          ? Math.floor(Math.random() * item.foodArray.length)
          : type === "med" // eslint-disable-line no-nested-ternary
          ? Math.floor(Math.random() * item.medicineArray.length)
          : type === "weapon"
          ? Math.floor(Math.random() * item.weaponArray.length)
          : null;

      dispatch({
        type: c.RECEIVE_INVENTORY,
        source: "event",
        sourceId: data.eventId,
        itemType: type,
        itemNumber,
        campaignId: this.props.campaign.id
      });
    } else if (inven && inven < 0 && invenItem.length) {
      const index = await Math.floor(Math.random() * invenItem.length);

      dispatch({
        type: c.USE_INVENTORY,
        inventoryId: invenItem[index][1],
        user: "event",
        userId: data.eventId
      });
    }
  };

  formatInventory = () => {
    this.foodItems = [];
    this.medicineItems = [];
    this.weaponItems = [];
    this.props.campaign.inventories.forEach(invenObj => {
      if (invenObj.used === false) {
        invenObj.itemType === "food" // eslint-disable-line
          ? this.foodItems.push([invenObj.itemNumber, invenObj.id])
          : invenObj.itemType === "med" // eslint-disable-line no-nested-ternary
          ? this.medicineItems.push([invenObj.itemNumber, invenObj.id])
          : invenObj.itemType === "weapon"
          ? this.weaponItems.push([invenObj.itemNumber, invenObj.id])
          : null;
      }
    });
  };

  resolveEventConsequences = () => {
    const result =
      this.result === "A" ? this.evt.optionAResult : this.evt.optionBResult;

    const newPlayerObj = { ...this.props.player };
    const { currentDay } = this.props.campaign;

    this.updateInventory(result.food, this.foodItems, "food");
    this.updateInventory(result.meds, this.medicineItems, "med");
    this.updateInventory(result.weapons, this.weaponItems, "weapon");

    result.stepTarget // eslint-disable-line
      ? (newPlayerObj.stepTargets[currentDay] +=
          newPlayerObj.stepTargets[currentDay] * result.stepTarget)
      : newPlayerObj;

    result.health // eslint-disable-line
      ? (newPlayerObj.health = newPlayerObj.health + result.health) // eslint-disable-line
      : null;

    this.props.dispatch({
      type: c.UPDATE_PLAYER,
      playId: newPlayerObj.id,
      health: newPlayerObj.health,
      stepTargets: newPlayerObj.stepTargets,
      player: newPlayerObj
    });
  };

  updateJournal = () => {
    const eventEntry = `${this.evt.antecedent}//${this.resultText}`;
    const { journalId } = this.props.screenProps.notification.data.data.data;
    this.props.dispatch({
      type: c.UPDATE_JOURNAL,
      journalId,
      entry: eventEntry,
      votingList: this.votesList
    });
  };

  getEventResult = () => {
    const { data } = this.props.screenProps.notification.data.data;
    this.result = data.result;

    this.evt = events[data.eventId - 1];

    const playerVotes = Object.assign(
      {},
      ...Object.keys(data.playerVotes).map(key => ({
        [key]:
          data.playerVotes[key] === "A"
            ? this.evt.optionAButton
            : this.evt.optionBButton
      }))
    );
    const votesList = [];
    Object.entries(playerVotes).forEach(([key, value], index) => {
      votesList.push(`${key} voted to ${value}`);
    });
    this.votesList = votesList;
    return null;
  };

  navigateBack = () => {
    this.props.navigation.navigate("Campaign");
  };

  checkResultToShow = () => {
    this.result === "A"
      ? (this.resultText = this.evt.optionAText)
      : (this.resultText = this.evt.optionBText);
    this.result === "A"
      ? (this.resultHeader = this.evt.optionAButton)
      : (this.resultHeader = this.evt.optionBButton);
  };

  render() {
    this.checkResultToShow();
    return (
      <EventResultDisplay
        backgroundImage={this.props.screenProps.backgroundImage}
        resultText={this.resultText}
        resultHeader={this.resultHeader}
        playerVotes={this.playerVotes}
        navigateBack={this.navigateBack}
        votesList={this.votesList}
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
  };
}

export default connect(mapStateToProps)(RandomEventResult);
