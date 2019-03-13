import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c } = constants;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';

const attack_bg = require('../../../assets/attack_bg.png');

class CampaignIsWon extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.navigation.getParam('data')
    const finalCampaignState = data.finalCampaignState
    const causeOfDeath = data.causeOfDeath
    this.state = { update, campaign, currentDay, didWeMakeIt }
  }

  _headerTextRender() {
    if (this.state.didWeMakeIt) {
      return (
        <Text style={styles.label}>The evening comes, and you are safe... for now.</Text>
      )
    } else {
      return (
        <Text style={styles.label}>Night falls upon the safehouse... but not all of you are here...</Text>
      )
    }
  }

  _footerTextRender() {
    let text = ''
    const weapons = this.state.update.inventoryDiff.weaponItems
    const items = weapons == 1 ? 'item' : 'items'
    if (this.state.didWeMakeIt) {
      text = `Rest well tonight, because the journey only gets tougher from here.`
    } else {
      if (weapons > 0) {
        text = `Players that went back for their friends consumed ${weapons} weapon ${items} to reduce their damage taken.`
      } else {
        text = `Your party couldn't minimize damage taken because you have no weapons. Tomorrow, get to the safehouse before dark and scavenge for weapons!`
      }
    }
    return (
      <Text style={[styles.detail, {marginTop: 20}]}>{text}</Text>
    )
  }

  render() {
    const bg = this.state.didWeMakeIt ? safehouse_bg : attack_bg
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={{width: '100%', height: '100%'}}>
            <ImageBackground
              source={bg}
              resizeMode={'cover'}
              style={customStyles.bgImage}
            >
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: widthUnit*5}}>
                <View style={customStyles.headerContainer}>
                  <Text style={styles.label}>Day {this.state.currentDay + 1}</Text>
                  <Text style={styles.headline}>Night{"\n"}Fall</Text>
                </View>
                <View style={customStyles.playersContainer}>
                  {this._headerTextRender()}
                  <ScrollView
                    style={customStyles.playersScroll}
                    showsVerticalScrollIndicator={true}
                  >
                    {this.state.campaign.players.map(player => {
                      const playerUpdate = this.state.update.players.filter(obj => obj.id === player.id)[0]
                      return (
                        <PlayerEndOfDay key={player.id}
                          player={player}
                          playerUpdate={playerUpdate}
                          today={this.state.currentDay}
                          didWeMakeIt={this.state.didWeMakeIt}
                        />
                      )
                    })}
                    {this._footerTextRender()}
                  </ScrollView>
                </View>
                <View style={customStyles.buttonContainer}>
                  <SingleButtonFullWidth
                    title="Back"
                    backgroundColor="darkred"
                    onButtonPress={() => this.props.navigation.navigate('CampaignSummary')}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    marginBottom: heightUnit*2,
    width: '100%',
  },
  playersContainer: {
    // paddingTop: heightUnit,
    // paddingBottom: heightUnit,
    flex: 4,
    width: '100%',
    marginTop: heightUnit*2.5
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buttonContainer: {
    marginTop: heightUnit*5,
    marginBottom: heightUnit*5,
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerScroll: {
    width: '100%',
  },
  bgImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignIsWon)
