import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ContactsList from '../ui/ContactsList';
import PlayersList from '../ui/PlayersList';

import defaultStyle from '../../styles/defaultStyle';

class CampaignStaging extends React.Component {

  constructor(props) {
    super(props);
    // const game = this.props.navigation.getParam('game');
    const invites = this.props.navigation.getParam('invites');
    this.state = {
      // game,
      invites,
      selectedPlayer: 'none',
    };
  }

  componentDidMount() {
    // console.log(this.state);
  }

  submitConditionalRender = () => {
    if (this.props.campaign.numPlayers == 1) {
      return (
        <TwoButtonOverlay
          button1title="Waiting..."
          button1color="darkgray"
          button1onPress={() => console.log('Not enough players to launch game')}
          button2title="Invites"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    } else if (this.state.selectedPlayer !== 'none') {
      return (
        <TwoButtonOverlay
          button1title="Kick Player"
          button1color="darkred"
          button1onPress={() => this.openKickPlayerConfirmation()}
          button2title="Invite Players"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    } else {
      return (
        <TwoButtonOverlay
          button1title="Begin Game"
          button1onPress={this.startGame}
          button2title="Invite Players"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    }
  }

  _toggleSelectedPlayer = id => {
    let newSelectedPlayer;
    if (this.state.selectedPlayer == id) {
      newSelectedPlayer = 'none';
    } else {
      newSelectedPlayer = id;
    }
    this.setState({
      selectedPlayer: newSelectedPlayer,
    });
  }

  openKickPlayerConfirmation = async () => {
    // TODO: Pop up a confirmation modal that confirms the user wants to remove the selected player from the game.
    const id = this.state.selectedPlayer;
    const player = this.props.campaign.players[id];
    console.log(`Kick player ${player.name} from game.`);
  }

  startGame = async () => {
    console.log('Start the game!');
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
              <View style={customStyles.headerRow}>
                <Text style={[styles.label]}>{this.props.campaign.length} </Text>
                <Text style={[styles.label, {color: 'black'}]}>Days</Text>
              </View>
              <View style={customStyles.headerRow}>
                <Text style={[styles.label]}>{this.props.campaign.difficultyLevel} </Text>
                <Text style={[styles.label, {color: 'black'}]}>Difficulty Level</Text>
              </View>
              <View style={customStyles.headerRow}>
                <Text style={[styles.label]}>{this.props.campaign.randomEvents} </Text>
                <Text style={[styles.label, {color: 'black'}]}>In-game Events</Text>
              </View>
            </View>
            <View style={customStyles.panelContainer}>
              <ScrollView contentContainerStyle={customStyles.scrollContainer} showsVerticalScrollIndicator={true}>
                <View style={customStyles.scrollChildContainer}>
                  <Text style={customStyles.subHead}>Players</Text>
                  <View style={[customStyles.contactListContainer, customStyles.contactListFirst]}>

                    <PlayersList/>

                  </View>
                </View>
                <View style={[customStyles.contactListContainer, customStyles.contactListSecond]}>
                  <Text style={customStyles.subHead}>Invited</Text>
                  <ContactsList
                  contacts={this.state.invites}
                  contactsFetched={true}
                  allSelected={true}
                  />
                </View>
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
  headerRow: {
    flexDirection: 'row',
  },
  panelContainer: {
    flex: 3,
    width: '100%',
    height: '100%',
    paddingTop: 5,
    marginBottom: 10,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // marginTop: 10,
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  scrollChildContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  contactListContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  contactListFirst: {
    marginBottom: 25,
  },
  contactListSecond: {
    marginTop: 0,
    marginBottom: 50,
  },
  subHead: {
    fontFamily: 'gore',
    fontSize: widthUnit*10,
    // lineHeight: widthUnit*10,
    color: 'white',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignStaging);
