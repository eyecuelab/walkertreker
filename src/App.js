import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading, Font, registerRootComponent, KeepAwake } from 'expo';
import { AppContainer } from './nav/router';
import { v4 } from 'uuid';

if (__DEV__) {
  KeepAwake.activate();
}

class App extends React.Component {
  state = {
    isReady: false,
  }

  _loadResourcesAsync = async () => {
    console.log('_loadResourcesAsync start');
    await Font.loadAsync({'gore': require('../assets/fonts/goreRough.otf'), 'verdana': require('../assets/fonts/verdana.ttf')});
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
    this.setState({isReady: true});
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

registerRootComponent(App)
