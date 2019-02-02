import React from 'react';
import { AppState, AsyncStorage, Image } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { AppLoading, Asset, Font, registerRootComponent, KeepAwake, } from 'expo';
import { AppContainer } from './nav/router';
import { v4 } from 'uuid';

import rootReducer from './reducers';

if (__DEV__) {
  KeepAwake.activate();
}

const store = createStore(rootReducer);

class App extends React.Component {
  state = {
    isReady: false,
  }

//putting these here as a placeholder to remind myself what might need to be imported:
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducers/index';
// import thunkMiddleware from 'redux-thunk';
//
// placeholder code to keep errors from happening. remove when actual reducers are built out
// const initialState = {
//   reduxWorks: false,
// }
//
// const reducer = (state = initialState) => {
//   return state;
// }
// placeholder ends here

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
      require('../assets/blankavatar.png'),
      require('../assets/checked.png'),
      require('../assets/selected.png'),
    ]);

    await Promise.all([
      Font.loadAsync({
        'gore': require('../assets/fonts/goreRough.otf'),
        'verdana': require('../assets/fonts/verdana.ttf'),
        'verdanaBold': require('../assets/fonts/verdanaBold.ttf'),
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

    return (
      <Provider store={store}
        <AppContainer
          screenProps={{
            backgroundImage: require('../assets/bg.png'),
          }}
        />
      </Provider>
    );
  }
}

registerRootComponent(App)

function mapStateToProps(state) {
  return {
    reduxWorks: state.reduxWorks
  }
}

export default connect(mapStateToProps)(App);
