import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import { phoneNumPrettyPrint } from '../../util/util';


import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
const { c } = constants;


class RecoverAccountModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      validNumber: true,
    }
  }

  _handleRecovery = async () => {
    const { dispatch } = this.props;
    prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber)
    console.log('recovery number', prettyPhoneNumber)
    if (prettyPhoneNumber.length === 12) {
      dispatch({
        type: c.RECOVER_ACCOUNT, phoneNumber: prettyPhoneNumber
      }) 
      this.props.handleModalStateChange();
    } else {
      this.setState({ validNumber: false})
    }
  }

  render(){
    return(
    <View style={[customStyles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>Account Recovery</Text>
        </View>
        <View >
          <Text style={styles.detail}>You will receive a text to recover your account</Text>
        </View>
        <View style={customStyles.formContainer}>
          <View style={customStyles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({phoneNumber: text})} value={this.state.phoneNumber}/>
          </View>
        </View>
        <View style={customStyles.buttonContainer}>
          <TwoButtonOverlay
            button1title="Recover Account"
            button1onPress={this._handleRecovery}
            button1color='darkred'
            button2title="New Player"
            button2onPress={() => this.props.handleRecoveryModalToggle()}
            button2color='darkred'/>
        
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
    height: '100%',
    // backgroundColor: 'darkred',
    // justifyContent: 'center',
    // borderRadius: 5,
    padding: widthUnit * 5,
  },
  headlineContainer: {
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 10,
  },
  fieldContainer: {
    margin: 10,
  },
  buttonContainer: {
    // margin: 10,
    height: heightUnit*15,
    width: '100%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: heightUnit*10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    color: 'white',
    fontFamily: 'gore',
  },
  avatarContainer: {
    // flex: 2,
    // height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: widthUnit*20,
    height: widthUnit*20,
    borderRadius: 100,
    // backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  avatarCaption: {
    fontSize: widthUnit*3.5,
    fontFamily: 'verdana',
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontStyle: 'italic'
  },
  itemBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
})

export default connect()(RecoverAccountModal);