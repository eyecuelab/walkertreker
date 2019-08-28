import React from "react";

import styled, { css } from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const widthUnit = wp("1%");
const heightUnit = hp("1%");

function TextAlt(props) {
  const StyledText = styled.Text`
    font-family: verdana;
    font-size: ${widthUnit * 8};
    line-height: ${widthUnit * 6};
    font-size: ${p =>
      (p.size === "sm" && widthUnit * 3.5) ||
      (p.size === "md" && widthUnit * 4.5) ||
      (p.size === "lg" && widthUnit * 5.5) ||
      widthUnit * 4};
    color: ${p => p.color || "white"};
    fontweight: ${p => p.weight || "normal"};
  `;
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default TextAlt;
