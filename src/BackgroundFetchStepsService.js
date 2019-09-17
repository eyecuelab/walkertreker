import React from "react";
import { Pedometer, Alert } from "expo";
import constants from "./constants";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const { c /* , retrieveData */ } = constants;
const FETCH_STEPS = "pedometer-fetch";

class BackgroundFetchStepsService extends React.Component {
  defineTasks = () => {
    console.log(`defineTasks()`);
    TaskManager.defineTask(FETCH_STEPS, this.handleRetrieveSteps);
  };

  registerTaskAsync = async () => {
    console.log("this.props", this.props);
    console.log(`registerTaskAsync()`);
    console.log("INSIDE register task async");
    const status = await BackgroundFetch.getStatusAsync();

    switch (status) {
      case BackgroundFetch.Status.Restricted:
        console.log("bg fetch status: Restrict");
        break;
      case BackgroundFetch.Status.Denied:
        console.log("bg fetch status: Background execution is disabled");
        break;
      default: {
        // case BackgroundFetch.Status.Available: {
        console.log("bg fetch status: Avaible");
        await BackgroundFetch.registerTaskAsync(FETCH_STEPS);
        await BackgroundFetch.setMinimumIntervalAsync(20);
        console.log("task registered for 20 mintue intervals");
        break;
      }
    }
  };

  unregisterTasks = async () => {
    console.log("unregisterTasks()");
    await TaskManager.unregisterAllTasksAsync();
  };

  displayTasks = async text => {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    console.log(text + JSON.stringify(tasks));
  };

  handleRetrieveSteps = async () => {
    const { dispatch } = this.props;
    const now = new Date();
    console.log("INSIDE: handleRetrieveSteps at TIME ---", now);
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
  };

  render() {
    return null;
  }
}

connect()(BackgroundFetchStepsService);

export default BackgroundFetchStepsService;

BackgroundFetchStepsService.propTypes = {
  dispatch: PropTypes.func.isRequired
};
