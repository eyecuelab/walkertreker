import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

// screens
import About from '../components/screens/About';
import CreateCampaign from '../components/screens/CreateCampaign';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import AcceptInvite from '../components/screens/AcceptInvite';
import TOC from '../components/TOC';
import ActiveCampaignSummary from '../components/ActiveCampaignSummary';
import Inventory from '../components/Inventory';
import JoinCampaign from '../components/JoinCampaign';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Team from '../components/Team';
import BackgroundPedometer from '../components/BackgroundPedometer';

const AppNavigator = createStackNavigator(
  {
    About: { screen: About, },
    CreateCampaign: { screen: CreateCampaign, },
    InvitePlayers: { screen: InvitePlayers, },
    CampaignStaging: { screen: CampaignStaging, },
    AcceptInvite: {
      screen: AcceptInvite,
      path: 'invite/',
    },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    TOC: { screen: TOC, },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
    BackgroundPedometer: { screen: BackgroundPedometer }
  },
  {
    initialRouteName: "About",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);
