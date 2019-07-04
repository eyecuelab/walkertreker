import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { retrieveData } = constants;

class MainAppRouter extends React.Component {
    constructor() {
        super();
      }

    componentDidMount(){
      const {campaign, }
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

export default connect(mapStateToProps)(MainAppRouter);