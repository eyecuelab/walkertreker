import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Linking } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

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
    const playerId = this.props.navigation.getParam('playerId', false)
    this.setState({ playerId })
    await console.log("from recoverAccount", playerId)
    dispatch({ type: c.FETCH_PLAYER, playId: playerId })
  }
  componentDidMount() {
    this.props.navigation.navigate('Start')
    
  }

  render() {
    return(
      <View>
        <Text>There is something here</Text>
      </View>
    )
  }
}
export default connect()(RecoverAccount);