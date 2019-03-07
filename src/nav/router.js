import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

// screens
import Start from '../components/Start';
import About from '../components/screens/About';
import CreateCampaign from '../components/screens/CreateCampaign';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import AcceptInvite from '../components/screens/AcceptInvite';
import WaitForStart from '../components/screens/WaitForStart';
import CampaignSummary from '../components/screens/CampaignSummary';
import Inventory from '../components/screens/Inventory';
import Safehouse from '../components/screens/Safehouse';
import EndOfDaySummary from '../components/screens/EndOfDaySummary';

const AppNavigator = createStackNavigator(
  {
    Start: { screen: Start },
    About: { screen: About, },
    CreateCampaign: { screen: CreateCampaign, },
    InvitePlayers: { screen: InvitePlayers, },
    CampaignStaging: { screen: CampaignStaging, },
    AcceptInvite: {
      screen: AcceptInvite,
      path: 'invite/:campaignId'
    },
    WaitForStart: { screen: WaitForStart, },
    CampaignSummary: { screen: CampaignSummary, },
    Safehouse: { screen: Safehouse },
    EndOfDaySummary: { screen: EndOfDaySummary },
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);
