import React, { Component } from 'react';
import ToggleBar from './../ui/ToggleBar';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
import { ScreenContainer, OpacityContainer } from './../containers';
import SignInSuccess from './SignInSuccess';
export default class TestScreen extends Component {
  

  render() {
    return(
     <SignInSuccess {...this.props}/>

    )
  }
}