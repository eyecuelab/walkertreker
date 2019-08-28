/* eslint-disable global-require */
import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createFluidNavigator } from "react-navigation-fluid-transitions";
import constants from "../constants";
import { Image, ImageBackground } from "react-native";

// screens
import CreateCampaign from "../components/screens/CreateCampaign";
import InvitePlayers from "../components/screens/InvitePlayers";
import CampaignStaging from "../components/screens/CampaignStaging";
import AcceptInvite from "../components/screens/AcceptInvite";
import WaitForStart from "../components/screens/WaitForStart";
import CampaignSummary from "../components/screens/CampaignSummary";
import Safehouse from "../components/screens/Safehouse";
import EndOfDaySummary from "../components/screens/EndOfDaySummary";
import Inventory from "../components/screens/Inventory";
import Journal from "../components/screens/Journal";
import RandomEvent from "../components/screens/RandomEvent";
import RandomEventResult from "../components/screens/RandomEventResult";
import CampaignIsLost from "../components/screens/CampaignIsLost";
import CampaignIsWon from "../components/screens/CampaignIsWon";
import RecoverAccount from "../components/screens/RecoverAccount";
import AuthCheck from "../components/screens/AuthCheck";
import SignUp from "../components/screens/SignUp";
import AccountRecovery from "../components/screens/AccountRecovery";
import MainAppRouter from "../components/screens/MainAppRouter";
import Lobby from "../components/screens/Lobby";
import TEST_SCREEN from "../components/screens/TEST_SCREEN";
import Stats from "../components/screens/Stats";

const use_item_bg = require("../../assets/use_item_bg.png");

const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index];
  const outputOpacity = [0, 1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });

  return {
    opacity: transition
  };
};

const SlideTransistion = (index, position, layout) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [layout.initWidth, 0, -layout.initWidth];

  const transition = position.interpolate({
    inputRange,
    outputRange
  });

  return {
    transform: [{ translateX: transition }]
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const { position, scene, layout } = sceneProps;
      const { index } = scene;

      return SlideTransistion(index, position, layout);
    }
  };
};

const AuthStack = createStackNavigator(
  {
    SignUp,
    AccountRecovery
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    transparentCard: true,
    transitionConfig: NavigationConfig
  }
);

class AuthStackWithBackground extends React.Component {
  static router = AuthStack.router;
  render() {
    const { navigation } = this.props;

    return (
      <ImageBackground
        source={use_item_bg}
        resizeMode="cover"
        style={{ flex: 1, jusifyContent: "flexStart" }}
      >
        <AuthStack navigation={navigation} />
      </ImageBackground>
    );
  }
}

const LobbyNavigator = createStackNavigator(
  {
    Lobby: { screen: Lobby },
    CampaignStaging: { screen: CampaignStaging },
    WaitForStart: { screen: WaitForStart },
    InvitePlayers: { screen: InvitePlayers }
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    transitionConfig: NavigationConfig
  }
);

const CampaignNavigator = createBottomTabNavigator(
  {
    Home: { screen: CampaignSummary },
    Stats: { screen: Stats },
    Inventory: { screen: Inventory },
    Journal: { screen: Journal }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          const source = focused
            ? require("../../assets/Icons/Home_Active.png")
            : require("../../assets/Icons/Home_Inactive.png");
          return <Image source={source} style={{ width: 25, height: 25 }} />;
        }
        if (routeName === "Stats") {
          const source = focused
            ? require("../../assets/Icons/Stats_Active.png")
            : require("../../assets/Icons/Stats_Inactive.png");
          return <Image source={source} style={{ width: 25, height: 25 }} />;
        }
        if (routeName === "Inventory") {
          const source = focused
            ? require("../../assets/Icons/Inventory_Active.png")
            : require("../../assets/Icons/Inventory_Inactive.png");
          return <Image source={source} style={{ width: 25, height: 25 }} />;
        }
        if (routeName === "Journal") {
          const source = focused
            ? require("../../assets/Icons/Journal_Active.png")
            : require("../../assets/Icons/Journal_Inactive.png");
          return <Image source={source} style={{ width: 20, height: 25 }} />;
        }
        return null;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#45E85D",
      inactiveTintColor: "#FFF",
      inactiveBackgroundColor: "#6E0E0F",
      activeBackgroundColor: "#6E0E0F",
      showLabel: false,
      style: {
        height: 50,
        elevation: 4,
        borderTopWidth: 0
      }
    }
  }
);

const MainApp = createSwitchNavigator(
  {
    MainAppRouter: { screen: MainAppRouter },
    CreateCampaign: { screen: CreateCampaign },
    Lobby: { screen: LobbyNavigator },
    Campaign: { screen: CampaignNavigator },
    RandomEvent: { screen: RandomEvent },
    RandomEventResult: { screen: RandomEventResult },
    Join: {
      screen: AcceptInvite,
      path: "join"
    },
    Safehouse: { screen: Safehouse },
    CampaignIsWon: {
      screen: CampaignIsWon,
      path: "campaignIsWon"
    },
    CampaignIsLost: {
      screen: CampaignIsLost,
      path: "campaignIsLost"
    },
    EndOfDaySummary: {
      screen: EndOfDaySummary,
      path: "endOfDaySummary"
    },
    RecoverAccount: {
      screen: RecoverAccount,
      path: "recovery"
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    initialRouteName: "MainAppRouter",
    transparentCard: true
  }
);

const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthCheck,
    Auth: { screen: AuthStackWithBackground, path: "" },
    MainApp: { screen: MainApp, path: "" },
    TEST_SCREEN: { screen: TEST_SCREEN }
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    initialRouteName: "AuthCheck"
  }
);

export const AppContainer = createAppContainer(MainSwitchNavigator); // eslint-disable-line import/prefer-default-export
