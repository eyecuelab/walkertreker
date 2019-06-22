import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import ScreenContainer from '../containers/ScreenContainer';
import { MainHeader, SubHeader, TextAlt, Label } from './../text';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';

const use_item_bg = require('../../../assets/use_item_bg.png');




import constants from '../../constants';

const { c } = constants;

import defaultStyle from '../../styles/defaultStyle';

class RecoverAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: null,
    }
  }

  componentWillMount = async () => {
    const { dispatch } = this.props
    // const playerId = this.props.navigation.getParam('playerId', false)
    // this.setState({ playerId })
    // await console.log("from recoverAccount", playerId)
    // dispatch({ type: c.FETCH_PLAYER, playId: playerId })
  }
  componentDidMount() {
    // this.props.navigation.dangerouslyGetParent();
    // this.props.navigation.navigate('Start')
  }

  render() {
    return(
      <ImageBackground
       source={use_item_bg}
        style={{width: '100%', height: '100%'}}>
        <ScreenContainer>
          <View style={customStyles.headlineContainer}>
              <MainHeader>Recover Account</MainHeader>
            </View>

            <View style={customStyles.formContainer}>

              <View style={customStyles.fieldContainer}>
                <Label>Enter Recovery Code</Label>
                <TextInput style={customStyles.textInput} onChangeText={(text) => this.setState({recoveryNumber: text})} value={this.state.recoveryNumber}/>
              </View>
            </View>

            <TwoButtonOverlay
              button1title="Submit"
              button1onPress={this._handleSubmit}
              button1color='darkred'
              button2title="New Player"
              button2onPress={() => this.props.navigation.goBack()}
              button2color='darkred'

            />
           
        </ScreenContainer>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
 
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
    marginTop: 50,
    marginBottom: 50,
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
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: heightUnit*10,
    borderRadius: 5,
  },
  
  itemBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
})

export default connect()(RecoverAccount);