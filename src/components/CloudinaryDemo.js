import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import Avatar from './ui/Avatar'

class CloudinaryDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cloudinary Demo</Text>
        <Text style={styles.text}>Name: {this.props.player.displayName}</Text>
        <Text style={styles.text}>Phone Number: {this.props.player.phoneNumber}</Text>
        <Avatar player={this.props.player} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkred',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'gore',
  },
});

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(CloudinaryDemo)
