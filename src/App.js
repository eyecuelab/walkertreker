import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, AppState } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import rootReducer from './reducers';

//putting these here as a placeholder to remind myself what might need to be imported:
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducers/index';
// import thunkMiddleware from 'redux-thunk';

// Screens for create/join campaign, the ones I'm working on for this feature.
import CreateCampaign from './components/screens/CreateCampaign';
import NewCampaignPartyView from './components/screens/NewCampaignPartyView';
import ContactsList from './components/screens/ContactsList';
import Splash from './components/screens/Splash';

// components imported for testing purposes, can get rid of these no problemo
import TwoButtonOverlay from './components/ui/TwoButtonOverlay';

// The other screens.
import TOC from './components/TOC';
import ActiveCampaignSummary from './components/ActiveCampaignSummary';
import Inventory from './components/Inventory';
import JoinCampaign from './components/JoinCampaign';
import Map from './components/Map';
import Profile from './components/Profile';
import Team from './components/Team';
import PedometerSensorV2 from './components/PedometerSensorV2';

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator(
  { // List a component to act as a screen. The screen attribute is required, other options listed after. Each component is rendered with the navigation prop. Navigate by calling this.props.navigation.navigate('...').
    CreateCampaign: { screen: CreateCampaign },
    ContactsList: { screen: ContactsList },
    NewCampaignPartyView: { screen: NewCampaignPartyView, },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    TOC: { screen: TOC, },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
    PedometerSensorV2: { screen: PedometerSensorV2 },
  },
  {
    initialRouteName: "PedometerSensorV2",
    // Options that apply to all screens accessed thru this navigator. https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator. Can be overriden in child screens with navigationOptions within that child component.
    defaultNavigationOptions: {
      header: null,
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);


//placeholder code to keep errors from happening. remove when actual reducers are built out
// const initialState = {
//   reduxWorks: false,
// }
//
// const reducer = (state = initialState) => {
//   return state;
// }
// placeholder ends here

const store = createStore(rootReducer);

class App extends React.Component {

  buttonClick = () => {
    store.dispatch({ type: 'TOGGLE' });
    console.log(store.getState());
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <Button
          title='click to demo redux'
          onPress={this.buttonClick} />
      </Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    reduxWorks: state.reduxWorks
  }
}

AppRegistry.registerComponent('main', () => App);

export default connect(mapStateToProps)(App);
