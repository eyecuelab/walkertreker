import React from "react";
import Expo from "expo";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState, ScrollView, Button, Alert } from "react-native";
import { connect } from 'react-redux';

import * as actions from '../actions';
import constants from './../constants';

const { setAppState, setCampaignDates } = actions;
const { c, retrieveData } = constants;

class BackgroundPedometer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { campaignDateArray } = this.props.steps;
    // const { startDate } = this.props.campaign;

    // if (
    //   startDate !== null &&
    //   campaignDateArray === null
    // ) {
    //   this._constructDateLog();
    // }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { campaignDateArray } = this.props.steps;
    // const { startDate } = this.props.campaign;

    AppState.addEventListener('change', this._handleAppStateChange);

    this._checkPedometerAvailability();

    setInterval(() => {
      if (
        this.props.appState === 'active' &&
        campaignDateArray !== null
      ) {
        dispatch({type: c.GET_STEPS});
      }
    }, 60000);

    this._getReadyToBuildDateArray()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  // TODO: change this function's name; this is dumb
  _getReadyToBuildDateArray = () => {
    const { campaignDateArray, pedometerIsAvailable } = this.props.steps;
    const { startDate } = this.props.campaign;
    if (
      startDate !== null &&
      campaignDateArray === null &&
      pedometerIsAvailable
    ) {
      console.log('building date array');
      this._constructDateLog();
      if (campaignDateArray !== null) {
        dispatch({type: c.GET_STEPS});
      }
    } else {
      console.log('hit the else');
      setTimeout(() => {
        this._getReadyToBuildDateArray();
      }, 10);
    }
  }

  _checkPedometerAvailability = () => {
    const { dispatch } = this.props;
    Pedometer.isAvailableAsync().then(
      (response) => {
        dispatch({type: c.IS_PEDOMETER_AVAILABLE, pedometerIsAvailable: response});
      }, (error) => {
        // maybe dispatch an action to the store to update state
        Alert.alert('Walker Trekker can\'t connect to your phone\'s pedometer. Try closing the app and opening it again.')
      }
    );
  }

  _constructDateLog = () => {
    const { dispatch } = this.props;
    const { difficultyLevel, length, startDate, stepTargets } = this.props.campaign;

    const stepGoalDayOne = stepTargets[0];
    const day1Start = new Date(startDate);
    const day1End = new Date(startDate);
    day1Start.setHours(6,0,0,0);
    day1End.setHours(24,0,0,0);

    dispatch(setCampaignDates(day1Start, day1End, length, difficultyLevel, stepGoalDayOne));
  }

  _handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    const { campaignDateArray } = this.props.steps;
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active' &&
      campaignDateArray !== null
    ) {
      dispatch({type: c.GET_STEPS})
    }
    dispatch(setAppState(nextAppState));
  };

  render() {
    return null;
  }

} // end of class

function mapStateToProps(state) {
  return {
    appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(BackgroundPedometer);
