import React from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';

export default class CampaignStaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(<Text>CampaignStaging</Text>);
  }
}

const styles = StyleSheet.create(defaultStyle);

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({});
