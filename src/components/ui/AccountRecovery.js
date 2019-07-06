import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { ImagePicker, Permissions, Notifications } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import { phoneNumPrettyPrint } from '../../util/util';
import { MainHeader, SubHeader, TextAlt, Label } from './../text';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';



import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenContainer from '../containers/ScreenContainer';

const { c } = constants;
const use_item_bg = require('../../../assets/use_item_bg.png');



class RecoverAccountModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      recoveryCode: '',
      validNumber: true,
      submitted: false,
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
      this.setState({ validNumber: true, submitted: true})
    } else {
      this.setState({ validNumber: false, submitted: true})
    }
  }

  noNumberError = () => {
    if (this.state.validNumber && this.state.submitted) {
      return <View>
              <Label>Recovery Code</Label>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({ recoveryCode: text })} value={this.state.recoveryCode} />
            </View>
    } else if (this.state.submitted) {
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
              <Label>Phone Number</Label>
              <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({ phoneNumber: text })} value={this.state.phoneNumber} />
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