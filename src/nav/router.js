import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { Linking } from 'expo';
import constants from './../constants';
const { c } = constants;
import {Image} from 'react-native';

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
import Lobby from './../components/screens/Lobby';
import {store} from './../store';
import TabBarIcon from '../components/ui/TabBarIcon';

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

const LobbyNavigator = createStackNavigator(
  {
    Lobby: { screen : Lobby },
    CampaignStaging: {screen: CampaignStaging},
    WaitForStart: {screen: WaitForStart},
    InvitePlayers: { screen : InvitePlayers }
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
)

// const CampaignNavigator = createStackNavigator(
//   {
//     CampaignSummary: { screen : CampaignSummary },
//     RandomEvent: { screen: RandomEvent },
//     RandomEventResult: { screen: RandomEventResult },
    
//   },
//   {
//     defaultNavigationOptions: {
//       header: null,
//     }
//   }
// )

const CampaignNavigator = createBottomTabNavigator({
  Home: {screen: CampaignSummary},
  Inventory: { screen: Inventory },
  Journal: { screen: Journal }, 
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if(routeName === 'Home') {
        const source = focused ? require('./../../assets/Icons/Home_Active.png') : require('./../../assets/Icons/Home_Inactive.png')
        return <Image source={source} style={{width: 25, height: 25}} />
      } 
      else if (routeName === 'Inventory') {
        const source = focused ? require('./../../assets/Icons/Inventory_Active.png') : require('./../../assets/Icons/Inventory_Inactive.png')
        return <Image source={source} style={{width: 25, height: 25}} />
      }
      else if (routeName === 'Journal') {
        const source = focused ? require('./../../assets/Icons/Journal_Active.png') : require('./../../assets/Icons/Journal_Inactive.png')
        return <Image source={source} style={{width: 25, height: 25}} />
      }

        
    
    },
  }),
  tabBarOptions: {
    activeTintColor: '#45E85D',
    inactiveTintColor: '#FFF',
    inactiveBackgroundColor: "#A92425",
    activeBackgroundColor: "#A92425"
  },
});

const MainApp = createSwitchNavigator(
  {
    MainAppRouter: { screen: MainAppRouter },
    CreateCampaign: { screen : CreateCampaign },
    Lobby : { screen : LobbyNavigator},
    Campaign : { screen : CampaignNavigator },
    RandomEvent: { screen: RandomEvent },
    RandomEventResult: { screen: RandomEventResult },
    Join: {
      screen: AcceptInvite,
      path: 'join'
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: "MainAppRouter"
  }
)


const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthCheck: AuthCheck,
    Auth: {screen: AuthStack, path : ''},
    MainApp: { screen: MainApp, path: ''},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: "AuthCheck"
  }
);




export const AppContainer = createAppContainer( MainSwitchNavigator );