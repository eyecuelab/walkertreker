import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

class WhenToStartForm extends React.Component {

  _handleGameStart = (num) => {
    const { dispatch } = this.props;
    let bool;
    if (num === 1) {
      console.log('bool true')
      bool = true;
    } else if (num === 0) {
      console.log('bool false')
      bool = false;
    } else {
      console.warn('_handleGameStart is getting a weird argument');
    }
    dispatch({type: c.START_CAMPAIGN, campId: this.props.campaign.id, startNow: bool});
    this.props.handleModalStateChange();
  }

  render() {
    return(
      <View style={customStyles.container}>

        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>When will your journey begin?</Text>
        </View>

        <View style={customStyles.formContainer}>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={()=>{this._handleGameStart(1)}}>
              <Text style={styles.label}>Right Now</Text>
            </TouchableOpacity>
          </View>

          <View style={customStyles.buttonContainer}>
            <TouchableOpacity
              style={customStyles.button}
              onPress={()=>{this._handleGameStart(0)}}>
              <Text style={styles.label}>Tomorrow Morning</Text>
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

WhenToStartForm.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(WhenToStartForm);
