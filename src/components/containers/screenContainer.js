import React from 'react';
import styled from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////

const ScreenContainer = styled.View`
  flex: 1;
  height: 100%;
  margin: ${widthUnit*5}px;
  margin-top: ${heightUnit*6}px;
`;

export default ScreenContainer
