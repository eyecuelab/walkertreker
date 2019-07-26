import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;
const use_item_bg = require('../../../assets/use_item_bg.png');

class FoundModal extends React.Component {

  _itemToDisplay = () => {
    const { scavengingFor, itemScavenged } = this.props.steps;
    if (scavengingFor && (itemScavenged || itemScavenged === 0)) {
      let array;
      if (scavengingFor === 'food') {
        array = foodArray;
      } else if (scavengingFor === 'medicine') {
        array = medicineArray;
      } else if (scavengingFor === 'weapons') {
        array = weaponArray;
      } else {
        console.warn('you have a weird value in scavengingFor; fix it!');
      }
      const newItemScavenged = array[itemScavenged]
      return newItemScavenged;
    } else {
      return null;
    }
  }

  render() {
    return(
      <View style={customStyles.container}>

        <ImageBackground
          source={use_item_bg}
          resizeMode='cover'
          style={customStyles.itemBg} >

            <View style={customStyles.headlineContainer}>
              <Text style={styles.headline}>{this.props.steps.scavengingFor} Item Found</Text>
            </View>

            <View>
              <Text style={[styles.plainText, {marginTop: widthUnit * 2.5}]}>You managed to find something useful among the wreckage and debris.</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: widthUnit*15, aspectRatio: 1}}
                source={this._itemToDisplay()}
                resizeMode='contain' />
            </View>

            <View>
              <View style={customStyles.buttonContainer}>
                <TouchableOpacity
                  style={customStyles.button}
                  onPress={this.props.onButtonPress}>
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
    backgroundColor: 'rgb(32,32,33)',
    flex: 1,
  },
  headlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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

FoundModal.propTypes = {
  handleModalStateChange: PropTypes.func,
  onButtonPress: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    steps: state.steps,
  }
}

export default connect(mapStateToProps)(FoundModal);
