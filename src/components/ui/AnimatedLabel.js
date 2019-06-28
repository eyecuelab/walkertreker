import posed from 'react-native-pose';
import React from 'react';


const AnimatedLabel = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ isVisible }) => (
  <AnimatedLabel
    style={{ width: 100, height: 100, backgroundColor: "red" }}
    pose={isVisible ? "visible" : "hidden"}
  />
);
