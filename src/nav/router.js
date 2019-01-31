import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

// screens
import CreateCampaign from '../components/screens/CreateCampaign';
import NewCampaignPartyView from '../components/screens/NewCampaignPartyView';
import Splash from '../components/screens/Splash';
import TOC from '../components/TOC';
import ActiveCampaignSummary from '../components/ActiveCampaignSummary';
import Inventory from '../components/Inventory';
import JoinCampaign from '../components/JoinCampaign';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Team from '../components/Team';
import PedometerSensorV2 from '../components/PedometerSensorV2';

const AppNavigator = createStackNavigator({
    CreateCampaign: { screen: CreateCampaign },
    NewCampaignPartyView: {
      screen: NewCampaignPartyView,
      path: 'newgame/:gameId',
    },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    TOC: { screen: TOC, },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
  },
  {
    initialRouteName: "CreateCampaign",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);
