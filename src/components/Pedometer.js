import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, TextInput, Button, DatePickerAndroid } from "react-native";

export default class PedometerSensor extends React.Component {


  constructor(props) {
    super(props);
    this._pickStartDate = this._pickStartDate.bind(this);
    this._logState = this._logState.bind(this);
    this._setCampaignLength = this._setCampaignLength.bind(this);
  }

  state = {
    isPedometerAvailable: "checking",
    stepCount: 0,
    stepsToGoal: 0,
    currentStepCountToday: 0,
    campaignStartDate: null,
    campaignEndDate: null,
    campaignLength: null,
  };

  componentDidMount() {
    if (this.state.campaignStartDate) {
      this._subscribe();
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _logState() {
    console.log(this.state);
  }

  async _pickStartDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        // date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const campaignStartsOn = new Date(year, month, day);
        console.log(campaignStartsOn);
        this.setState({
          campaignStartDate: campaignStartsOn,
        });
        console.log(this.state);
      }
    } catch ({code, message}) {
      console.warn('Can\'t open date picker', message);
    }
  }

  _setCampaignLength(length) {
    console.log(this.state.campaignStartsOn);
    let campaignEndsOn = new Date(this.state.campaignStartsOn.toString());
    console.log('campaign ends:', campaignEndsOn);
    let day = campaignEndsOn.toString().split('').slice(8, 10).join();
    console.log(day);
    campaignEndsOn.setDate(day + length);
    console.log(campaignEndsOn);
    this.setState({
      campaignEndDate: campaignEndsOn
    });
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCountToday: result.steps
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

    //edit the code below so that it will:
    // - take in campaign start date
    // - take in campaign length
    // - take in steps goal for each day
    // - take in goal multiplier (difficulty setting)
    // - take in boolean isItDaytime; only count steps during daytime
    // - calculate step goal each day during the campaign (goal x multiplier)
    // - determine if goal for day has been met
    // - after goal met, count additional steps beyond goal for purposes of scavenging, barricading, etc.

    // - calculate campaign end date
    // - count steps between start and end?

    Pedometer.getStepCountAsync(this.state.campaignStartDate, this.state.campaignEndDate).then(
      result => {
        this.setState({ stepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };
  //block to edit ends here

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title=' select campaign start date'
          onPress={this._pickStartDate} />
          <Button
            title='check ya state'
            onPress={this._logState} />
        <TextInput
          placeholder='campaign length'
          style={styles.input}
          keyboardType='number-pad'
          ref={(input) => {this._length = input}}
          onChangeText={(input) => {this.setState({campaignLength: input})}}
        />

        <Text>
          Pedometer available? {this.state.isPedometerAvailable}
        </Text>
        <Text>Campaign Length: {this.state.campaignLength}</Text>
        <Button
          title='start campaign'
          onPress={this._setCampaignLength}/>
        <Text>
          Goal met for today? {/*{this.state.pastStepCount}*/}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCountToday}</Text>
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
  },
  input: {
    backgroundColor: 'tomato',
    paddingLeft: 8,
    paddingRight: 8,
  }
});

// Expo.registerRootComponent(PedometerSensor);
