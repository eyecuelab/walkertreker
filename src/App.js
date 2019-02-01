import React from 'react';
import { AsyncStorage, Image, } from 'react-native';
import { AppLoading, Asset, Font, registerRootComponent, KeepAwake, } from 'expo';
import { AppContainer } from './nav/router';
import { v4 } from 'uuid';

if (__DEV__) {
  KeepAwake.activate();
}

class App extends React.Component {
  state = {
    isReady: false,
  }

  cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  _loadResourcesAsync = async () => {
    const imageAssets = this.cacheImages([
      require('../assets/bg.png'),
      require('../assets/buttontexture1.png'),
      require('../assets/buttontexture2.png'),
      require('../assets/buttontexture3.png'),
    ]);

    await Promise.all([
      Font.loadAsync({
        'gore': require('../assets/fonts/goreRough.otf'),
        'verdana': require('../assets/fonts/verdana.ttf')
      }),
      ...imageAssets,
    ]);

    // messing around with establishing a unique userId at app start, this can probably go away and be done in the redux store later.
    const userId = await AsyncStorage.getItem('userId');
    if (userId) { console.log('userId retrieved from AsyncStorage: ', userId) }
    else {
      const newId = v4();
      await AsyncStorage.setItem('userId', newId);
    }
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
