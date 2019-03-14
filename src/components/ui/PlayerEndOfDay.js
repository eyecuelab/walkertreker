import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';

import Avatar from './Avatar'

class PlayerEndOfDay extends React.Component {

  constructor(props) {
    super(props);
  }

  _convertStepsToMiles(steps) {
    return parseFloat((steps/2112).toFixed(1))
  }

  _renderText() {
    const player = this.props.player
    const stepsDiff = this.props.playerUpdate.stepsDiff
    let text = ''
    if (this.props.didWeMakeIt) {
      text = `${player.displayName} made it to the safehouse.`
    } else {
      if (stepsDiff < 0) {
        text = `${player.displayName} fell ${ - this._convertStepsToMiles(stepsDiff)} miles short of the safehouse and suffered ${this.props.playerUpdate.healthDiff} damage from a zombie ambush.`
      } else {
        text = `${player.displayName} doubled back after making the safehouse to help the rest of the party and suffered ${this.props.playerUpdate.healthDiff} damage.`
      }
    }
    return (
      <Text style={styles.plainText}>{text}</Text>
    )
  }

  _applyVariableColorStyle(num) {
    const level = parseInt(num/33.35)
    const COLORS = {0: 'darkred', 1: 'white', 2: 'green'}
    return COLORS[level]
  }

  _renderHealthChange() {
    const health = this.props.player.health
    return (
      <Text style={[{color: this._applyVariableColorStyle(health)}, customStyles.shadow]}>{health}</Text>
    )
  }

  _renderHunger() {
    const hunger = this.props.player.hunger
    return (
      <Text style={[{color: this._applyVariableColorStyle(hunger)}, customStyles.shadow]}>{hunger}</Text>
    )
  }

  // <View style={customStyles.avatarContainer}>
  // <Avatar player={this.props.player} imageStyles={{width: wp('17.5%'), height: wp('17.5%')}} />
  // </View>
  // <View style={customStyles.smallRow}>
  // <Text style={[styles.label, customStyles.label]}>Health: {this._renderHealthChange()}</Text>
  // <Text style={[styles.label, customStyles.label]}>Hunger: {this._renderHunger()}</Text>
  // </View>
  render() {
    return (
      <View style={customStyles.container}>
        <View style={customStyles.row}>
          <View style={customStyles.nameContainer}>
            <View style={customStyles.column}>
              <Text style={[styles.label, customStyles.name]}>{this.props.player.displayName}</Text>
            </View>
            <View style={customStyles.column}>
              {this._renderText()}
            </View>
            <View style={customStyles.column}>
            </View>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    // padding: 10,
  },
  avatarContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  smallRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  shadow: {
    textShadowColor: '#222',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  label: {
    color: 'white',
    fontSize: heightUnit*2.5,
  },
  name: {
    // color: 'black',
    fontSize: heightUnit*5
  }
});

PlayerEndOfDay.propTypes = {
  player: PropTypes.object.isRequired,
  playerUpdate: PropTypes.object.isRequired,
  today: PropTypes.number.isRequired,
  didWeMakeIt: PropTypes.bool.isRequired
}

export default PlayerEndOfDay;
