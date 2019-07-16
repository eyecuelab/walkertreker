import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { phoneNumPrettyPrint } from '../../util/util';
import { MainHeader, SubHeader, TextAlt, Label } from './../text';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import posed from 'react-native-pose';
import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
import ScreenContainer from '../containers/ScreenContainer';

const { c } = constants;
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

class RecoverAccountModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      recoveryCode: '',
      validNumber: true,
      submitted: false,
      didFocusInput: 'inInput',
    }
  }

  handleFocus = () => {
    this.setState({
      didFocusInput:  'aboveInput'
    })
  }

  handleBlur = () => {
    this.state.phoneNumber ? null :
    this.setState({
      didFocusInput: 'inInput'
    })
  }

  _handleRecovery = async () => {
    const { dispatch } = this.props;
    prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber)
    console.log('recovery number', prettyPhoneNumber)
    if (prettyPhoneNumber.length === 12) {
      dispatch({
        type: c.RECOVER_ACCOUNT, phoneNumber: prettyPhoneNumber
      }) 
      this.setState({ validNumber: true, submitted: true})
    } else {
      this.setState({ validNumber: false, submitted: true})
    }
  }

  noNumberError = () => {
    if (!this.state.validNumber && this.state.submitted) {
      return <TextAlt>Failed to find user. Are you sure you entered the correct number?</TextAlt>
    }
  }

  render(){
    return (
      <ImageBackground
        source={use_item_bg}
        resizeMode='cover'
        style={customStyles.itemBg}
      >
        <ScreenContainer>
          <View style={[customStyles.container, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <View style={customStyles.headlineContainer}>
              <MainHeader>Account Recovery</MainHeader>
              <TextAlt style={{marginTop: 12}}>You will receive a text to recover your account</TextAlt>
            </View>

            <View style={customStyles.fieldContainer}>
              <AnimatedLabel pose={this.state.didFocusInput}
                style={[customStyles.labelPosition, this.state.didFocusInput === 'inInput' ? {zIndex: 0} : {zIndex: 1}]}>
                <Label>Phone Number</Label>
              </AnimatedLabel>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad"
                onChangeText={(text) => this.setState({ phoneNumber: text })} 
                onFocus={() => this.handleFocus()} 
                onBlur={() => this.handleBlur()}
                value={this.state.phoneNumber} />
            </View>
            
            <View style={customStyles.formContainer}>
              {this.noNumberError()}
            </View>
            <View>
              <View style={customStyles.button}>
                <SingleButtonFullWidth
                  title="Recover"
                  onButtonPress={this._handleRecovery}
                  backgroundColor="darkred"
                />
              </View>
            </View>
            <View style={customStyles.textButtonContainer}>
              <TextAlt size='sm' onPress={() => { this.props.navigation.navigate('SignUp') }}>Go back to <TextAlt color='darkred' weight='bold'>New Player Sign Up</TextAlt></TextAlt>
            </View>
                    {/* <View style={customStyles.textButtonContainer}>
            <TwoButtonOverlay
              button1title="Recover Account"
              button1onPress={this._handleRecovery}
              button1color='darkred'
              button2title="New Player"
              button2onPress={() => {this.props.navigation.goBack()}}
              button2color='darkred' />
          </View> */}
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
    height: '100%'
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
    marginTop: heightUnit*24,
    marginBottom: heightUnit*2,
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
  textButtonContainer: {
    height: heightUnit*6,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBg: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})


export default connect()(RecoverAccountModal);