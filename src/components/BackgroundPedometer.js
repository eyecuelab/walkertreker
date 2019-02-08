import React from "react";
import Expo from "expo";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState, ScrollView, Button, Alert } from "react-native";
import { connect } from 'react-redux';
import { put } from 'redux-saga/effects'

import * as actions from '../actions';
import constants from './../constants';
const { setAppState, setCampaignDates, setCampaignSteps } = actions;
const { c } = constants;

class BackgroundPedometer extends React.Component {

  constructor(props) {
    super(props);
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  componentWillMount() {
    if (this.props.campaignDateArray === null) {
      this._constructDateLog();
    }
  }


  componentDidMount() {
    AppState.addEventListener('change', /*this needs to dispatch an action instead --> */ this._handleAppStateChange);
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
      /*this needs to dispatch an action instead --> */this._updateCampaignStepCounts();
    }, 10);
//======================
    setInterval(() => {
      if (this.props.appState === 'active') {
        //dispatch action instead
        /*this needs to dispatch an action instead --> */this._updateCampaignStepCounts();
      }
    }, 60000);
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', /*this needs to dispatch an action instead --> */this._handleAppStateChange);
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
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      /*this needs to dispatch an action instead --> */this._updateCampaignStepCounts();
    }
    put({type: c.NEW_APP_STATE, appState: nextAppState})
  };


  _updateCampaignStepCounts = () => {

    const { campaignDateArray, dispatch} = this.props; // replace dispatch with put?
    const campaignDateArrayCopy = JSON.parse(JSON.stringify(campaignDateArray))

    // UN-COMMENT THIS LATER; THIS IS GOOD CODE I THINK:

    campaignDateArrayCopy.forEach((obj, index) => {
      console.log(' in loop start: ', Date.parse(obj.start));
      // console.log('end: ', obj.end);
      // things get to here, and then never hit the pedometer code below...

      Pedometer.getStepCountAsync(new Date(Date.parse(obj.start)), new Date(Date.parse(obj.end))).then(

        (result) => {
          //perhaps make this next line dispatch an action?
          this._storeData('day' + (index + 1) + 'StepCountStorage', result.steps.toString());
          const stepsToAdd = {
            steps: parseInt(this._retrieveData('day' + (index + 1) + 'StepCountStorage'), 10)
          }
          const dateWithSteps = Object.assign({}, campaignDateArrayCopy[index], stepsToAdd);
          campaignDateArrayCopy.splice(index, 1, dateWithSteps);
        },  //end of result block

        (error) => {
          console.log('error retrieving pedometer data at campaign day ' + (index + 1) + ' in _updateCampaignStepCounts');
        }

      ); //end of then
    }); //end of forEach
    // console.log('copy: ',campaignDateArrayCopy);
    dispatch(setCampaignSteps(campaignDateArrayCopy)); // replace dispatch with put?
  }


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
    campaignDateArray: state.campaignDateArray,
  }
}


export default connect(mapStateToProps)(BackgroundPedometer);
