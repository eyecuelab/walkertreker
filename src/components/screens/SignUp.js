import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  // Text,
  View,
  // Image,
  ImageBackground,
  TextInput
  // Animated,
  // Easing
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { MainHeader, /* SubHeader, */ Label, TextAlt } from "../text";
import { phoneNumPrettyPrint } from "../../util/util";
// import WithKeyboardShift from "../../util/WithKeyboardShift";

import { Transition } from "react-navigation-fluid-transitions";
import { /* OpacityContainer, */ ScreenContainer, Footer } from "../containers";

import posed from "react-native-pose";
import ButtonWithLoading from "../ui/Buttons/ButtonWithLoading";
import constants from "../../constants";
import SignInSuccess from "./SignInSuccess";

const paint = require("../../../assets/paintstroke/Paint_Stroke3_alt.png");
const paint2 = require("../../../assets/paintstroke/Paint_Stroke_alt.png");

const { c } = constants;
// const use_item_bg = require("../../../assets/use_item_bg.png");

// const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  fieldContainer: {
    padding: 6,
    marginBottom: heightUnit * 3
  },
  headerContainer: {
    marginTop: heightUnit * 4
  },
  textButtonContainer: {
    marginTop: heightUnit * 3,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    justifyContent: "center",
    alignContent: "center",
    flex: 2
  },
  textInput: {
    width: "100%",
    marginTop: 5,
    paddingTop: heightUnit * 1,
    paddingBottom: heightUnit * 2,
    paddingLeft: widthUnit * 1,
    color: "white",
    fontFamily: "gore",
    fontSize: widthUnit * 6,
    zIndex: 0,
    marginLeft: 20
  },
  labelPosition: {
    position: "absolute",
    bottom: heightUnit * 2,
    left: widthUnit * 1.8,
    padding: 2,
    zIndex: 1
  }
});

