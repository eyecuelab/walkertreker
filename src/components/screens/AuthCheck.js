import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import constants from './../../constants';
import {connect} from 'react-redux';

const { c, retrieveData } = constants;

class AuthCheck extends React.Component {
  constructor() {
    super();
    this.checkForPlayerInStorage();
  }

  checkForPlayerInStorage = async () => {
    const localPlayer = await retrieveData('playerInfo');
    if(localPlayer) {
      console.log('attempting fetch with' + JSON.stringify(localPlayer))
      this.props.fetchPlayer(localPlayer.id);
    }
    localPlayer && localPlayer.campaignId ?
    this.props.navigation.navigate('Campaign') :
    this.props.navigation.navigate(localPlayer ? 'Setup' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Hello</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayer: (playerId) => dispatch({ type: c.FETCH_PLAYER, playId: playerId})
  }
}

export default connect(null, mapDispatchToProps)(AuthCheck);
