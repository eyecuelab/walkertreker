import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button } from "react-native";

export default class PedometerSensor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yesterdayStepCount: 0,
      todayStepCount: 'i am not working',
      dynamicStepCount: 'nothing yet...',
      isPedometerAvailable: "pending...",
      yesterdayStartDate: 'pending...',
      yesterdayEndDate: 'pending...',
      todayStartDate: 'pending...',
      todayEndDate: 'pending...',
    };
  }

  componentDidMount() {
    this._subscribe();
  }

  componentDidUpdate() {
    const yesterdayStart = new Date();
    const yesterdayEnd = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayStart.setHours(6,0,0,0);
    yesterdayEnd.setHours(24,0,0,0);

    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(6,0,0,0);
    todayEnd.setHours(24,0,0,0);

    // get yesterday's steps
    Pedometer.getStepCountAsync(yesterdayStart, yesterdayEnd).then(
      result => {
        this.setState({ yesterdayStepCount: result.steps });
      },
      error => {
        this.setState({
          yesterdayStepCount: "Could not get stepCount: " + error
        });
      }
    );

    // get today's steps:
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
    console.log('hello');
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        dynamicStepCount: result.steps
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

    const yesterdayStart = new Date();
    const yesterdayEnd = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
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

    Pedometer.getStepCountAsync(yesterdayStart,yesterdayEnd).then(
      result => {
        this.setState({ yesterdayStepCount: result.steps });
      },
      error => {
        this.setState({
          yesterdayStepCount: "Could not get stepCount: " + error
        });
      }
    );

    // get today's steps:
    Pedometer.getStepCountAsync(todayStart,todayEnd).then(
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

  // _checkNonLiveSteps = () => {
  //   console.log('updating steps?');
  //
  //   Pedometer.getStepCountAsync(,).then(
  //     result => {
  //       this.setState({ yesterdayStepCount: result.steps });
  //     },
  //     error => {
  //       this.setState({
  //         yesterdayStepCount: "Could not get stepCount: " + error
  //       });
  //     }
  //   );
  //
  //   // get today's steps:
  //   Pedometer.getStepCountAsync(,).then(
  //     result => {
  //       this.setState({ todayStepCount: result.steps });
  //     },
  //     error => {
  //       this.setState({
  //         todayStepCount: "Could not get stepCount: " + error
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Steps taken yesterday: {this.state.yesterdayStepCount}
        </Text>
        <Text>
          Steps taken today: {this.state.todayStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.dynamicStepCount}</Text>
        <Text>yesterdayStartDate: {this.state.yesterdayStartDate.toString()}</Text>
        <Text>yesterdayEndDate: {this.state.yesterdayEndDate.toString()}</Text>
        <Text>todayStartDate: {this.state.todayStartDate.toString()}</Text>
        <Text>todayEndDate: {this.state.todayEndDate.toString()}</Text>
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
