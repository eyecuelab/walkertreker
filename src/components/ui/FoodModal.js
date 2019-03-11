import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray } = item;

class FoodModal extends React.Component {

  _eatTheFood = (num) => {
    const { dispatch, handleModalStateChange, player, campaign } = this.props;
    if (num === 0) {
      handleModalStateChange();
    } else if (num === 1) {
      // TODO: other code goes here to actually update values
      // take in the index of the item in the inventory (index)
      // increase player health and hunger
      // remove that item from the inventory
      // update the server with the adjusted inventory
      const { index, dispatch } = this.props;
      const { foodItems } = this.props.campaign.inventory;
      const { health, hunger } = this.props.player;
      let newHealth = health + 5;
      let newHunger = hunger + 15;
      if (newHealth > 100) {
        newHealth = 100;
      }
      if (newHunger > 100) {
        newHunger = 100;
      }
      // TODO:
      //right now this updates local state but not the server. rewrite so that it actually triggers a watcher saga instead, that fires off all of these including the server update
      dispatch({type: c.UPDATE_HUNGER_HEALTH, hunger: newHunger, health: newHealth});


      foodItems.splice(index, 1)
      handleModalStateChange();
    }
  }

  render() {
    return(
      <View style={customStyles.container}>

        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>Eat some food</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: widthUnit*15, aspectRatio: 1}}
            source={foodArray[this.props.value]} />
        </View>

        <View>
          <Text style={[styles.text, {padding: 10}]}>Consuming this item will restore your hunger and some health. Would you like to eat this food item?</Text>
        </View>

        <View style={customStyles.formContainer}>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={()=>{this._eatTheFood(1)}}>
              <Text style={styles.label}>Yes</Text>
            </TouchableOpacity>
          </View>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={()=>{this._eatTheFood(0)}}>
              <Text style={styles.label}>No</Text>
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

FoodModal.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    // steps: state.steps,
  }
}

export default connect(mapStateToProps)(FoodModal);
