import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import Avatar from './Avatar';

class PlayersList extends React.Component {

  constructor(props) {
    super(props);
  }

  listConditionalRender = () => {
    if (this.props.campaign.players.length >= 1) {
      return (
        <View style={styles.container}>
          {this.props.campaign.players.map(player =>
            <TouchableOpacity
              onPress={() => {this.props.onSelectPlayer(player.id)}}
              key={player.id}>
              <Text
                style={defaultStyleSheet.subHeading}>
                {player.displayName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    // borderColor: 'black',
  },
  list: {
    width: "100%",
  },
});

PlayersList.propTypes = {
  onSelectPlayer: PropTypes.func
}

const doNothing = () => {return;}

PlayersList.defaultProps = {
  onSelectPlayer: doNothing,
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(PlayersList);
