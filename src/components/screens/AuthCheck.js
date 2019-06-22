import React from 'react';
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import constants from './../../constants';
const { c, storeData, retrieveData } = constants;

class AuthCheck extends React.Component {
  constructor() {
    super();
    this.checkForPlayerInStorage();
  }

  checkForPlayerInStorage = async () => {
    const localPlayer = await retrieveData('playerInfo');
    const localCampaign = true;

    localPlayer && localCampaign ?
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

export default AuthCheck;
