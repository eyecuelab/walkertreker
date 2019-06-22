import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import NewPlayerForm from './NewPlayerForm';
import AccountRecovery from './AccountRecovery';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
const { c } = constants
const use_item_bg = require('../../../assets/use_item_bg.png');


class NewPlayerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recoveryModalToggle: false,
    }
  }
 

  _handleRecoveryModalToggle = () => {
    const newRecoveryModalToggle = !this.state.recoveryModalToggle
    this.setState({recoveryModalToggle: newRecoveryModalToggle})
    console.log("recoveryModal open", this.state.recoveryModalToggle)
  }

  conditionalRenderModalContent = () => {
    console.log('conditional render')
    if (this.state.recoveryModalToggle) {
      return <AccountRecovery 
      handleModalStateChange={this.props.handleModalStateChange} 
      handleRecoveryModalToggle={this._handleRecoveryModalToggle}/>
    } else {
    return <NewPlayerForm handleModalStateChange={this.props.handleModalStateChange} 
      handleRecoveryModalToggle={this._handleRecoveryModalToggle}/>
    }
  }

  render() {
    return(
      <ImageBackground
      source={use_item_bg}
      resizeMode='cover'
      style={customStyles.itemBg}
      >
        <View style={[customStyles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
          {this.conditionalRenderModalContent()}
        </View>
      </ImageBackground>
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
    // backgroundColor: 'darkred',
    // justifyContent: 'center',
    // borderRadius: 5,
    padding: widthUnit * 5,
  },
  itemBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
})


function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(NewPlayerModal);