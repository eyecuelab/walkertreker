import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../sagas';
import rootReducer from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { c } from './../constants/index.js';



configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: storage,
        stateReconciler: autoMergeLevel2
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
    if (playerId) {
        console.log("ATTEMPTING TO FETCH PLAYER +++++++++++++++++ \n");
        store.dispatch({type: 'FETCH_PLAYER', playId: playerId});
    }
    if (campaignId) {
        console.log("ATTEMPTING TO FETCH CAMPAIGN +++++++++++++++++ \n");
        store.dispatch({type: 'FETCH_CAMPAIGN_INFO', id: campaignId});
    }
    
});

