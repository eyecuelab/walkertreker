/* eslint-disable global-require */
import React from "react";
import { Image } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {
  AppLoading,
  registerRootComponent,
  Notifications,
  Linking,
  ActivityIndicator
} from "expo";
import KeepAwake, { activateKeepAwake } from "expo-keep-awake";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AppContainer } from "./nav/router";
import NavigationService from "./nav/NavigationService";
import { PersistGate } from "redux-persist/integration/react";
import { withNavigation } from "react-navigation";

import { Provider, connect, dispatch } from "react-redux";
import constants from "./constants";
import { store, persistor } from "./store";

import SocketIO from "./components/SocketIO";
import BackgroundPedometer from "./components/BackgroundPedometer";
import NotificationListeners from "./components/NotificationListeners";

const { c, retrieveData } = constants;

const taskName = "BACKGROUND_GET_STEPS";

TaskManager.defineTask(taskName, async () => {
  console.log(
    "TaskManager.defineTask successfully fired off -------------------------------------------"
  );
  try {
    await UserRemoteLogService.logWithTaskType("STEPS_TASK_RUNNING");
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

BackgroundFetch.registerTaskAsync(taskName, {
  minimumInterval: 60,
  stopOnTerminate: false,
  startOnBoot: true
}).then(() => BackgroundFetch.setMinimumIntervalAsync(60));

if (__DEV__) {
  activateKeepAwake();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      // newPlayerModalVisible: false,
      notification: false
    };
  }

  cacheImages = images =>
    images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      }
      return Asset.fromModule(image).downloadAsync();
    });

  _loadResourcesAsync = async () => {
    // const { dispatch } = this.props;
    const imageAssets = this.cacheImages([
      require("../assets/use_item_bg.png"),
      require("../assets/Icons/Home_Active.png"),
      require("../assets/Icons/Home_Inactive.png"),
      require("../assets/Icons/Inventory_Active.png"),
      require("../assets/Icons/Inventory_Inactive.png"),
      require("../assets/Icons/Journal_Active.png"),
      require("../assets/Icons/Journal_Inactive.png"),
      require("../assets/Icons/Stats_Active.png"),
      require("../assets/Icons/Stats_Inactive.png"),
      require("../assets/paintstroke/Paint_Stroke.png"),
      require("../assets/paintstroke/Paint_Stroke_alt.png"),
      require("../assets/paintstroke/Paint_Stroke2.png"),
      require("../assets/paintstroke/Paint_Stroke3.png"),
      require("../assets/paintstroke/Paint_Stroke3_alt.png"),
      require("../assets/logo.png"),
      require("../assets/bg.png"),
      require("../assets/blankavatar.png"),
      require("../assets/buttontexture1.png"),
      require("../assets/buttontexture2.png"),
      require("../assets/buttontexture3.png"),
      require("../assets/checked.png"),
      require("../assets/selected.png"),
      require("../assets/splash2.png"),
      require("../assets/safehouse_bg.png"),
      require("../assets/event_bg.png"),
      require("../assets/victory_bg.png"),
      require("../assets/burnt-paper.png"),
      require("../assets/attack_bg.png"),
      require("../assets/food/Apple.png"),
      require("../assets/food/Baked_Beans.png"),
      require("../assets/food/Beer.png"),
      require("../assets/food/Dry_meat.png"),
      require("../assets/food/Energy_Drink.png"),
      require("../assets/food/Pasta.png"),
      require("../assets/food/Pepsi.png"),
      require("../assets/food/Pure_water.png"),
      require("../assets/food/Sugar.png"),
      require("../assets/medication/Bandages-0.png"),
      require("../assets/medication/First_Aid_Kit.png"),
      require("../assets/medication/Healing_salve.png"),
      require("../assets/medication/Metocaine.png"),
      require("../assets/medication/Tidocycline.png"),
      require("../assets/medication/Tratodonide.png"),
      require("../assets/weapons/Baseball_Bat.png"),
      require("../assets/weapons/Cleveland.png"),
      require("../assets/weapons/Colt_Python.png"),
      require("../assets/weapons/Crowbar.png"),
      require("../assets/weapons/Golf_Club.png"),
      require("../assets/weapons/Hammer.png"),
      require("../assets/weapons/Hockey_Stick.png"),
      require("../assets/weapons/Iron_Pickaxe.png"),
      require("../assets/weapons/Shotgun-0.png")
    ]);

    await Promise.all([
      Font.loadAsync({
        gore: require("../assets/fonts/goreRough.otf"),
        verdana: require("../assets/fonts/verdana.ttf"),
        verdanaBold: require("../assets/fonts/verdanaBold.ttf"),
        "Gill Sans MT Condensed": require("../assets/fonts/gillSansCondensed.ttf"),
        "Gill Sans MT Condensed Bold": require("../assets/fonts/gillSansCondensedBold.ttf")
      }),
      ...imageAssets
    ]);

    let localPlayer = await retrieveData("playerInfo");

    const dud = {
      id: false,
      campaignId: false
    };
    if (!localPlayer) {
      localPlayer = dud;
      // await this.setState({
      //   newPlayerModalVisible: true,
      // });
    } else {
      localPlayer = JSON.parse(localPlayer);
    }
    // await this.setState({ localPlayer });
    console.log("LOCAL PLAYER : ", localPlayer);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = async () => {
    Linking.addEventListener("url", event => this.handleOpenURL(event.url));

    await this.setState({
      isReady: true
    });
  };

  _passNotificationToStart = notification => {
    this.setState({ notification });
  };

  async componentDidMount() {
    Notifications.addListener(this._passNotificationToStart);
    const { path, queryParams } = await Linking.parseInitialURLAsync();
    if (path) {
      store.dispatch({
        type: "SET_REDIRECT_PATH_AND_PARAMS",
        path,
        queryParams
      });
    }
  }

  componentDidUpdate() {
    console.log("AUTH STATE", this.props.auth);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  async handleOpenURL(url) {
    const { path, queryParams } = await Linking.parse(url);
    store.dispatch({
      type: c.SET_REDIRECT_PATH_AND_PARAMS,
      path,
      queryParams
    });
    NavigationService.navigate("AuthCheck");
  }

  render() {
    // const prefix = Linking.makeUrl("/");
    if (this.state.isReady) {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={ActivityIndicator}>
            <BackgroundPedometer />
            <SocketIO />
            <NotificationListeners />
            <BackgroundPedometer />
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
              screenProps={{
                backgroundImage: require("../assets/bg.png"),
                notification: this.state.notification
              }}
            />
          </PersistGate>
        </Provider>
      );
    }
    console.log("Loading App Initialized");
    return (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onFinish={this._handleFinishLoading}
        onError={this._handleLoadingError}
      />
    );
  }
}

registerRootComponent(App);

const mapStateToProps = state => {
  return {
    player: state.player,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);
