import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import TouchableWithLoading from './../ui/Buttons/TouchableWithLoading';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { weaponArray } = item;
const use_item_bg = require('../../../assets/use_item_bg.png');

class WeaponModal extends React.Component {

  render() {
    return(
      <View style={customStyles.container}>

        <ImageBackground
          source={use_item_bg}
          resizeMode='cover'
          style={customStyles.itemBg} >

          <View style={customStyles.headlineContainer}>
            <Text style={styles.headline}>View Weapon</Text>
          </View>

          <View>
            <Text style={[styles.plainText, {marginTop: widthUnit * 2.5}]}>You don't need to use this weapon right now. Best save it for tonight in case zombies attack...</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: widthUnit*15, aspectRatio: 1}}
              source={weaponArray[this.props.value]}
              resizeMode='contain' />
          </View>

          <View>
            <View style={customStyles.buttonContainer}>
              <TouchableOpacity
                style={customStyles.button}
                onPress={this.props.onDismissTheWeapon}>
                <Text style={styles.label}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {

  },
  buttonContainer: {
    // margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'darkred',
    width: '100%',
    height: heightUnit * 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthUnit * 2,
  },
  itemBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
    padding: widthUnit * 5,
  },
})

WeaponModal.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    // steps: state.steps,
  }
}

export default connect(mapStateToProps)(WeaponModal);
