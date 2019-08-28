import React from "react";
import { Notifications } from "expo";
import { connect } from "react-redux";
import constants from "../constants";
import socket from "../socket";
import NavigationService from "../nav/NavigationService";

const { c, navigation } = constants;

class NotificationListeners extends React.Component {
  // NOTIFICATION TYPES
  // endOfDayUpdate: navigate to end of day summary screen
  // campaignStarted: the campaign has started, want to update state, send push notification and navigate to campaign summary screen
  // campaignDeleted: the campaign creator has ended the game, want to blank that slice of state, send a push notification and navigate to the about screen
  // campaignIsLost: the players have lost, navigate to a post mortem screen, send push notification
  // campaignIsWon: the players have survived, navigate to post morten screen, send push notification
  // randomEventStart: a random in-game event has fired, we want to send a push notification and navigate to the appropriate screen
  // randomEventEnd: the event has ended, want to send a push notification
  // noPlayerSteps: no navigation, just ask player to open the app to update steps
  // hungerAlert: no navigation, alert player that they are under 20 hunger and need to eat

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification(notification) {
    console.log("notification listener", notification);
    const { type } = notification.data;
    const route = navigation[type];
    if (route !== "none") {
      const data = notification.data.data ? notification.data.data : {};
      NavigationService.navigate(route, { data });
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign
  };
}

export default connect(mapStateToProps)(NotificationListeners);
