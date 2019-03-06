import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c } = constants;

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';

class Safehouse extends React.Component {

  _selectFood = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'food'});
  }

  _selectMedicine = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'medicine'});
  }

  _selectWeapon = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'weapon'});
  }

  _submitConditionalRender = () => {
    const { scavengingFor } = this.props.steps;
    if (scavengingFor === 'food') {
      return (
        <Text style={[styles.plainText, customStyles.headline]}>food</Text>
      );
    } else if (scavengingFor === 'medicine') {
      return (
        <Text style={[styles.plainText, customStyles.headline]}>medicine</Text>
      );
    } else if (scavengingFor === 'weapon') {
      return (
        <Text style={[styles.plainText, customStyles.headline]}>weapon</Text>
      );
    } else {
      return (
        <View style={customStyles.container}>
          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              backgroundColor='black'
              title='Look for food'
              onButtonPress={this._selectFood} />
          </View>

          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              backgroundColor='black'
              title='Search for medicine'
              onButtonPress={this._selectMedicine} />
          </View>

          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              backgroundColor='black'
              title='Find weapons'
              onButtonPress={this._selectWeapon} />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}} >
        <View style={styles.container}>

          <View style={customStyles.headlineContainer}>
            <Text style={styles.headline}>Safehouse</Text>
          </View>

          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>You have made it to the safehouse with time to spare. You can use that time to scavenge for resources.</Text>
          </View>

          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>If you walk another quarter mile, you can do one of the following:</Text>
          </View>

          {this._submitConditionalRender()}

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  textContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    lineHeight: heightUnit*3.75,
  },
  buttonContainer: {
    marginTop: heightUnit*5,
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%'
  }
})

function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    // campaign: state.campaign,
    // player: state.player,
  }
}

export default connect(mapStateToProps)(Safehouse);
