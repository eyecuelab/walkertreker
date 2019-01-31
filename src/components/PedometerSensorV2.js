import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, AppState } from "react-native";


export default class PedometerSensorV2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isPedometerAvailable: "checking",
      todayStepCount: 0,
      yesterdayStepCount: 0,
      currentStepCount: 0
    };
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }

  componentDidMount() {
    this._subscribe();
    AppState.addEventListener('change', this._handleAppStateChange);
    this._updateStepCounts();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {

        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(6,0,0,0);
    todayEnd.setHours(24,0,0,0);

    Pedometer.getStepCountAsync(todayStart, todayEnd).then(
      result => {
        this.setState({ todayStepCount: result.steps });
      },
      error => {
        this.setState({
          todayStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._updateStepCounts();
    }
    this.setState({appState: nextAppState});
  };

  _updateStepCounts = () => {
    this._updateStepCountsYesterday();
    this._updateStepCountsToday();
  }

  _updateStepCountsToday = () => {

    //set dates for today
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(6,0,0,0);
    todayEnd.setHours(24,0,0,0);
    //query pedometer for today's date range
    Pedometer.getStepCountAsync(todayStart, todayEnd).then(
      async (result) => {
        // if we have today's step total from the pedometer, we store it in AsyncStorage
        console.log('today\'s pedometer total is ' + result.steps.toString());
        await this._storeData('todayStepCountStorage', result.steps.toString());
        // now that it's been stored, we retrieve it and set is as the todayStepCount state value
        this.setState({
          todayStepCount: parseInt(await this._retrieveData('todayStepCountStorage'), 10),
        });
        console.log('todayStepCount state set to ' + this.state.todayStepCount);
        // return this.state.todayStepCount;
      },
      error => {
        // if we have an error, state shows the error
        this.setState({
          todayStepCount: "Could not get stepCount: " + error
        });
      }
    );
  }

  _updateStepCountsYesterday = () => {

    //set dates for yesterday
    const yesterdayStart = new Date();
    const yesterdayEnd = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayStart.setHours(6,0,0,0);
    yesterdayEnd.setHours(24,0,0,0);

    //query pedometer for yesterday's date range
    Pedometer.getStepCountAsync(yesterdayStart, yesterdayEnd).then(
      async (result) => {
        // if we have yesterday's step total from the pedometer, we store it in AsyncStorage
        console.log('yesterday\'s pedometer total is ' + result.steps.toString());
        await this._storeData('yesterdayStepCountStorage', result.steps.toString());
        // now that it's been stored, we retrieve it and set is as the yesterdayStepCount state value
        this.setState({
          yesterdayStepCount: parseInt(await this._retrieveData('yesterdayStepCountStorage'), 10),
        });
        console.log('yesterdayStepCount state set to ' + this.state.yesterdayStepCount);
        // return this.state.yesterdayStepCount;
      },
      error => {
        // if we have an error, state shows the error
        this.setState({
          yesterdayStepCount: "Could not get stepCount: " + error
        });
      }
    );
  }

  async _storeData(keyString, valueString) {
    try {
      await AsyncStorage.setItem(keyString, valueString);
      console.log(keyString + ' saved as ' + valueString);
    } catch (error) {
      console.log(keyString + ' data could not be saved');
    }
  }

  async _retrieveData(keyString) {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        console.log(keyString + ' retrieved as ' + value);
        return value;
      }
    } catch (error) {
      console.log(keyString + ' data could not be retrieved');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken today: {this.state.todayStepCount}
        </Text>
        <Text>
          Steps taken yesterday: {this.state.yesterdayStepCount}
        </Text>
      </View>
    );
  }
}
// <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
