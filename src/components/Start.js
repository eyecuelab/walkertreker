import React from 'react';
import { ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount = () => {

    console.log('start screen')
    const path = this.props.screenProps.path
    const params = this.props.screenProps.queryParams
    console.log('path: ', path)
    if (path === 'invite') {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AcceptInvite', params })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    // if player is in a game ==> navigate to campaign screen
    // if player is in a pending game ==> navigate to staging screen

    else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'About' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
      </ImageBackground>
    )
  }
}
