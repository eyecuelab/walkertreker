import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { retrieveData } = constants;

import { NavigationEvents } from 'react-navigation';


class MainAppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.handleRedirect();
  }

  handleRedirect() {
    const redirectAction = this._checkForRedirectAction();
    const { campaign, navigation, dispatch } = this.props;
      if( redirectAction ) {
        navigation.navigate(redirectAction);
        dispatch({ type: c.CLEAR_REDIRECT_ACTION });
      } else if( !campaign.id ) {
        navigation.navigate("CreateCampaign");
      } else if(campaign.startDate) {
        navigation.navigate("Campaign");
      } else {
        navigation.navigate("Lobby");
      }
  }

  _checkForRedirectAction() {
    console.log("IN REDIRECT ACTION")
    const { redirect, navigation } = this.props;
    if (redirect.path) {
      return navigation.dangerouslyGetParent().router.getActionForPathAndParams(redirect.path, redirect.queryParams);
    } else if (redirect.redirectAction) {
      return redirect.redirectAction;
    }
  }

  render() {
    return (
      <Text>There some text from MainAppRouter here</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
    return {
      player: state.player,
      campaign: state.campaign,
      redirect: state.redirect
    }
}

export default connect(mapStateToProps)(MainAppRouter);