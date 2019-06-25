import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {MainHeader, SubHeader, Label} from './../text';
import { phoneNumPrettyPrint } from '../../util/util';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import WithKeyboardShift from './../../util/WithKeyboardShift';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
import ScreenContainer from '../containers/ScreenContainer';
const { c } = constants
const use_item_bg = require('../../../assets/use_item_bg.png');

class NewPlayerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      phoneNumber: '',
      avatar: require('../../../assets/blankavatar.png'), 
      recoveryText: 'Aleady have an account? Recover it here.',
    }
    
  }

  componentDidUpdate() {
    this.props.player.id ? this.props.navigation.navigate('Setup') : 
      this.state.newPlayerCreated ?  this.recoveryText() : null;
  }

  recoveryText = () => {
    if (this.state.recoveryText !== 'Number already in use. Click here to recover your account.') {
      this.setState({ recoveryText: 'Number already in use. Click here to recover your account.'})
    }
  }

  _handleSubmit = async () => {
    const { dispatch } = this.props;
    const pushToken = await this.registerForPushNotificationsAsync()
    prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber)
    dispatch({
      type: c.CREATE_PLAYER,
      name: this.state.displayName,
      number: prettyPhoneNumber,
      avatar: this.state.avatar,
      pushToken,
    })
    this.setState({ newPlayerCreated: true })
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  _pickImage = async () => {
    const avatar = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
    })

    if (!avatar.cancelled) {
      this.setState({ avatar })
    }
  }

  render() {
    return(
      <ImageBackground
      source={use_item_bg}
      resizeMode='cover'
      style={customStyles.itemBg}
      >
        <ScreenContainer>
        <View style={[customStyles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>


          <View style={customStyles.headlineContainer}>
            <MainHeader>New Player</MainHeader>
          </View>

            <View style={customStyles.formContainer}>

            <View style={customStyles.fieldContainer}>
              <Label>Display Name</Label>
              <TextInput style={customStyles.textInput} onChangeText={(text) => this.setState({displayName: text})} value={this.state.displayName}/>
            </View>

            <View style={customStyles.fieldContainer}>
              <Label>Phone Number</Label>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({phoneNumber: text})} value={this.state.phoneNumber}/>
            </View>


            <View style={customStyles.avatarContainer}>

              <TouchableOpacity style={customStyles.avatarTouchContainer} onPress={this._pickImage}>
                <Image
                  source={this.state.avatar}
                  style={customStyles.avatar}
                />
              </TouchableOpacity>

              <Text style={customStyles.avatarCaption}>Touch to select avatar</Text>
            </View>
          </View>


          <View style={customStyles.buttonContainer}>
            <View style={customStyles.button}>
              <SingleButtonFullWidth
                title="Submit"
                onButtonPress={this._handleSubmit}
                backgroundColor="darkred"
              />
            </View>
          </View>
          <View style={customStyles.textButtonContainer}>
            <Text style={{color: 'white'}} onPress={() => {this.props.navigation.navigate('AccountRecovery')}}>
              {this.state.recoveryText}
            </Text>
          </View>
        </View>
        </ScreenContainer>
    </ImageBackground>
    )
  }
}
            // <TouchableOpacity style={customStyles.button} onPress={this._handleSubmit}><Text style={styles.label}>Submit</Text></TouchableOpacity>

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
    padding: widthUnit * 4,
  },
  headlineContainer: {
    margin: 6,
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
    height: heightUnit*10,
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
  textButtonContainer: {
    height: heightUnit*6,
    padding: widthUnit*8
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

NewPlayerForm.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(NewPlayerForm);
