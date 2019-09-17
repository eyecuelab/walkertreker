/* eslint-disable global-require */
import React from "react";
import { Image } from "react-native";
import {
  AppLoading,
  registerRootComponent,
  Notifications,
  Linking,
  Pedometer,
  ActivityIndicator,
  Alert
} from "expo";
import { /* KeepAwake, */ activateKeepAwake } from "expo-keep-awake";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AppContainer } from "./nav/router";
import NavigationService from "./nav/NavigationService";
import { PersistGate } from "redux-persist/integration/react";
// import { withNavigation } from "react-navigation";

import { Provider, connect /* , dispatch */ } from "react-redux";
import constants from "./constants";
import { store, persistor } from "./store";

import SocketIO from "./components/SocketIO";
import BackgroundPedometer from "./components/BackgroundPedometer";
import NotificationListeners from "./components/NotificationListeners";
import PropTypes from "prop-types";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const { c, retrieveData } = constants;
const taskName = "pedometer-fetch";

if (__DEV__) {
  activateKeepAwake();
}

TaskManager.defineTask(taskName, async () => {
  console.log("-");
  console.log("-");
  console.log("-");
  console.log("INSIDE TASKMANAGER.defineTASK");
  console.log("background fetch running");
  console.log("-");
  console.log("-");
  console.log("-");
  const { dispatch } = this.props;
  try {
    await Pedometer.isAvailableAsync().then(
      response => {
        dispatch({
          type: c.IS_PEDOMETER_AVAILABLE,
          pedometerIsAvailable: response
        });
        console.log("pedometer.isAvailableAsync response", response);
      },
      error => {
        // maybe dispatch an action to the store to update state instead?
        console.log("pedometer error", error);
        Alert.alert(
          "Walker Treker can't connect to your phone's pedometer. Try closing the app and opening it again."
        );
      }
    );
    const receivedNewData = await dispatch({ type: c.GET_STEPS });
    console.log("------");
    console.log("------");
    console.log("------");
    console.log("steps from c.GET_STEPS", receivedNewData);
    console.log("------");
    console.log("------");
    console.log("------");
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (error) {
    console.log("error with getting pedometer task", error);
    console.log(
      "error with background.fetch.rsult.failed",
      BackgroundFetch.Result.Failed
    );
    return BackgroundFetch.Result.Failed;
  }
});

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

  registerTaskAsync = async () => {
    console.log("INSIDE register task async");
    const status = await BackgroundFetch.getStatusAsync();

    switch (status) {
      case BackgroundFetch.Status.Restricted:
        console.log("bg fetch status: Restrict");
        break;
      case BackgroundFetch.Status.Denied:
        console.log("bg fetch status: Background execution is disabled");
        break;

      case BackgroundFetch.Status.Available: {
        console.log("bg fetch status: Avaible");
        await BackgroundFetch.registerTaskAsync(taskName);
        console.log("task registered");
        const tasks = await TaskManager.getRegisteredTasksAsync();
        console.log("bg fetch default: the identified tasks: ", tasks);
        await BackgroundFetch.setMinimumIntervalAsync(15);
        break;
      }
      default:
        console.log("bg fetch default case reached: nothing to do");
        break;
    }
  };

  componentDidMount = async () => {
    Notifications.addListener(this._passNotificationToStart);
    const { path, queryParams } = await Linking.parseInitialURLAsync();
    if (path) {
      store.dispatch({
        type: "SET_REDIRECT_PATH_AND_PARAMS",
        path,
        queryParams
      });
    }
    this.registerTaskAsync();
  };

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
            {/* <BackgroundPedometer /> */}
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

App.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string
  }),
  auth: PropTypes.shape(),
  steps: PropTypes.shape({
    campaignDateArray: PropTypes.arrayOf()
  })
  // dispatch: PropTypes.func.isRequired
};

App.defaultProps = {
  steps: {},
  player: {},
  auth: {}
};
