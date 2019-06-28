import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {MainHeader, SubHeader, Label, TextAlt} from './../text';
import { phoneNumPrettyPrint } from '../../util/util';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import WithKeyboardShift from './../../util/WithKeyboardShift';

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
      recoveryText: 'Aleady have an account?',
      recoveryTextBold: 'Recover it here'
    }
    this.newPlayerCreated = false;
  }

  componentDidUpdate() {
    this.props.player.id ? this.props.navigation.navigate('Setup') : 
      this.newPlayerCreated ? this.recoveryText() : null;
  }

  recoveryText = () => {
    if (this.state.recoveryText !== 'Signup failed. Try again, or ') {
      this.setState({ recoveryText: 'Signup failed. Try again, or '})
    }
    if (this.state.recoveryTextBold !== 'click here to recover an account.') {
      this.setState({ recoveryText: 'click here to recover an account.'})
    }
  }

  _handleSubmit = async () => {
    const { dispatch } = this.props;
    const pushToken = await this.registerForPushNotificationsAsync()
    prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber)
    if (prettyPhoneNumber.length === 12) {
      dispatch({
        type: c.CREATE_PLAYER,
        name: this.state.displayName,
        number: prettyPhoneNumber,
        avatar: this.state.avatar,
        pushToken,
      })
      this.newPlayerCreated = true; 
    } else {
      this.setState({ recoveryText: 'Are you sure you entered your phone number correctly?'})
    }
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
    return (
      <ImageBackground
        source={use_item_bg}
        resizeMode='cover'
        style={customStyles.itemBg}
      >
        <ScreenContainer>
          <View style={[customStyles.container, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>

            <View style={customStyles.headlineContainer}>
              <MainHeader>New Player</MainHeader>
            </View>

            <View style={customStyles.fieldContainer}>
              <Label>Display Name</Label>
              <TextInput style={customStyles.textInput} onChangeText={(text) => this.setState({ displayName: text })} value={this.state.displayName} />

            </View>

            <View style={customStyles.fieldContainer}>
              <Label>Phone Number</Label>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({ phoneNumber: text })} value={this.state.phoneNumber} />
            </View>

            <View style={customStyles.avatarContainer}>
              <TouchableOpacity style={customStyles.avatarTouchContainer} onPress={this._pickImage}>
                <Image
                  source={this.state.avatar}
                  style={customStyles.avatar}
                />
              </TouchableOpacity>

              <TextAlt style={customStyles.avatarCaption}>Touch to select avatar</TextAlt>
            </View>

            <View>
              <View style={customStyles.button}>
                <SingleButtonFullWidth
                  title="Submit"
                  onButtonPress={this._handleSubmit}
                  backgroundColor="darkred"
                />
              </View>
            </View>
            <View style={customStyles.textButtonContainer}>
              <TextAlt size='sm' onPress={() => { this.props.navigation.navigate('AccountRecovery') }}>{this.state.recoveryText}  <TextAlt color='darkred' weight='bold'>{this.state.recoveryTextBold}</TextAlt></TextAlt>
            </View>
          </View>
        </ScreenContainer>
      </ImageBackground>
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    padding: widthUnit * 4,
  },
  headlineContainer: {
    margin: 6,
    marginBottom: heightUnit*3,
  },
  fieldContainer: {
    margin: 6,
    marginBottom: heightUnit*3,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: heightUnit*10,
    borderRadius: 5,
    marginTop: heightUnit*3,
    marginBottom: heightUnit*2,
  },
  textButtonContainer: {
    height: heightUnit*6,
    padding: 6,
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
    alignItems: 'center',
  },
  avatar: {
    width: widthUnit*20,
    height: widthUnit*20,
    borderRadius: 100,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  avatarCaption: {
    fontStyle: 'italic'
  },
  itemBg: {
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

export default connect(mapStateToProps)(NewPlayerForm);
