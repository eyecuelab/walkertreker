import React from 'react';
import { DotIndicator } from 'react-native-indicators';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    return isLoading ? <DotIndicator color="darkred" size={14}/> : <Component {...props} />;
  }
}

export default WithLoading;