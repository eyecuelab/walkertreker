import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

// screens
import CreateCampaign from '../components/screens/CreateCampaign';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import TOC from '../components/TOC';
import ActiveCampaignSummary from '../components/ActiveCampaignSummary';
import Inventory from '../components/Inventory';
import JoinCampaign from '../components/JoinCampaign';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Team from '../components/Team';
import PedometerSensorV2 from '../components/PedometerSensorV2';

const AppNavigator = createStackNavigator({
    CreateCampaign: { screen: CreateCampaign, },
    InvitePlayers: { screen: InvitePlayers, },
    CampaignStaging: {
      screen: CampaignStaging,
      // path: '/newGame:gameId',
    },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    TOC: { screen: TOC, },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
    PedometerSensorV2: { screen: PedometerSensorV2 }
  },
  {
    initialRouteName: "PedometerSensorV2",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);
