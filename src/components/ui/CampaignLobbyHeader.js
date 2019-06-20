//BOILERPLATE IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
//COMPONENT IMPORTS
import { MainHeader, Label } from './../text';
import { Text, View, StyleSheet } from 'react-native';

//STYLE IMPORTS
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');

function CampaignLobbyHeader(props) {
  return(
    <View>

      <MainHeader>{props.title}</MainHeader>

      <View style={[customStyles.headerRow, {marginTop: widthUnit * 2.5}]}>
        <Label>{props.campaign.length} </Label>
        <Label color="black">Days</Label>
      </View>

      <View style={customStyles.headerRow}>
        <Label>{props.campaign.difficultyLevel} </Label>
        <Label color="black">Difficulty Level</Label>
      </View>

      <View style={customStyles.headerRow}>
        <Label>{props.campaign.randomEvents} </Label>
        <Label color="black">In-game Events</Label>
      </View>

    </View>
  );
}

const customStyles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row'
  }
});

CampaignLobbyHeader.propTypes = {
  campaign: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default CampaignLobbyHeader;
