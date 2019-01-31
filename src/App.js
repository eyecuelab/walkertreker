import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AppLoading, Font } from 'expo';
import { AppContainer } from './nav/router';
import { v4 } from 'uuid';

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  _loadResourcesAsync = async () => {
    console.log('_loadResourcesAsync start');
    const stuff = await Font.loadAsync({'gore': require('../assets/fonts/goreRough.otf')});
    console.log(stuff);
    // messing around with establishing a unique userId at app start, this can probably go away and be done in the redux store later.
    const userId = await AsyncStorage.getItem('userId');
    if (userId) { console.log(userId) }
    else {
      const newId = v4();
      await AsyncStorage.setItem('userId', newId);
      console.log(newId);
    }
    console.log('_loadResourcesAsync finish');
  };

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = () => {
    console.log('_handleFinishLoading start');
    this.setState({isReady: true});
    console.log('_handleFinishLoading finish');
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
        />
      );
    }

    else {
      return (
        <AppContainer
          screenProps={{
            backgroundImage: require('../assets/bg.png'),
          }}
        />
      );
    }
  }
}

AppRegistry.registerComponent('main', () => App);
