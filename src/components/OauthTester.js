import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

class OauthTester extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '\n oauth is not signed in yet',
      hasBegun: false
    };
    this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
    this.revealToken = this.revealToken.bind(this);

  }

  async signInWithGoogleAsync() {
    try {
      this.setState({hasBegun: true});
      const result = await Expo.Google.logInAsync({
        behavior: 'web',
        androidStandaloneAppClientId: '965666879956-b433srl490jhskg235o59q9cs4mt2o8c.apps.googleusercontent.com ',
        webClientId: '965666879956-02d6su55oiuet0nj6jip05l9cmcjg320.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.setState({token: result.accessToken});
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      console.log('caught! try failed');
      return {error: true};
    }
  }

  async revealToken() {
    const tokenFromGoogle = await this.signInWithGoogleAsync();
    if (tokenFromGoogle.error) {
      this.setState({token: 'error'})
    } else if (tokenFromGoogle.cancelled) {
      this.setState({token: 'cancelled'})
    } else {
      console.log('we hit the else, which should bet the jackpot!');
      this.setState({token: tokenFromGoogle});
    }
  }

  render() {
    return (
      <View>
        <Button
          color='tomato'
          title='log in'
          onPress={this.revealToken}/>
        <Text style={{textAlign: 'center'}}>{this.state.token}</Text>
        <Text style={{textAlign: 'center'}}>Has begun: {this.state.hasBegun.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default OauthTester;
