import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { Linking } from 'expo';
import constants from './../constants';
const { c } = constants;

// screens
import CreateCampaign from '../components/screens/CreateCampaign/';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import AcceptInvite from '../components/screens/AcceptInvite';
import WaitForStart from '../components/screens/WaitForStart';
import CampaignSummary from '../components/screens/CampaignSummary';
import Safehouse from '../components/screens/Safehouse';
import EndOfDaySummary from '../components/screens/EndOfDaySummary';
import Inventory from '../components/screens/Inventory';
import Journal from '../components/screens/Journal';
import RandomEvent from '../components/screens/RandomEvent';
import RandomEventResult from '../components/screens/RandomEventResult';
import CampaignIsLost from '../components/screens/CampaignIsLost';
import CampaignIsWon from '../components/screens/CampaignIsWon';
import RecoverAccount from '../components/screens/RecoverAccount';
import AuthCheck from './../components/screens/AuthCheck';
import SignUp from './../components/screens/SignUp';
import AccountRecovery from './../components/ui/AccountRecovery';
import MainAppRouter from './../components/screens/MainAppRouter';


const AuthStack = createStackNavigator(
  {
    SignUp: SignUp,
    AccountRecovery: AccountRecovery,
    RecoverAccount: {
      screen: RecoverAccount,
      path: 'recovery'
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
)

 const MainApp = createStackNavigator(
  {
    MainAppRouter: { screen: MainAppRouter },
    CreateCampaign: { screen : CreateCampaign },
    CampaignStaging: { screen : CampaignStaging },
    CampaignSummary: { screen : CampaignSummary },
    InvitePlayers: { screen : InvitePlayers },
    RandomEvent: { screen: RandomEvent },
    RandomEventResult: { screen: RandomEventResult },
    Inventory: { screen: Inventory }, 
    Journal: { screen: Journal },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'Journal',
  }
)

const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthCheck: AuthCheck,
    Auth: {screen: AuthStack, path : ''},
    MainApp: {
      screen: MainApp,
      path: ''
    },
    Accept: {
      screen: AcceptInvite,
      path: 'join'
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer( MainSwitchNavigator );