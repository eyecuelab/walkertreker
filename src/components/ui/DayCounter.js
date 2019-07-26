import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class DayCounter extends React.Component {
  render() {
    return (
      <View style={customStyles.container}>
        <View style={customStyles.row}>
          <Text style={customStyles.label}>Day {this.props.campaign.currentDay + 1} </Text>
        </View>
      </View>
    )
  }
}

DayCounter.propTypes = {
  campaign: PropTypes.object.isRequired
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  label: {
    fontFamily: 'gore',
    fontSize: widthUnit*5,
    color: 'white',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
  },
})
