import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Alert } from "react-native";

export default class PedometerSensor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 1,
      yesterdayStartDate: 'poop',
      yesterdayEndDate: 'poop'
    };
  }

  componentDidMount() {
    this._subscribe();
    const { currentStepCount } = this.state;
    // setInterval(function () {
    //   if (currentStepCount) {
    //     console.log(currentStepCount);
    //   }
    // }, 900000);

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

    const yesterdayEnd = new Date();
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayEnd.getDate() - 1);
    yesterdayStart.setHours(6,0,0,0);
    yesterdayEnd.setHours(24,0,0,0);

    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(6,0,0,0);
    todayEnd.setHours(24,0,0,0);

    this.setState({
      yesterdayStartDate: yesterdayStart,
      yesterdayEndDate: yesterdayEnd,
      todayStartDate: todayStart,
      todayEndDate: todayEnd,
    })
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>start: {this.state.yesterdayStartDate.toString()}</Text>
        <Text>end: {this.state.yesterdayEndDate.toString()}</Text>
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        <Text>yesterdayStartDate: {this.state.yesterdayStartDate}</Text>
        <Text>yesterdayEndDate: {this.state.yesterdayEndDate}</Text>
        <Text>todayStartDate: {this.state.todayStartDate}</Text>
        <Text>todayEndDate: {this.state.todayEndDate}</Text>
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
