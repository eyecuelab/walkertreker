import { createStore, applyMiddleware, compose } from "redux";
import {
  persistStore,
  persistReducer /* , purgeStoredState */
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import rootReducer from "./reducers";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const configureStore = () => {
  const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ["player", "campaign", "steps"]
  };

  /* THE BELOW METHODS ARE FOR WHEN YOU NEED TO CLEAR PERSISTED STATE STORAGE; You only need one. */

  // persistConfig.storage.clear();
  // purgeStoredState(persistConfig);

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();

export const persistor = persistStore(store, null, () => {
  /* CHANGE PLAYERID AND CAMPAIGNID BELOW TO START GAME WITH A SPECIFIC GAME AND PLAYER LOADED: */
  // const playerId = "217067b0-91d5-4359-8e1a-e89f3ef1172b";
  // const campaignId = "889f019c-a51d-412f-bc5f-29898e1e255e";
  const playerId = store.getState().player.id || null;
  const campaignId = store.getState().campaign.id || null;
  console.log("BEFORE ATTEMPTING TO FETCH", playerId, campaignId);
  if (playerId) {
    console.log("ATTEMPTING TO FETCH PLAYER +++++++++++++++++ \n");
    store.dispatch({ type: "GETTING_PLAYERID", gettingPlayerId: true });
    store.dispatch({ type: "FETCH_PLAYER", playId: playerId });
  }
  if (campaignId) {
    console.log("ATTEMPTING TO FETCH CAMPAIGN +++++++++++++++++ \n");
    store.dispatch({ type: "GETTING_CAMPAIGNID", gettingCampaignId: true });
    store.dispatch({ type: "FETCH_CAMPAIGN_INFO", id: campaignId });
  }
});
