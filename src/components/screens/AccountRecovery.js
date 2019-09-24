import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  // Text,
  View,
  // Image,
  ImageBackground,
  TextInput
  // TouchableOpacity,
  // AsyncStorage
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { phoneNumPrettyPrint } from "../../util/util";
import { MainHeader, /* SubHeader, */ TextAlt, Label } from "../text";
import SingleButtonFullWidth from "../ui/SingleButtonFullWidth";
import posed from "react-native-pose";
// import defaultStyle from "../../styles/defaultStyle";
import constants from "../../constants";
import { /* OpacityContainer, */ ScreenContainer, Footer } from "../containers";
// import { Transition } from "react-navigation-fluid-transitions";

const { c } = constants;
const paint = require("../../../assets/paintstroke/Paint_Stroke_alt.png");

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

class RecoverAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      // recoveryCode: '',
      validNumber: true,
      submitted: false,
      didFocusInput: "inInput"
    };
  }

  handleFocus = () => {
    this.setState({
      didFocusInput: "aboveInput"
    });
  };

  handleBlur = () =>
    this.state.phoneNumber
      ? null
      : this.setState({
          didFocusInput: "inInput"
        });

  _handleRecovery = async () => {
    const { dispatch } = this.props;
    const prettyPhoneNumber = phoneNumPrettyPrint(this.state.phoneNumber);
    console.log("recovery number", prettyPhoneNumber);
    if (prettyPhoneNumber.length === 12) {
      dispatch({
        type: c.RECOVER_ACCOUNT,
        phoneNumber: prettyPhoneNumber
      });
      this.setState({ validNumber: true, submitted: true });
    } else {
      this.setState({ validNumber: false, submitted: true });
    }
  };

  noNumberError = () => {
    if (!this.state.validNumber && this.state.submitted) {
      return (
        <TextAlt>
          Failed to find user. Are you sure you entered the correct number?
        </TextAlt>
      );
    }
    return null;
  };

  render() {
    return (
      <ScreenContainer style={{ backgroundColor: "black" }}>
        <View style={customStyles.headerContainer}>
          <MainHeader style={{ textAlign: "center" }}>
            Account Recovery
          </MainHeader>
          <TextAlt style={{ textAlign: "center" }}>
            You will receive a text to recover your account
          </TextAlt>
        </View>

        <View style={customStyles.body}>
          <ImageBackground
            source={paint}
            resizeMode="stretch"
            overflow="visible"
            style={customStyles.fieldContainer}
          >
            <AnimatedLabel
              pose={this.state.didFocusInput}
              style={[
                customStyles.labelPosition,
                this.state.didFocusInput === "inInput"
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
              onFocus={() => this.handleFocus()}
              onBlur={() => this.handleBlur()}
              value={this.state.phoneNumber}
            />
          </ImageBackground>

          <View style={customStyles.formContainer}>{this.noNumberError()}</View>
        </View>

        <Footer style={{ alignContent: "center" }}>
          <SingleButtonFullWidth
            title="Recover"
            onButtonPress={this._handleRecovery}
            backgroundColor="darkred"
          />
          <View style={customStyles.textButtonContainer}>
            <TextAlt
              size="sm"
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              Go back to{" "}
              <TextAlt color="darkred" weight="bold">
                New Player Sign Up
              </TextAlt>
            </TextAlt>
          </View>
        </Footer>
      </ScreenContainer>
    );
  }
}

RecoverAccountModal.propTypes = {
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(RecoverAccountModal);
