import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Animated } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c } = constants;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import PlayersList from '../ui/PlayersList';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import PlayerEndOfDay from '../ui/PlayerEndOfDay';
import AnimatedCampaignHeader from '../ui/AnimatedCampaignHeader';
import { ScreenContainer } from '../containers';


const safehouse_bg = require('../../../assets/safehouse_bg.png');
const attack_bg = require('../../../assets/attack_bg.png');

class EndOfDaySummary extends React.Component {

  constructor(props) {
    super(props)
    const update = this.props.navigation.getParam('data')
    const campaign = this.props.campaign
    const currentDay = campaign.currentDay
    let didWeMakeIt = true
    for (let player of update.players) {
      if (player.stepsDiff < 0) {
        didWeMakeIt = false
      }
    }
    this.state = { update, campaign, currentDay, didWeMakeIt }
  }

  componentWillMount(){
    this.scrollY = new Animated.Value(0);
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
    console.log("InventoryUsed", this.state.update.inventoryUsed)
    let text = ''
    const weapons = this.state.update.inventoryUsed
    const items = weapons.length === 1 ? 'item' : 'items'
    if (this.state.didWeMakeIt) {
      text = `Rest well tonight, because the journey only gets tougher from here.`
    } else {
      if (weapons.length > 0) {
        text = `Players that went back for their friends consumed ${weapons.length} weapon ${items} to reduce their damage taken.`
      } else {
        text = `Your party couldn't minimize damage taken because you have no weapons. Tomorrow, get to the safehouse before dark and scavenge for weapons!`
      }
    }
    return (
      <Text style={[styles.plainText, {marginTop: 25, marginBottom: 20}]}>{text}</Text>
    )
  }

  render() {
    const bg = this.state.didWeMakeIt ? safehouse_bg : attack_bg
    return (
      <ImageBackground
        source={bg}
        resizeMode={'cover'}
        style={customStyles.bgImage}
      >
        <View style={[{ backgroundColor: 'rgba(0,0,0,0.3)' }, { width: '100%' }, { height: '100%' }]} >
        <ScreenContainer style={{padding: widthUnit*3}}>
          <AnimatedCampaignHeader lineHeight='squish' title={`Night\nFall`} scrollY={this.scrollY} />
          {this._headerTextRender()}
          <View style={customStyles.playersContainer}>
            <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  { nativeEvent: { contentOffset: { y: this.scrollY } } }
                ]
              )}>

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
              backgroundColor="black"
              onButtonPress={() => this.props.navigation.navigate('MainAppRouter')}
            />
          </View>
        </ScreenContainer>
        </View>
      </ImageBackground >
    );
  }

}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  playersContainer: {
    flex: 4,
    width: '100%',
    marginTop: heightUnit*2.5
  },
  buttonContainer: {
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
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

export default connect(mapStateToProps)(EndOfDaySummary)
