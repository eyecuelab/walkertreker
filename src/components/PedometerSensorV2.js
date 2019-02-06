import React from "react";
import Expo from "expo";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState, ScrollView, Button, Alert } from "react-native";
import { connect } from 'react-redux';

import * as actions from '../actions';
const { setAppState, setCampaignDates, setCampaignSteps } = actions;

class PedometerSensorV2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      campaignLength: 15, /*this should not be static; it should be informed by actual campaign length*/
      campaignStartDate: new Date('January 25, 2019 06:00:00'), /*this needs to not be a static value; it should be informed by the actual campaign start date*/
      campaignDateArray: null, /*this should only be null at start*/
    };
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }


  componentWillMount() {
    if (this.props.campaignDateArray === null) {
      this._constructDateLog();
    }
  }


  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    Pedometer.isAvailableAsync().then(
      (result) => {
        console.log('dometer is available? ',result);
      }, (error) => {
        console.log('dometer not available');
      }
    );

    setTimeout(() => {
      this._updateCampaignStepCounts();
    }, 10);

    setInterval(() => {
      if (this.props.appState === 'active') {
        this._updateCampaignStepCounts();
      }
    }, 60000);
    // Pedometer.getStepCountAsync(new Date(2019-01-31T14:00:00.000Z), new Date(2019-02-01T08:00:00.000Z)).then(
    //   (result) => {
    //     console.log(result.steps);
    //   }, (error) => {
    //     console.log('dometer hates you');
    //   }
    // );
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }


  _logState = () => {
    setTimeout(() => {
      console.log(this.props);

    }, 10);
  }


  _constructDateLog = () => {
    const { dispatch } = this.props;
    const { campaignStartDate, campaignLength } = this.state; /* this will need to come from state set by previous screens */

    //these can stay exactly as-is, i think
    const day1Start = new Date(campaignStartDate);
    const day1End = new Date(campaignStartDate);
    day1Start.setHours(6,0,0,0);
    day1End.setHours(24,0,0,0);

    dispatch(setCampaignDates(day1Start, day1End, campaignLength));
  }


  _handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('handle app state change hit the if');
      this._updateCampaignStepCounts();
    }
    dispatch(setAppState(nextAppState));
  };


  _updateCampaignStepCounts = () => {

    const { campaignDateArray, dispatch} = this.props;
    const campaignDateArrayCopy = JSON.parse(JSON.stringify(campaignDateArray))

    // UN-COMMENT THIS LATER; THIS IS GOOD CODE I THINK:

    campaignDateArrayCopy.forEach((obj, index) => {
      console.log(' in loop start: ', Date.parse(obj.start));
      // console.log('end: ', obj.end);
      // things get to here, and then never hit the pedometer code below...

      Pedometer.getStepCountAsync(new Date(Date.parse(obj.start)), new Date(Date.parse(obj.end))).then(

        (result) => {
          console.log(result.steps);
          this._storeData('day' + (index + 1) + 'StepCountStorage', result.steps.toString());
          const stepsToAdd = {
            steps: parseInt(this._retrieveData('day' + (index + 1) + 'StepCountStorage'), 10)
          }
          console.log('steps to add: ',stepsToAdd);
          const dateWithSteps = Object.assign({}, campaignDateArrayCopy[index], stepsToAdd);
          campaignDateArrayCopy.splice(index, 1, dateWithSteps);

          // console.log(campaignDateArrayCopy);

          //HERE THERE BE OLD CODE!  convert to redux, plz

          // this.setState({
          //   campaignDateArray: campaignDateArrayCopy
          // });
        },  //end of result block
        (error) => {
          console.log('error retrieving pedometer data at campaign day ' + (index + 1) + ' in _updateCampaignStepCounts');
        }
      ); //end of then
    }); //end of forEach
    // console.log('copy: ',campaignDateArrayCopy);
    dispatch(setCampaignSteps(campaignDateArrayCopy));
  }


  async _storeData(keyString, valueString) {
    try {
      await AsyncStorage.setItem(keyString, valueString);
    } catch (error) {
      console.log(keyString + ' data could not be saved');
    }
  }


  async _retrieveData(keyString) {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(keyString + ' data could not be retrieved');
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Button
          title='click here to update step counts'
          onPress={this._updateCampaignStepCounts} />
          <Button
            title='click here to log props'
            onPress={this._logState} />
      </View>
    );
  }
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


export default connect(mapStateToProps)(PedometerSensorV2);
