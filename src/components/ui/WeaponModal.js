import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { weaponArray } = item;

class WeaponModal extends React.Component {

  _dismissTheWeapon = () => {
    const { handleModalStateChange } = this.props;
    handleModalStateChange();

  }

  render() {
    return(
      <View style={customStyles.container}>

        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>View Weapon</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: widthUnit*15, aspectRatio: 1}}
            source={weaponArray[this.props.value]}
            resizeMode='contain' />
        </View>

        <View>
          <Text style={[styles.text, {padding: 10}]}>You don't need to use this weapon right now. Best save it for tonight in case zombies attack...</Text>
        </View>

        <View style={customStyles.formContainer}>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={this._dismissTheWeapon}>
              <Text style={styles.label}>OK</Text>
            </TouchableOpacity>
          </View>

        </View>
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
    height: heightUnit*75,
    backgroundColor: 'darkred',
    justifyContent: 'center',
    borderRadius: 5,
  },
  headlineContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 10,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: widthUnit*55,
    height: heightUnit*7.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
