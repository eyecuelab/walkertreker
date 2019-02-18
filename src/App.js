import React from 'react';
import { AppState, AsyncStorage, Image, View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { AppLoading, Asset, Font, registerRootComponent, KeepAwake, Linking, } from 'expo';
import { withNavigation } from 'react-navigation';
import { AppContainer } from './nav/router';
import { v4 } from 'uuid';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import Modal from 'react-native-modal';

import BackgroundPedometer from './components/BackgroundPedometer';
import NewPlayerForm from './components/ui/NewPlayerForm';
import rootSaga from './sagas';
import rootReducer from './reducers';

if (__DEV__) {
  KeepAwake.activate();
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

class App extends React.Component {

  // can this stay as-is? it seems like it works just fine...
  state = {
    isReady: false,
    newPlayerModalVisible: false,
  }

  _toggleNewPlayerModal = () => {
    const newPlayerModalVisible = !this.state.newPlayerModalVisible
    this.setState({ newPlayerModalVisible })
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
    // this still seems worthwhile to create on app load so that we can have a unique id for each device/player. we can have it send this to the server when the campaign is created (by host) or joined (by not the host) to keep a log of players
    // Turning off for now...
    // const playerId = await AsyncStorage.getItem('playerId');
    // if (!playerId) {
    //   console.log('No playerId found, opening player creation modal')
    //   this.setState({newPlayerModalVisible: true})
    // }
  };

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = async () => {
    const { path, queryParams } = await Linking.parseInitialURLAsync()
    this.setState({
      isReady: true,
      path,
      queryParams
    });
  }

  componentDidUpdate = async () => {

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

    const prefix = Linking.makeUrl('/');

    return (
      <Provider store={store}>
        <Modal isVisible={this.state.newPlayerModalVisible}>
          <NewPlayerForm handleModalStateChange={this._toggleNewPlayerModal} />
        </Modal>
        <AppContainer
          uriPrefix={prefix}
          screenProps={{
            backgroundImage: require('../assets/bg.png'),
            path: this.state.path,
            queryParams: this.state.queryParams
          }}
        />
        <BackgroundPedometer/>
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
