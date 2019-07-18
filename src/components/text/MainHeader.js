import React from 'react';
import styled from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////

const StyledText = styled.Text`
  font-family: gore;
  font-size: ${widthUnit*12};
  padding-top: ${widthUnit*3};
  color: ${props => props.color || "white"};
`;

function MainHeader(props) {
  return (
    <StyledText {...props}>{props.children}</StyledText>
  )
}

export default MainHeader;
