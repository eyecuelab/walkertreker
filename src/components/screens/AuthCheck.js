import React from 'react';
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import constants from './../../constants';
const { c, storeData, retrieveData } = constants;
import { connect } from 'react-redux';

class AuthCheck extends React.Component {
  constructor(props) {
    super(props);
    // this.checkForPlayerInStorage();
  }

  componentWillMount = async () => {
    const { dispatch } = this.props
    const localPlayer = await retrieveData('playerInfo');
    const localCampaign = await retrieveData('campaignInfo');
    console.log('localPlayer', localPlayer)
    console.log('localCampaign', localCampaign)

    localPlayer ? 
    dispatch({ type: c.FETCH_PLAYER, playId: localPlayer.id }) : null;
    localCampaign ? 
    dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: localCampaign.id }) : null;

    localPlayer && localCampaign ?
    this.props.navigation.navigate('Campaign') :
    this.props.navigation.navigate(localPlayer ? 'Setup' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    console.log('rendered auth check')
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

export default connect()(AuthCheck);
