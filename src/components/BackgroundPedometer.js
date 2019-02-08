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
// const { campaignDateArray } = this.props.steps;
// // const { dispatch } = this.props;
// const action = type => dispatch({ type })

class BackgroundPedometer extends React.Component {

  constructor(props) {
    super(props);
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  componentWillMount() {
    const { campaignDateArray } = this.props.steps;
    if (campaignDateArray === null) {
      this._constructDateLog();
    }
  }

  // onGetSpell={() => action('GET_SPELL')

  componentDidMount() {
    const { dispatch } = this.props;

    AppState.addEventListener('change', this._handleAppStateChange);
//======================
    Pedometer.isAvailableAsync().then(
      (result) => {
        // dispatch an action to the store to update state
        console.log('\'dometer is available? ',result);
      }, (error) => {
        // dispatch an action to the store to update state
        console.log('\'dometer not available');
      }
    );
//======================
    // this is very dumb; it must be changed
    setTimeout(() => {
      dispatch({type: c.GET_STEPS});
    }, 10);
//======================
    setInterval(() => {
      if (this.props.appState === 'active') {
        //dispatch action instead
        // /*this needs to dispatch an action instead --> */this._updateCampaignStepCounts();
        dispatch({type: c.GET_STEPS});
      }
    }, 60000);
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

// probably get rid of this no matter what
  _logState = () => {
    setTimeout(() => {
      console.log(this.props);

    }, 10);
  }


  _constructDateLog = () => {
    const { dispatch } = this.props; // replace dispatch with put?
    //these are placeholders
    const campaignStartDate = new Date('January 25, 2019 06:00:00');
    const campaignLength = 15

    //these can stay exactly as-is, i think
    const day1Start = new Date(campaignStartDate);
    const day1End = new Date(campaignStartDate);
    day1Start.setHours(6,0,0,0);
    day1End.setHours(24,0,0,0);

    dispatch(setCampaignDates(day1Start, day1End, campaignLength)); // replace dispatch with put?
  }


  _handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // /*this needs to dispatch an action instead --> */this._updateCampaignStepCounts();
      dispatch({type: c.GET_STEPS})
    }
    dispatch(setAppState(nextAppState));
  };


  async _storeData(keyString, valueString) {
    try {
      await AsyncStorage.setItem(keyString, valueString);
    } catch (error) {
      console.log(keyString + ' data could not be saved - ' + error);
    }
  }


  async _retrieveData(keyString) {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(keyString + ' data could not be retrieved - ' + error);
    }
  }


  render() {
    return null;
  }

  // store.subscribe(render) // this might be needed but i can't tell yet
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: '50%',
    width: '100%',
    marginTop: 20,
  },
});


function mapStateToProps(state) {
  return {
    appState: state.appState,
    steps: state.steps,
  }
}


export default connect(mapStateToProps)(BackgroundPedometer);
