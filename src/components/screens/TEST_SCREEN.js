import React, { Component } from 'react';
import ToggleBar from './../ui/ToggleBar';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
export default class TestScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values : []
    };
  }

  handleValueChange = (value) => {
    this.setState(prevState => ({
      values: [value, ...prevState.values]
    }))
    console.log(this.state.values)
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: "center", alignContent: 'center',}}>
        
        {this.state.values.map((value, index) => {
          return(
            <Text key={index}>{value}</Text>
          )
        })}
      </View>

    )
  }
}