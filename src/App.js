import React from 'react';
import { AppState, AsyncStorage, Image, View, Text } from 'react-native';
import { AppLoading, Asset, Font, registerRootComponent, KeepAwake, Linking, Notifications, } from 'expo';
import { AppContainer } from './nav/router';
import NavigationService from './nav/NavigationService';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import constants from './constants';
const { c, storeData, retrieveData } = constants;

import Modal from 'react-native-modal';
import NewPlayerModal from './components/ui/NewPlayerModal';
import SocketIO from './components/SocketIO';
import BackgroundPedometer from './components/BackgroundPedometer';
import NotificationListeners from './components/NotificationListeners';
import GetNotificationToken from './components/GetNotificationToken'

if (__DEV__) {
  KeepAwake.activate();
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends React.Component {

  //turn these into state hooks
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      newPlayerModalVisible: false,
      notification: false
    }
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
      require('../assets/blankavatar.png'),
      require('../assets/buttontexture1.png'),
      require('../assets/buttontexture2.png'),
      require('../assets/buttontexture3.png'),
      require('../assets/checked.png'),
      require('../assets/selected.png'),
      require('../assets/splash2.png'),
      require('../assets/safehouse_bg.png'),
      require('../assets/event_bg.png'),
      require('../assets/victory_bg.png'),
      require('../assets/use_item_bg.png'),
      require('../assets/attack_bg.png'),
      require('../assets/food/Apple.png'),
      require('../assets/food/Baked_Beans.png'),
      require('../assets/food/Beer.png'),
      require('../assets/food/Dry_meat.png'),
      require('../assets/food/Energy_Drink.png'),
      require('../assets/food/Pasta.png'),
      require('../assets/food/Pepsi.png'),
      require('../assets/food/Pure_water.png'),
      require('../assets/food/Sugar.png'),
      require('../assets/medication/Bandages-0.png'),
      require('../assets/medication/First_Aid_Kit.png'),
      require('../assets/medication/Healing_salve.png'),
      require('../assets/medication/Metocaine.png'),
      require('../assets/medication/Tidocycline.png'),
      require('../assets/medication/Tratodonide.png'),
      require('../assets/weapons/Baseball_Bat.png'),
      require('../assets/weapons/Cleveland.png'),
      require('../assets/weapons/Colt_Python.png'),
      require('../assets/weapons/Crowbar.png'),
      require('../assets/weapons/Golf_Club.png'),
      require('../assets/weapons/Hammer.png'),
      require('../assets/weapons/Hockey_Stick.png'),
      require('../assets/weapons/Iron_Pickaxe.png'),
      require('../assets/weapons/Shotgun-0.png'),
    ]);

    await Promise.all([
      Font.loadAsync({
        'gore': require('../assets/fonts/goreRough.otf'),
        'verdana': require('../assets/fonts/verdana.ttf'),
        'verdanaBold': require('../assets/fonts/verdanaBold.ttf'),
      }),
      ...imageAssets,
    ]);

    // blank localPlayer in asyncStorage:
    // await storeData('playerInfo', "")
    let localPlayer = await retrieveData('playerInfo')
    const dud = {
      id: false,
      campaignId: false
    }

    // this seems buggy? 
    if (!localPlayer) {
      console.log('nolocalplayer')
      localPlayer = dud
      await this.setState({
        newPlayerModalVisible: true,
      })
    } else {
      localPlayer = JSON.parse(localPlayer)
      console.log('localplayer-needplayer')
    }
    await this.setState({ localPlayer })

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
    if (this.state.path === 'recovery') {
      this._toggleNewPlayerModal()
    }
  }

  _passNotificationToStart = (notification) => {
    this.setState({ notification })
  }

  componentDidMount() {
    Notifications.addListener(this._passNotificationToStart);
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
    console.log("This is the prefix:", prefix)

    return (
      <Provider store={store}>
        <Modal isVisible={this.state.newPlayerModalVisible}>
          <NewPlayerModal handleModalStateChange={this._toggleNewPlayerModal} />
        </Modal>
        <SocketIO />
        <NotificationListeners />
        <BackgroundPedometer />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          uriPrefix={prefix}
          screenProps={{
            backgroundImage: require('../assets/bg.png'),
            path: this.state.path,
            queryParams: this.state.queryParams,
            localPlayer: this.state.localPlayer,
            notification: this.state.notification,
          }}
        />
      </Provider>
    );
  }
}

registerRootComponent(App)

// function mapStateToProps(state) {
//   return {
//
//   }
// }

export default connect(/*mapStateToProps*/)(App);
