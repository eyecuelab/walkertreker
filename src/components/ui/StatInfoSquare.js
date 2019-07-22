import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from './../text';
const bg1 = require('../../../assets/buttontexture1.png');
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const heightUnit = hp('1%');
const widthUnit = wp('1%');

class StatInfoSquare extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Label style={[styles.text, {color: "#FF0000"}]}>{this.props.label}</Label>
          <Label style={styles.text}>{this.props.value}</Label>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: widthUnit*30,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: widthUnit*7,
    paddingVertical: widthUnit*5,
    backgroundColor: "#000"
  },
  text: {
    textAlign: 'center'
  }
});

StatInfoSquare.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  label: PropTypes.string.isRequired
}

export default StatInfoSquare;