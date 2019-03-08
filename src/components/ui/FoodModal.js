import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

class FoodModal extends React.Component {

  _eatTheFood = (num) => {
    const { dispatch, handleModalStateChange, player, campaign } = this.props;
    if (num === 0) {
      handleModalStateChange();
    } else if (num === 1) {
      // TODO: other code goes here to actually update values
      handleModalStateChange();
    }
  }

  render() {
    return(
      <View style={customStyles.container}>

        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>Eat some food</Text>
        </View>

        <View>
          <Text>Consuming this item will restore your hunger and some health. Would you like to eat this food item?</Text>
        </View>

        <View style={customStyles.formContainer}>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={()=>{this._eatTheFood(1)}}>
              <Text style={styles.label}>Yes/Text>
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
    height: heightUnit*50,
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
