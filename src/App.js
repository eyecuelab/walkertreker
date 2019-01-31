import React from 'react';

import { AppLoading, Font, registerRootComponent, KeepAwake } from 'expo';
import { AppContainer } from './nav/router';


if (__DEV__) {
  KeepAwake.activate();
}

class App extends React.Component {
  state = {
    isReady: false,
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({'gore': require('../assets/fonts/goreRough.otf')});
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
