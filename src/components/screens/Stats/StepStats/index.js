import React, { Component } from 'react';
import { View } from 'react-native';
import StatDisplay from './../../../ui/StatDisplay';
import TotalSteps from './TotalSteps';
import RecordSteps from './RecordSteps';

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
        <StatDisplay title="Steps Walked" data={[{ value: "20000", label: "Kimchii" },{ value : "15000", label: "Digi" },{ value : "15000", label: "Digi" },{ value : "15000", label: "Digi" },{ value: "20000", label: "digi"}]}/>
        
      </View>
    );
  }
}

export default StepStats;
