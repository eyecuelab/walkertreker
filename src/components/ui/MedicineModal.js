import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { medicineArray } = item;
const use_item_bg = require('../../../assets/use_item_bg.png');

class MedicineModal extends React.Component {

  _takeTheMedicine = (num) => {
    const { dispatch, handleModalStateChange, player, campaign } = this.props;
    if (num === 0) {
      handleModalStateChange();
    } else if (num === 1) {
      const { index, dispatch } = this.props;
      const { medicineItems } = this.props.campaign.inventory;
      const { health, hunger } = this.props.player;
      let newHealth = health + 20;
      let newHunger = hunger;
      if (newHealth > 100) {
        newHealth = 100;
      }
      if (newHunger > 100) {
        newHunger = 100;
      }
      medicineItems.splice(index, 1)
      dispatch({type: c.UPDATE_HUNGER_HEALTH, hunger: newHunger, health: newHealth});
      handleModalStateChange();
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
            <Text style={styles.headline}>Take some medicine</Text>
          </View>

          <View>
            <Text style={[styles.plainText, {marginTop: widthUnit * 2.5}]}>Consuming this item will restore your health. Would you like to use this medicine item?</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: widthUnit*15, aspectRatio: 1}}
              source={medicineArray[this.props.value]}
              resizeMode='contain' />
          </View>


          <View>
            <View style={customStyles.buttonContainer}>
              <TouchableOpacity
                style={customStyles.button}
                onPress={()=>{this._takeTheMedicine(1)}}>
                <Text style={styles.label}>Yes</Text>
              </TouchableOpacity>
            </View>

            <View style={customStyles.buttonContainer}>
              <TouchableOpacity
                style={customStyles.button}
                onPress={()=>{this._takeTheMedicine(0)}}>
                <Text style={styles.label}>No</Text>
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

MedicineModal.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    // steps: state.steps,
  }
}

export default connect(mapStateToProps)(MedicineModal);
