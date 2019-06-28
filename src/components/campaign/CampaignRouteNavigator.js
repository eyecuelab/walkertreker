import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import constants from './../../constants';
const { retrieveData } = constants;
import { withNavigation } from "react-navigation";


class CampaignRouteNavigator extends React.Component {
    constructor() {
        super();
      }


  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.campaign.startDate !== null ?
      this.props.navigation.navigate('CampaignSummary') :
      this.props.navigation.navigate('CampaignStaging')
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Hello</Text>
        <StatusBar barStyle="default" />
      </View>
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
    }
}

export default connect(mapStateToProps)(CampaignRouteNavigator);