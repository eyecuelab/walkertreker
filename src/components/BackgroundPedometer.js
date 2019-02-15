import React from "react";
import Expo from "expo";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState, ScrollView, Button, Alert } from "react-native";
import { connect } from 'react-redux';
import { put } from 'redux-saga/effects'

import * as actions from '../actions';
import constants from './../constants';

const { setAppState, setCampaignDates } = actions;
const { c } = constants;

class BackgroundPedometer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { campaignDateArray } = this.props.steps;
    const { startDate } = this.props.campaign;

    if (
      startDate !== null &&
      campaignDateArray === null
    ) {
      this._constructDateLog();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { campaignDateArray } = this.props.steps;

    AppState.addEventListener('change', this._handleAppStateChange);

    // this is all unnecessary unless the pedometer stops working again. for now i'm gonna have it pop up an alert if the pedometer can't connect
    Pedometer.isAvailableAsync().then(
      (result) => {
        // maybe dispatch an action to the store to update state
        console.log('\'dometer is available');
      }, (error) => {
        // maybe dispatch an action to the store to update state
        Alert.alert('Walker Trekker can\'t connect to your phone\'s pedometer. Try closing the app and opening it again.')
      }
    );

    if (campaignDateArray !== null) {
      dispatch({type: c.GET_STEPS});
    }

    setInterval(() => {
      if (
        this.props.appState === 'active' &&
        campaignDateArray !== null
      ) {
        dispatch({type: c.GET_STEPS});
      }
    }, 60000);

    // this commented-out block was made purely to test functionality.  it can all go away once this works in prod.
    // START
    // dispatch({type: c.FETCH_CAMPAIGN_INFO, id: 'e54490cf-7771-4d63-b788-54f714c00dcf'})
    // dispatch({type: c.SEND_JOIN_CAMPAIGN_REQUEST, playId: 'a83d27dd-1d01-48e0-81be-300798d1f376', campId: 'e54490cf-7771-4d63-b788-54f714c00dcf'})
    // dispatch({type: c.CREATE_PLAYER, name: 'Jimmy Poops', number: '5035550000'})
    // END
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _constructDateLog = () => {
    const { dispatch } = this.props;
    const { difficultyLevel, campaignLength, startDate, stepGoalDayOne } = this.props.campaign;

    // these are placeholders to be actually informed by other state
    // const campaignStartDate = new Date('January 25, 2019 06:00:00');
    // const campaignLength = 15

    // these can stay exactly as-is, i think
    const day1Start = new Date(startDate);
    const day1End = new Date(startDate);
    day1Start.setHours(6,0,0,0);
    day1End.setHours(24,0,0,0);

    dispatch(setCampaignDates(day1Start, day1End, campaignLength, difficultyLevel, stepGoalDayOne));
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

  // STORE/RETRIEVE DATA FUNCTIONS NOW LIVE IN CONSTANTS

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