const AnimatedLabel = posed.View({
  inInput: {
    scale: 1,
    x: 0,
    y: 0
  },
  aboveInput: {
    scale: 0.6,
    x: -30,
    y: -25
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      phoneNumber: "",
      avatar: require("../../../assets/blankavatar.png"), // eslint-disable-line global-require
      recoveryText: "Aleady have an account?",
      recoveryTextBold: "Recover it here",
      didFocusPhone: "inInput",
      didFocusName: "inInput",
      newPlayerCreated: false,
      isLoading: false,
      signInSuccess: false
    };
    this.animationInterval = null;
  }
  /* eslint-disable */
  componentDidUpdate(prevProps /* , prevState */) {
    const { auth } = this.props;
    if (prevProps.auth.gettingPlayerId && !auth.gettingPlayerId) {
      this.setState({ isLoading: false }); // eslint-disable-line react/no-did-update-set-state
    }
    if (
      !auth.gettingPlayerId &&
      !auth.gettingCampaignId &&
      !this.state.signInSuccess
    ) {
      this.props.player.id // eslint-disable-line
        ? this.setState({ signInSuccess: true }) // eslint-disable-line react/no-did-update-set-state
        : this.state.newPlayerCreated
        ? this.recoveryText()
        : null;
    }
  }
  /* eslint-disable */

  navigateToMain() {
    this.props.navigation.navigate("MainApp");
  }

  recoveryText = () => {
    if (this.state.recoveryText !== "Signup failed. Try again, or ") {
      this.setState({ recoveryText: "Signup failed. Try again, or " });
    }
    if (this.state.recoveryTextBold !== "click here to recover an account.") {
      this.setState({ recoveryTextBold: "click here to recover an account." });
    }
  };

  _handleSubmit = async () => {
    this.setState({ isLoading: true });
    const { dispatch } = this.props;
    const prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber);
    console.log("handle submit for", prettyPhoneNumber);
    if (prettyPhoneNumber.length === 12) {
      const pushToken = await this.registerForPushNotificationsAsync();
      dispatch({ type: c.GETTING_PLAYERID, gettingPlayerId: true });
      dispatch({
        type: c.CREATE_PLAYER,
        name: this.state.displayName,
        number: prettyPhoneNumber,
        avatar: this.state.avatar,
        pushToken,
        isVisible: true
      });
      this.state.newPlayerCreated // eslint-disable-line
        ? null
        : this.setState({ newPlayerCreated: true });
    } else {
      await this.setState({
        recoveryText: "Are you sure you entered your phone number correctly?"
      });
    }
  };

  handleFocus = type => {
    type === "phone"
      ? this.setState({
          didFocusPhone: "aboveInput"
        })
      : this.setState({
          didFocusName: "aboveInput"
        });
  };

  handleBlur = type => {
    type === "phone" // eslint-disable-line
      ? this.state.phoneNumber
        ? null
        : this.setState({
            didFocusPhone: "inInput"
          })
      : this.state.displayName
      ? null
      : this.setState({
          didFocusName: "inInput"
        });
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return undefined;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  };

  _pickImage = async () => {
    const avatar = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (!avatar.cancelled) {
      this.setState({ avatar });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {this.state.signInSuccess ? (
          <SignInSuccess
            navigation={this.props.navigation}
            player={this.props.player.displayName}
          />
        ) : (
          <ScreenContainer>
            <View style={customStyles.headerContainer}>
              <MainHeader style={{ textAlign: "center" }}>
                New Player
              </MainHeader>
            </View>

            <View style={customStyles.body}>
              <ImageBackground
                source={paint}
                resizeMode="stretch"
                overflow="visible"
                style={customStyles.fieldContainer}
              >
                <AnimatedLabel
                  pose={this.state.didFocusName}
                  style={[
                    customStyles.labelPosition,
                    this.state.didFocusName === "inInput"
                      ? { zIndex: 0 }
                      : { zIndex: 1 }
                  ]}
                >
                  <Label>Display Name</Label>
                </AnimatedLabel>
                <TextInput
                  style={customStyles.textInput}
                  onChangeText={text => this.setState({ displayName: text })}
                  onFocus={() => this.handleFocus("name")}
                  onBlur={() => this.handleBlur("name")}
                  value={this.state.displayName}
                />
              </ImageBackground>

              <Transition shared="phoneInput">
                <ImageBackground
                  source={paint2}
                  resizeMode="stretch"
                  overflow="visible"
                  style={customStyles.fieldContainer}
                >
                  <AnimatedLabel
                    pose={this.state.didFocusPhone}
                    style={[
                      customStyles.labelPosition,
                      this.state.didFocusPhone === "inInput"
                        ? { zIndex: 0 }
                        : { zIndex: 1 }
                    ]}
                  >
                    <Label>Phone Number</Label>
                  </AnimatedLabel>

                  <TextInput
                    style={customStyles.textInput}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    onChangeText={text => this.setState({ phoneNumber: text })}
                    onFocus={() => this.handleFocus("phone")}
                    onBlur={() => this.handleBlur("phone")}
                    value={this.state.phoneNumber}
                  />
                </ImageBackground>
              </Transition>
            </View>

            <Footer style={{ alignContent: "center" }}>
              <View style={{ height: heightUnit * 8 }}>
                <ButtonWithLoading
                  isLoading={this.state.isLoading}
                  title="Submit"
                  onButtonPress={this._handleSubmit}
                  backgroundColor="darkred"
                />
              </View>

              <View style={customStyles.textButtonContainer}>
                <TextAlt
                  size="sm"
                  onPress={() => {
                    this.props.navigation.navigate("AccountRecovery");
                  }}
                >
                  {this.state.recoveryText}
                  <TextAlt color="darkred" weight="bold">
                    {" "}
                    {this.state.recoveryTextBold}
                  </TextAlt>
                </TextAlt>
              </View>
            </Footer>
          </ScreenContainer>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
    redirect: state.redirect,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(SignUp);

SignUp.propTypes = {
  player: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};
