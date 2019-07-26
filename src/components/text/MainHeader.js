import React from 'react';
import styled from 'styled-components/native';

//////////////////////////////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////////////////////////////////

const StyledText = styled.Text`
  font-family: gore;
  font-size: ${widthUnit*10.5};
  ${props =>
    (props.lineHeight === 'squish' && `line-height: ${widthUnit*9}`)
  };
  color: ${props => props.color || "white"};
`;

class MainHeader extends React.Component {
  render(){
    return (
      <StyledText {...this.props}>{this.props.children}</StyledText>
    )
  }
}


export default MainHeader;

// line-height: ${props =>
//   (props.lineHeight === 'squish' && widthUnit*10) ||
//   widthUnit*13
// };