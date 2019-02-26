import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';

export default class CampaignDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={customStyles.container}>
        <View style={customStyles.row}>
          <Text style={[styles.label]}>{this.props.campaign.length} </Text>
          <Text style={[styles.label, {color: 'black'}]}>Days</Text>
        </View>
        <View style={customStyles.row}>
          <Text style={[styles.label]}>{this.props.campaign.difficultyLevel} </Text>
          <Text style={[styles.label, {color: 'black'}]}>Difficulty Level</Text>
        </View>
        <View style={customStyles.row}>
          <Text style={[styles.label]}>{this.props.campaign.randomEvents} </Text>
          <Text style={[styles.label, {color: 'black'}]}>In-game Events</Text>
        </View>
      </View>
    )
  }
}

CampaignDetails.propTypes = {
  campaign: PropTypes.object.isRequired
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
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
