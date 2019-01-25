import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';

class OauthTester extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 'oauth is not working yet'
    };
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '965666879956-64n58k465kfltt86msruu2prifppu80a.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  componentDidMount() {
    this.setState({result: this.signInWithGoogleAsync()})
  }

  render() {
    return (
      <Text style={{textAlign: 'center'}}>{this.state.token}</Text>
    );
  }
}

const styles = StyleSheet.create({

});

export default OauthTester;
