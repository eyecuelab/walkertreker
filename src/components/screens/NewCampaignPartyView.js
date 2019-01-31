import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, } from 'react-native';

import ContactsList from '../ui/ContactsList';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';

export default class NewCampaignPartyView extends React.Component {

  constructor(props) {
    super(props);
    const game = this.props.navigation.getParam('game');
    this.state = { game, invites: {}, numberOfInvites: 0 }
    console.log(this.state);
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={customStyles.contentContainer}>
            <View style={customStyles.headerContainer}>
              <View style={customStyles.headerFirst}>
                <View style={[customStyles.headerRow,]}>
                  <Text style={[styles.headline]}>Invite {"\n"}Players</Text>
                </View>
                <View style={customStyles.headerRow}>
                  <Text style={[styles.label]}>{this.state.game.campaignLength} </Text>
                  <Text style={[styles.label, {color: 'black'}]}>Days</Text>
                </View>
                <View style={customStyles.headerRow}>
                  <Text style={[styles.label]}>{this.state.game.difficultyLevel} </Text>
                  <Text style={[styles.label, {color: 'black'}]}>Difficulty Level</Text>
                </View>
                <View style={customStyles.headerRow}>
                  <Text style={[styles.label]}>{this.state.game.randomEvents} </Text>
                  <Text style={[styles.label, {color: 'black'}]}>In-game Events</Text>
                </View>
              </View>
              <View style={[customStyles.headerRowLast,]}>
                <View style={customStyles.headerRow}>
                  <View style={customStyles.plainTextContainer}>
                    <Text style={styles.plainText}>
                      Tap to select people you want to include on your journey. Currently you've selected <Text style={{color: 'black', fontWeight: '800'}}>{this.state.numberOfInvites} people.</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={customStyles.contactsContainer}>
              <ContactsList />
            </View>
          </View>
          <TwoButtonOverlay button1title="button1" button2title="button2" />
        </View>
      </ImageBackground>
    );
  }
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create(defaultStyle);
const customStyles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '90%',
    paddingBottom: 20,
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
  },
  headerRowFirst: {
    flex: 2,
    justifyContent: 'space-between',
  },
  headerRowLast: {
    flex: 1,
    alignItems: 'center',
  },
  plainTextContainer: {

  },
  contactsContainer: {
    flex: 2,
    width: '100%',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
