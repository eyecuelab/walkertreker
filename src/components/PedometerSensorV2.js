import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState, ScrollView, Button } from "react-native";
import { connect } from 'react-redux';

import { setAppState } from '../actions';
import StepShower from './StepShower'; /* this is not a standing-bath of steps, it is something that shows steps to you... ;) */

class PedometerSensorV2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      campaignLength: 15, /*this should not be static; it should be informed by actual campaign length*/
      campaignStartDate: new Date('January 25, 2019 06:00:00'), /*this needs to not be a static value; it should be informed by the actual campaign start date*/
      campaignDateArray: null, /*this should only be null at start*/
    };
    console.log(this.props);
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
    this._updateCampaignStepCounts();
    setInterval(() => {
      if (this.props.appState === 'active') {
        // console.log('updating steps');
        this._updateCampaignStepCounts();
      }
    }, 60000);
    console.log(this.props.appState);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _constructDateLog = () => {
    const { campaignStartDate, campaignLength } = this.state; /* this will need to come from state set by previous screens */

    //these can stay exactly as-is, i think
    const day1Start = new Date(campaignStartDate);
    const day1End = new Date(campaignStartDate);
    day1Start.setHours(6,0,0,0);
    day1End.setHours(24,0,0,0);





    // // GARBAGE AHEAD!!!
    // // ******
    // for (let i=0; i < campaignLength; i++) {
    //     const start = new Date(day1Start); /* using campaignStartDate directly here caused the app to crash... not sure why*/
    //     const end = new Date(day1End); /* using campaignStartDate directly here caused the app to crash... not sure why*/
    //     dateArray.push({
    //       day: i + 1,
    //       start: new Date(start.setDate(start.getDate() + i)),
    //       end: new Date(end.setDate(end.getDate() + i)),
    //     });
    // }
    // this.setState({
    //   campaignDateArray: dateArray
    // })
    // // ******
    // // GARBAGE BEHIND!!!

  }

  _handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._updateCampaignStepCounts();
    }
    dispatch(setAppState(nextAppState));
  };

  _updateCampaignStepCounts = () => {
    const { campaignDateArray } = this.props;
    const campaignDateArrayCopy = JSON.parse(JSON.stringify(campaignDateArray))

    campaignDateArrayCopy.forEach((obj, index) => {
      Pedometer.getStepCountAsync(new Date(obj.start), new Date(obj.end)).then(
        async (result) => {
          await this._storeData('day' + (index + 1) + 'StepCountStorage', result.steps.toString());
          const stepsToAdd = {
            steps: parseInt(await this._retrieveData('day' + (index + 1) + 'StepCountStorage'), 10)
          }
          const dateWithSteps = Object.assign({}, campaignDateArrayCopy[index], stepsToAdd);
          campaignDateArrayCopy.splice(index, 1, dateWithSteps)
          this.setState({
            campaignDateArray: campaignDateArrayCopy
          });
        },
        error => {
          console.log('error retrieving pedometer data at campaign day ' + (index + 1) + ' in _updateCampaignStepCounts');
        }
      );
    });
  }

  async _storeData(keyString, valueString) {
    try {
      await AsyncStorage.setItem(keyString, valueString);
      // console.log(keyString + ' saved as ' + valueString);
    } catch (error) {
      console.log(keyString + ' data could not be saved');
    }
  }

  async _retrieveData(keyString) {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        // console.log(keyString + ' retrieved as ' + value);
        return value;
      }
    } catch (error) {
      console.log(keyString + ' data could not be retrieved');
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
});

function mapStateToProps(state) {
  return {
    appState: state.appState,
    steps: state.steps,
  }
}

export default connect(mapStateToProps)(PedometerSensorV2);

// <ScrollView>
//   {this.state.campaignDateArray.map((dateObj, index) =>
//     <StepShower day={dateObj.day}
//       start={dateObj.start.toString()}
//       steps={dateObj.steps}
//       key={index} />
//   )}
// </ScrollView>
