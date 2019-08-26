import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ContactsList from '../ui/ContactsList';
import PlayersList from '../ui/PlayersList';
import WhenToStartForm from '../ui/WhenToStartForm';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

import ScreenContainer from '../containers/ScreenContainer'; 
import CampaignLobbyHeader from './../ui/CampaignLobbyHeader';

import { SubHeader } from './../text';


class CampaignStaging extends React.Component {

  constructor(props) {
    super(props);
    const invites = this.props.navigation.getParam('invites');
    this.state = {
      invites,
      selectedPlayer: 'none',
      whenToStartModalVisible: false,
    };
  }

  componentDidUpdate() {
    console.log("campaign start date ?", this.props.campaign.startDate)
    if(this.props.campaign.startDate) {
      this.props.navigation.navigate("Campaign");
    } 
  }

  submitConditionalRender = () => {
    if (this.props.campaign.numPlayers == 1) {
      return (
        <TwoButtonOverlay
          button1title="Need More Players..."
          button1color="darkgray"
          button1onPress={() => console.log('Not enough players to launch game')}
          button2title="Invite"
          button2onPress={() => this.props.navigation.navigate('InvitePlayers')}
        />
      );
    } else if (this.state.selectedPlayer !== 'none') {
      return (
        <TwoButtonOverlay
          button1title="Kick Player"
          button1color="darkred"
          button1onPress={() => this._openKickPlayerConfirmation()}
          button2title="Invite"
          button2onPress={() => this.props.navigation.goBack()}
        />
      );
    } else {
      return (
        <TwoButtonOverlay
          button1title="Begin Game"
          button1onPress={this._toggleWhenToStartModal}
          button2title="Invite"
          button2onPress={() => this.props.navigation.navigate('InvitePlayers')}
        />
      );
    }
  }

  _toggleSelectedPlayer = id => {
    console.log('in _toggleSelectedPlayer');
    let newSelectedPlayer;
    if (this.state.selectedPlayer == id) {
      newSelectedPlayer = 'none';
    } else {
      newSelectedPlayer = id;
    }
    console.log('selected player: ', newSelectedPlayer);
    this.setState({
      selectedPlayer: newSelectedPlayer,
    });
  }

  _openKickPlayerConfirmation = () => {
    // TODO: Pop up a confirmation modal that confirms the user wants to remove the selected player from the game.
    const id = this.state.selectedPlayer;
    const player = this.props.campaign.players[id];
    console.log(`Kick player ${player.displayName} from game.`);
  }

  _toggleWhenToStartModal = () => {
    const whenToStartModalVisible = !this.state.whenToStartModalVisible
    this.setState({ whenToStartModalVisible })
  }


  render() {
    return(
      <View style={{backgroundColor : "#871C1D"}}>

        <ImageBackground
          source={this.props.screenProps.backgroundImage}
          style={{width: '100%', height: '100%'}}
        >

          <Modal isVisible={this.state.whenToStartModalVisible}>
            <WhenToStartForm handleModalStateChange={this._toggleWhenToStartModal} />
          </Modal>

          <ScreenContainer>

            <View style={customStyles.contentContainer}>

              <CampaignLobbyHeader campaign={this.props.campaign} title="New Campaign"/>

              <View style={customStyles.panelContainer}>
                <ScrollView contentContainerStyle={customStyles.scrollContainer} showsVerticalScrollIndicator={true}>


                    <SubHeader>Players</SubHeader>
                    <View style={[customStyles.contactListContainer, customStyles.contactListFirst]}>
                      <PlayersList
                        onSelectPlayer={this._toggleSelectedPlayer}/>
                    </View>


                  <View style={[customStyles.contactListContainer, customStyles.contactListSecond]}>
                    <SubHeader>Invited</SubHeader>
                    <ContactsList
                    contacts={this.props.campaign.invites}
                    contactsFetched={true}
                    allSelected={true}
                    />
                  </View>

                </ScrollView>
              </View>

            </View>
            {this.submitConditionalRender()}

          </ScreenContainer>
        
        </ImageBackground>
      </View>
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
    flex: 2.3,
    width: '100%',
    height: '100%',
    paddingTop: 5,
    marginBottom: 10,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
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
