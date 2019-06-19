import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

/// DO WE WANT THIS AS A COMPONENT? AS MODAL? 

class RecoverAccountModal extends React.component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
    }
  }

  _handleRecovery = async () => {
    const { dispatch } = this.props;
    console.log("do the handle recovery")
    dispatch({
      type: c.RECOVER_ACCOUNT,
      
    })
  }

  render(){
    return(
      <ImageBackground
    source={use_item_bg}
    resizeMode='cover'
    style={customStyles.itemBg}
    ></ImageBackground>
    )
  }
}

export default RecoverAccountModal;