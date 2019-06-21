import React from 'react';
import styled from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////

const StyledText = styled.Text`
  font-family: gore;
  font-size: ${widthUnit*5};
  color: ${props => props.color || "white"};
`;

function Label(props) {
  return (
    <StyledText {...props}>{props.children}</StyledText>
  )
}

export default Label;
