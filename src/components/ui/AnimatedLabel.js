import posed from 'react-native-pose';
import React from 'react';

function AnimatedLabel(props) {
  const AnimatedLabelprops = {
    inInput: {
      scale: 0.9,
      x: 0,
      y: 0,
    },
    aboveInput: { 
      scale: 0.8, 
      x: -10,
      y: -22,
    }
  }
  
  const AnimatedLabel = styled(posed.View(AnimatedLabelProps)``)

}



function TextAlt(props) {
  const StyledText = styled.Text`
  font-family: verdana;
  font-size: ${widthUnit*8};
  line-height: ${widthUnit*6};
  font-size: ${props =>
    (props.size === 'sm' && widthUnit*3.5) ||
    (props.size === 'md' && widthUnit*4.5) ||
    (props.size === 'lg' && widthUnit*5.5) ||
    (widthUnit*4)
  };
  color: ${props => props.color || 'white'};
  fontWeight: ${props => props.weight || 'normal'};
  `
  return (
    <StyledText {...props}>{props.children}</StyledText>
  )
}

export default TextAlt;
