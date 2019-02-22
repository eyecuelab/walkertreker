import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';

class PlayersList extends React.Component {

  constructor(props) {
    super(props);
  }

  listConditionalRender = () => {
    if (this.props.campaign.players.length >= 1) {
      return (
        this.props.campaign.players.map(player =>
          <Text
            style={defaultStyleSheet.label}
            key={player.id}>
            {player.displayName}
          </Text>
        )
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={defaultStyleSheet.label}>No players...</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.listConditionalRender()}
      </View>
    );
  }

}

const defaultStyleSheet = StyleSheet.create(defaultStyle);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
  },
  listItem: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 2,
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(PlayersList);
