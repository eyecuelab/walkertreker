import React, { Component } from "react";
import ToggleBar from "../ui/ToggleBar";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ScreenContainer, OpacityContainer } from "../containers";
import SignInSuccess from "./SignInSuccess";

const widthUnit = wp("1%");
const heightUnit = hp("1%");
const TestScreen = props => <SignInSuccess {...props} />;
export default TestScreen;
