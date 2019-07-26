import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray } = item;
const use_item_bg = require('../../../assets/use_item_bg.png');
import TouchableWithLoading from './../ui/Buttons/TouchableWithLoading';


class FoodModal extends React.Component {

  render() {
    return(
      <View style={customStyles.container}>

        <ImageBackground
          source={use_item_bg}
          resizeMode='cover'
          style={customStyles.itemBg} >

            <View style={customStyles.headlineContainer}>
              <Text style={styles.headline}>Eat some food</Text>
            </View>

            <View>
              <Text style={[styles.plainText, {marginTop: widthUnit * 2.5}]}>Consuming this item will restore your hunger and some health. Would you like to eat this food item?</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: widthUnit*15, aspectRatio: 1}}
                source={foodArray[this.props.value]}
                resizeMode='contain' />
            </View>

            <View>
              <View style={customStyles.buttonContainer}>
                <TouchableWithLoading
                  isLoading={this.props.isLoading}                
                  style={customStyles.button}
                  onPress={()=>{this.props.onEatTheFood(1)}}>
                  <Text style={styles.label}>Yes</Text>
                </TouchableWithLoading>
              </View>

              <View style={customStyles.buttonContainer}>
                <TouchableOpacity
                  style={customStyles.button}
                  onPress={()=>{this.props.onEatTheFood(0)}}>
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
    backgroundColor: 'rgb(32,32,33)',
    flex: 1,
  },
  headlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {

  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightUnit * 8,
    marginTop: widthUnit * 2,
  },
  button: {
    backgroundColor: 'darkred',
    width: '100%',
    height: heightUnit * 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
    padding: widthUnit * 5,
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
