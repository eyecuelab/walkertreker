import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import ScreenContainer from '../containers/ScreenContainer';
import { MainHeader } from './../text';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SignInSuccess from './SignInSuccess';


const use_item_bg = require('../../../assets/use_item_bg.png');




import constants from '../../constants';

const { c } = constants;

import defaultStyle from '../../styles/defaultStyle';

class RecoverAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: null,
      signInSuccess: false
    }
  }

  componentWillMount = async () => {
    const { dispatch } = this.props
    const playerId = this.props.navigation.getParam('playerId', false)
    await this.setState({ playerId })
    dispatch({ type: c.GETTING_CAMPAIGNID, gettingCampaignId: true })
    dispatch({ type: c.GETTING_PLAYERID, gettingPlayerId: true })
    dispatch({ type: c.FETCH_PLAYER, playId: playerId })
  }

  componentDidUpdate() {
    let auth = this.props.auth
    if (!auth.gettingPlayerId && !auth.gettingCampaignId && !this.state.signInSuccess) {
      auth.gotPlayerId ? this.setState({signInSuccess: true}) : null;
    }
  }

  render() {
    return(
      <View style={{backgroundColor : "darkgrey"}}>
      <ImageBackground
       source={use_item_bg}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1}}>

        { this.state.signInSuccess 

          ? <SignInSuccess navigation={this.props.navigation} player={this.props.player.displayName}/>

          : <View style={[customStyles.headlineContainer, {zIndex: -1}]}>
              <MainHeader style={{zIndex: -1}}>Recovering Account ... </MainHeader>
            </View>
        }

      </View>
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
 
  headlineContainer: {
    flex: 1,
    margin: widthUnit*6,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(RecoverAccount);