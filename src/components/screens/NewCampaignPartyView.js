import React from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';

import defaultStyle from '../../styles/defaultStyle';

export default class NewCampaignPartyView extends React.Component {

  constructor(props) {
    super(props);
    const game = this.props.navigation.getParam('game');
    this.state = { game, invites: {}, }
    console.log(this.state);
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%',}}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.game.id}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
