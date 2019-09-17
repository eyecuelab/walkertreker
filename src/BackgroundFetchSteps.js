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

const { c, retrieveData } = constants;
const taskName = "pedometer-fetch";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

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
      console.log("bg fetch status: Available");
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

// componentDidMount() {
this.registerTaskAsync();
// }
