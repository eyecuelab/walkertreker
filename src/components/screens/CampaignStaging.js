import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ContactsList from '../ui/ContactsList';
import ContactsListItemDisplay from '../ui/ContactsListItemDisplay';

import initialStateCampaignDetailReducer from '../../constants/initialStateCampaignDetailReducer'; // populating game state with players to test styling, can go away.

import defaultStyle from '../../styles/defaultStyle';

export default class CampaignStaging extends React.Component {
  constructor(props) {
    super(props);
    const game = this.props.navigation.getParam('game');
    const invites = this.props.navigation.getParam('invites');
    this.state = {
      game: initialStateCampaignDetailReducer,
      invites,
    };
    console.log(this.state.game);
  }

  startGame = async () => {
    console.log('Start the game!');
  }

  submitConditionalRender = () => {
    if (this.state.game.numPlayers == 1) {
      return (
        <TwoButtonOverlay
          button1title="Waiting..."
          button1color="darkgray"
          button1onPress={() => console.log('Not enough players to launch game')}
          button2title="Send Invites"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    } else {
      return (
        <TwoButtonOverlay
          button1title="Begin Game"
          button1onPress={this.startGame}
          button2title="Send Invites"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    }
  }

  render() {
    return(
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={customStyles.contentContainer}>
            <View style={customStyles.headerContainer}>
              <Text style={styles.headline}>New Campaign</Text>
            </View>
            <View style={customStyles.panelContainer}>
              <View style={customStyles.sectionHeader}>
                <Text style={styles.headline}>Players</Text>
              </View>
              <View style={customStyles.team}>
                {Object.keys(this.state.game.players).map(key => {
                  const player = this.state.game.players[key];
                  return (
                    <View style={customStyles.playerContainer} key={key}>
                      <Image source={player.imageAvailable ? player.imageUri : require('../../../assets/blankavatar.png')} style={customStyles.avatar} />
                      <Text style={[styles.label, {textAlign: 'center'}]} key={key}>{player.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={customStyles.panelContainer}>
              <View style={customStyles.sectionHeader}>
                <Text style={styles.headline}>Invited</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={true} style={customStyles.invitesContainer}>
                <ContactsList
                  contactsFetched={true}
                  contacts={this.state.invites}
                />
              </ScrollView>
            </View>
          </View>
          {this.submitConditionalRender()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '90%',
    // paddingBottom: 10,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  headerContainer: {
    flex: 1,
  },
  panelContainer: {
    flex: 4,
    // marginTop: 10,
  },
  team: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    // paddingTop: 20,
  },
  playerContainer: {
    width: `${100/3}%`,
    height: '50%',
    // padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    height: heightUnit*7,
    width: heightUnit*7,

  },
  invitesContainer: {
    width: '100%',
    height: '100%',
  },
});
