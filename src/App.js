import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, AppState } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

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


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Home Screen</Text>
        <Button
          title="Table of Contents"
          onPress={() => {this.props.navigation.navigate('TOC')}}
        />

        <TwoButtonOverlay
          title="Two Button Overlay"
          button1title="Button 1"
          button2title="Button 2"
        />

      </View>
    );
  }
}

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
    Home: { screen: HomeScreen, },
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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({appState: nextAppState});
  };

  render() {
    return <AppContainer appState={this.state.appState} />;
  }
}


AppRegistry.registerComponent('main', () => App);
