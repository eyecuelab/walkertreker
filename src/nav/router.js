import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

// screens
import Start from '../components/Start';
import About from '../components/screens/About';
import CreateCampaign from '../components/screens/CreateCampaign';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import AcceptInvite from '../components/screens/AcceptInvite';
import WaitForStart from '../components/screens/WaitForStart';
import CampaignSummary from '../components/screens/CampaignSummary';
import Safehouse from '../components/screens/Safehouse';
import EndOfDaySummary from '../components/screens/EndOfDaySummary';
import Inventory from '../components/screens/Inventory';
import RandomEvent from '../components/screens/RandomEvent';
import CampaignIsLost from '../components/screens/CampaignIsLost';
import CampaignIsWon from '../components/screens/CampaignIsWon';
import RecoverAccount from '../components/screens/RecoverAccount';
import CampaignRouteNavigator from '../components/campaign/CampaignRouteNavigator';
import AuthCheck from './../components/screens/AuthCheck';
import AuthStart from './../components/screens/AuthStackStart';
import SignUp from './../components/screens/SignUp';
import AccountRecovery from './../components/ui/AccountRecovery';

// const AppNavigator = createStackNavigator(
//   {
//     Start: { screen: Start },
//     About: { screen: About, },
//     CreateCampaign: { screen: CreateCampaign, },
//     InvitePlayers: { screen: InvitePlayers, },
//     CampaignStaging: { screen: CampaignStaging, },
//     AcceptInvite: {
//       screen: AcceptInvite,
//       path: 'invite/:campaignId'
//     },
//     RecoverAccount: {
//       screen: RecoverAccount,
//       path: 'recovery/:playerId'
//     },
//     WaitForStart: { screen: WaitForStart, },
//     CampaignSummary: { screen: CampaignSummary, },
//     Safehouse: { screen: Safehouse },
//     EndOfDaySummary: { screen: EndOfDaySummary },
//     Inventory: { screen: Inventory },
//     RandomEvent: { screen: RandomEvent },
//     CampaignIsLost: { screen: CampaignIsLost },
//     CampaignIsWon: { screen: CampaignIsWon },
//   },
//   {
//     initialRouteName: "NewPlayerForm",
//     defaultNavigationOptions: {
//       header: null,
//     }
//   }
// );

const AuthStack = createStackNavigator(
  {
    AuthStart: AuthStart,
    SignUp: SignUp,
    AccountRecovery: AccountRecovery,
    RecoverAccount: {
      screen: RecoverAccount,
      path: 'recovery/:playerId'
    },
  },
  {
    initialRouteName: "AuthStart",
    defaultNavigationOptions: {
      header: null,
    }
  }
)

const Setup = createStackNavigator(
  {
    CreateCampaign: CreateCampaign
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
)

const CampaignStack = createStackNavigator(
  {
    initialNav: CampaignRouteNavigator,
    CampaignStaging: CampaignStaging,
    CampaignSummary: CampaignSummary
  },
  {
    defaultNavigationOptions: {
      initialRouteName: "initialNav",
      header: null
    }
  }
)

export const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthCheck: AuthCheck,
    Auth: AuthStack,
    Setup: Setup,
    Campaign: CampaignStack
  },
  {
    initialRouteName: "AuthCheck",
    defaultNavigationOptions: {
      header: null,
    }
  }
));
