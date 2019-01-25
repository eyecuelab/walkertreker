import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import TOC from './components/TOC';
import ActiveCampaignSummary from './components/ActiveCampaignSummary';
import CreateCampaign from './components/CreateCampaign';
import Inventory from './components/Inventory';
import JoinCampaign from './components/JoinCampaign';
import Map from './components/Map';
import Profile from './components/Profile';
import Team from './components/Team';
import OauthTesterStandalone from './components/OauthTesterStandalone';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Home Screeb</Text>
        <Button
          title="Table of Contents"
          onPress={() => {this.props.navigation.navigate('TOC')}}
        />
      <OauthTesterStandalone/>
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
    TOC: { screen: TOC, },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    CreateCampaign: { screen: CreateCampaign },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
  },
  {
    initialRouteName: "Home",
    // Options that apply to all screens accessed thru this navigator. https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator. Can be overriden in child screens with navigationOptions within that child component.
    defaultNavigationOptions: {
      // header: null,
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('main', () => App);
