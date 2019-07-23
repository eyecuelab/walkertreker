import React, { Component } from 'react';
import { View } from 'react-native';
import StatDisplay from './../../../ui/StatDisplay';
import TotalSteps from './TotalSteps';
import RecordSteps from './RecordSteps';
import SafehouseSteps from './SafehouseSteps';

class StepStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{height: "100%"}}>
        <TotalSteps/>
        <RecordSteps/>
        <SafehouseSteps/>
      </View>
    );
  }
}

export default StepStats;
