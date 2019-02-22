import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, storeData, retrieveData } = constants;

import defaultStyle from '../../styles/defaultStyle';

class CampaignSummary extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={customStyles.container}>
          <Text style={styles.headline}>CAMPAIGN SUMMARY</Text>
          <Text style={styles.headline}>Players</Text>
          <View>
            {this.props.campaign.players.map(player => {
              return (
                <Text key={player.id} style={styles.label}>{player.displayName}</Text>
              )
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle)
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignSummary)
