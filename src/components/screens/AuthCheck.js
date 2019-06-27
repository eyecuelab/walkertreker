import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import constants from './../../constants';
import {connect} from 'react-redux';

const { c, retrieveData } = constants;

class AuthCheck extends React.Component {
  constructor(props) {
    super(props);
    // this.checkForPlayerInStorage();
  }

  componentWillMount = async () => {
    const {player, campaign} = this.props;
    console.log("++++++++++ Current state campaign state is ++++++++++ \n" + JSON.stringify(campaign || {hello: 'failure'}))
    console.log("++++++++++ Current state player state is ++++++++++ \n" + JSON.stringify(player || {hello: 'failure'}))
    
    player.id && campaign.id ?
    this.props.navigation.navigate('Campaign') :
    this.props.navigation.navigate(player.id ? 'Setup' : 'Auth');
  };
  
  componentDidUpdate() {
  }

  // Render any loading content that you like here
  render() {
    console.log('rendered auth check')
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

const mapStateToProps = (state) => {
  return {
    player: state.player,
    campaign: state.campaign
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayer: (playerId) => dispatch({ type: c.FETCH_PLAYER, playId: playerId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);
