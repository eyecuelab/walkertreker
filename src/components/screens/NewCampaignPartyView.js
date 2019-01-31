import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, } from 'react-native';

import ContactsList from './ContactsList';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';

export default class NewCampaignPartyView extends React.Component {

  constructor(props) {
    super(props);
    const game = this.props.navigation.getParam('game');
    this.state = { game, invites: {}, }
    console.log(this.state);
  }

  render() {
    console.log(Dimensions.get('window'));
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={[newCampaignPartyViewStyles.container]}>
          <View style={newCampaignPartyViewStyles.header}>
            <View style={newCampaignPartyViewStyles.gameParams}>
              <Text style={newCampaignPartyViewStyles.gameParamsValue}>{this.state.game.campaignLength} </Text>
              <Text style={newCampaignPartyViewStyles.gameParamsLabel}>Days</Text>
            </View>
            <View style={newCampaignPartyViewStyles.gameParams}>
              <Text style={newCampaignPartyViewStyles.gameParamsValue}>{this.state.game.difficultyLevel} </Text>
              <Text style={newCampaignPartyViewStyles.gameParamsLabel}>Difficulty Level</Text>
            </View>
            <View style={newCampaignPartyViewStyles.gameParams}>
              <Text style={newCampaignPartyViewStyles.gameParamsValue}>{this.state.game.randomEvents} </Text>
              <Text style={newCampaignPartyViewStyles.gameParamsLabel}>In-Game Events</Text>
            </View>
            <Text style={styles.headline}>Invite</Text>
            <Text style={styles.headline}>Players</Text>
          </View>
          <View style={newCampaignPartyViewStyles.contactsContainer}>
            <Text> contacts component goes here </Text>
          </View>
          <TwoButtonOverlay
          button1title="Back"
          button2title="Send Invites"
          />
        </View>
      </ImageBackground>
    );
  }
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create(defaultStyle);
const newCampaignPartyViewStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 20,
    height: (height*0.9),
    width: '90%',
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  gameParams: {
    flexDirection: 'row',
    fontFamily: 'gore',

  },
  gameParamsValue: {
    color: 'white',
    fontSize: 23,
  },
  gameParamsLabel: {
    color: 'black',
    fontSize: 23,
  },
  contactsContainer: {
    flex: 2,
    width: '100%',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  }
});
