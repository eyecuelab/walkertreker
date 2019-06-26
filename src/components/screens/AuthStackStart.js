import React from 'react';
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import constants from './../../constants';

class AuthStart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props.screenProps.queryParams.playerId)
    this.props.screenProps.path === 'recovery' ? this.props.navigation.navigate('RecoverAccount') : this.props.navigation.navigate('SignUp') ;
  }

  render() {
    console.log("navigation from the authstartstack", this.props.navigation)
    console.log('rendered auth start')
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Hello From AuthStart</Text>
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

export default AuthStart;