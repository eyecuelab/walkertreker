import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../sagas';
import rootReducer from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';



configureStore = () => {

    const persistConfig = {
        key: 'root',
        storage: storage,
        stateReconciler: autoMergeLevel2,
        whitelist: ['player', 'campaign', 'steps']
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        persistedReducer,
        undefined,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export const store = configureStore();

export const persistor = persistStore(store, null, () => {
  const playerId = store.getState().player.id || null;
  const campaignId = store.getState().campaign.id || null;
  console.log("BEFORE ATTEMPTING TO FETCH", playerId, campaignId)
  if (playerId) {
    console.log("ATTEMPTING TO FETCH PLAYER +++++++++++++++++ \n");
    store.dispatch({ type: 'GETTING_PLAYERID', gettingPlayerId: true })
    store.dispatch({ type: 'FETCH_PLAYER', playId: playerId });
  }
  if (campaignId) {
    console.log("ATTEMPTING TO FETCH CAMPAIGN +++++++++++++++++ \n");
    store.dispatch({ type: 'GETTING_CAMPAIGNID', gettingCampaignId: true })
    store.dispatch({ type: 'FETCH_CAMPAIGN_INFO', id: campaignId });
  }
});

