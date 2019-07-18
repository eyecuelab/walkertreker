import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {MainHeader, SubHeader, Label, TextAlt} from './../text';
import { phoneNumPrettyPrint } from '../../util/util';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import WithKeyboardShift from './../../util/WithKeyboardShift';
import posed from 'react-native-pose';
import WithLoading from './../ui/WithLoading';
import constants from '../../constants';
import ScreenContainer from '../containers/ScreenContainer';
const { c } = constants
const use_item_bg = require('../../../assets/use_item_bg.png');

const AnimatedLabel = posed.View({
  inInput: {
    scale: 0.9,
    x: 0,
    y: 0,
  },
  aboveInput: { 
    scale: 0.8, 
    x: -10,
    y: -22,
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      phoneNumber: '',
      avatar: require('../../../assets/blankavatar.png'), 
      recoveryText: 'Aleady have an account?',
      recoveryTextBold: 'Recover it here',
      didFocusPhone: 'inInput',
      didFocusName: 'inInput',
      newPlayerCreated: false,
    }
    this.animationInterval = null
  }


  componentDidUpdate() {
    let auth = this.props.auth
    if (!auth.gettingPlayerId && !auth.gettingCampaignId) {
      auth.gotPlayerId ? this.props.navigation.navigate('MainApp') : this.state.newPlayerCreated ? this.recoveryText() : null;
    }   
  }


  recoveryText = () => {
    if (this.state.recoveryText !== 'Signup failed. Try again, or ') {
      this.setState({ recoveryText: 'Signup failed. Try again, or '})
    }
    if (this.state.recoveryTextBold !== 'click here to recover an account.') {
      this.setState({ recoveryTextBold: 'click here to recover an account.'})
    }
  }

  _handleSubmit = async () => {
    const { dispatch } = this.props;
    let prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber)
    console.log(prettyPhoneNumber)
    if (prettyPhoneNumber.length === 12) {
      const pushToken = await this.registerForPushNotificationsAsync();
      dispatch({ type: c.GETTING_PLAYERID, gettingPlayerId: true})
      dispatch({
        type: c.CREATE_PLAYER,
        name: this.state.displayName,
        number: prettyPhoneNumber,
        avatar: this.state.avatar,
        pushToken,
        isVisible: true
      })
      this.state.newPlayerCreated ? null : this.setState({ newPlayerCreated: true })
    } else {
      await this.setState({ recoveryText: 'Are you sure you entered your phone number correctly?'})
    }
  }

  handleFocus = (type) => {
    type === 'phone' ? 
    this.setState({
      didFocusPhone: 'aboveInput'
    }) :
    this.setState({
      didFocusName:  'aboveInput'
    })
  }

  handleBlur = (type) => {
    type === 'phone' ? 
    this.state.phoneNumber ? null :
    this.setState({
      didFocusPhone: 'inInput'
    }) : 
    this.state.displayName ? null :
    this.setState({
      didFocusName: 'inInput'
    })
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
    } else {
      const token = await Notifications.getExpoPushTokenAsync();
      return token;
    }
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
    const ButtonWithLoading = WithLoading(SingleButtonFullWidth);
    
    
    
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
              <AnimatedLabel pose={this.state.didFocusName}
                style={[customStyles.labelPosition, this.state.didFocusName === 'inInput' ? {zIndex: 0} : {zIndex: 1}]}>
                <Label>Display Name</Label>
              </AnimatedLabel>
              <TextInput style={customStyles.textInput} 
                onChangeText={(text) => this.setState({ displayName: text })} 
                onFocus={() => this.handleFocus('name')} 
                onBlur={() => this.handleBlur('name')}
                value={this.state.displayName} />
            </View>

            <View style={customStyles.fieldContainer}>
              <AnimatedLabel pose={this.state.didFocusPhone} 
                style={[customStyles.labelPosition, this.state.didFocusPhone === 'inInput' ? {zIndex: 0} : {zIndex: 1}]}>
                <Label style={{ backgroundColor: 'rgba(0,0,0,1)' }}>Phone Number</Label>
              </AnimatedLabel>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad" 
                onChangeText={(text) => this.setState({ phoneNumber: text })} 
                onFocus={() => this.handleFocus('phone')} 
                onBlur={() => this.handleBlur('phone')}
                value={this.state.phoneNumber} />
            </View>

            <View style={customStyles.buttonPosition}>
              <View style={customStyles.button}>
              <ButtonWithLoading 
                isLoading={this.props.auth.gettingPlayerId}
                title="Submit"
                onButtonPress={this._handleSubmit}
                backgroundColor="darkred"
              />
              </View>
              <View style={customStyles.textButtonContainer}>
                <TextAlt size='sm' onPress={() => { this.props.navigation.navigate('AccountRecovery') }}>{this.state.recoveryText}  <TextAlt color='darkred' weight='bold'>{this.state.recoveryTextBold}</TextAlt></TextAlt>
              </View>
            </View>
          </View>
        </ScreenContainer>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    padding: widthUnit * 4,
    height: '100%',
  },
  headlineContainer: {
    margin: 6,
    marginBottom: heightUnit*6,
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
    borderColor: '#888',
    borderWidth: 2,
    marginTop: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    color: 'white',
    fontFamily: 'gore',
    zIndex: 0
  },
  labelPosition: {
    position: 'absolute',
    bottom: heightUnit*2,
    left: widthUnit*1.8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 2,
    zIndex: 1
  },
  buttonPosition: {
    margin: 6,
    position: 'absolute',
    bottom: heightUnit*5,
    left: widthUnit*1.8,
    width: '100%',
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
    fontStyle: 'italic',
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
    redirect: state.redirect,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(SignUp);
