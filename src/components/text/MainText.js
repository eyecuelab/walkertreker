import React from 'react';

import styled, { css } from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////


function MainText(props) {
  const StyledText = styled.Text`
  font-family: Gill Sans MT Condensed;
  line-height: ${widthUnit*7};
  font-size: ${props =>
    (props.size === 'sm' && widthUnit*4.5) ||
    (props.size === 'md' && widthUnit*6) ||
    (props.size === 'lg' && widthUnit*7) ||
    (widthUnit*6)
  };
  letterSpacing: 1.15;
  color: ${props => props.color || 'white'};
  fontWeight: ${props => props.weight || 'normal'};
  `
  return (
    <StyledText {...props}>{props.children}</StyledText>
  )
}

export default MainText;
