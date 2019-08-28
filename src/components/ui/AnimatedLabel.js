import posed from "react-native-pose";
import React from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function AnimatedLabel(props) {
  const AnimatedLabelprops = {
    inInput: {
      scale: 0.9,
      x: 0,
      y: 0
    },
    aboveInput: {
      scale: 0.8,
      x: -10,
      y: -22
    }
  };

  const MyAnimatedLabel = styled(posed.View(AnimatedLabelprops)``);
}

const widthUnit = wp("1%");

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
