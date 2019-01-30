import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";


export default class PedometerSensorTester extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this._updateStepCounts();
  }

  componentDidUpdate() {
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

  _updateStepCounts = () => {
    //set dates for today
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(6,0,0,0);
    todayEnd.setHours(24,0,0,0);
    //query pedometer for today's date range
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

        console.log('104: ' + result.steps.toString());
        await this._storeData('yesterdayStepCountStorage', result.steps.toString());

        console.log('106: ' + this._retrieveData('yesterdayStepCountStorage'));
        this.setState({
          yesterdayStepCount: parseInt(await this._retrieveData('yesterdayStepCountStorage'), 10),
        });
        console.log('110: state set to ' + this.state.yesterdayStepCount);


      },
      error => {
        this.setState({
          yesterdayStepCount: "Could not get stepCount: " + error
        });
      }
    );
  }

  async _storeData(keyString, valueString) {
    try {
      await AsyncStorage.setItem(keyString, valueString);
      console.log('127: ' + keyString + ' saved as ' + valueString);
    } catch (error) {
      // Error saving data
      console.log('130: ' + keyString + ' data could not be saved');
    }
  }

  async _retrieveData(keyString) {
    try {
      const value = await AsyncStorage.getItem(keyString);
      if (value !== null) {
        // We have data!!
        console.log(keyString + ' retrieved as ' + value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
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
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
