import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import constants from './../../constants';
const { retrieveData } = constants;

class CampaignRouteNavigator extends React.Component {
    constructor() {
        super();
        this.fetchCampaignInfo();
      }
    
    fetchCampaignInfo = async () => {
        const { dispatch } = this.props;
        dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: this.state.localPlayer.campaignId})
    };

    componentDidMount(){
    this.props.campaign.startDate !== null ?
    this.props.navigation.navigate('CampaignSummary') :
    this.props.navigation.navigate('CampaignStaging')
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