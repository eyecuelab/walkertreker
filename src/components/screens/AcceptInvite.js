import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Linking } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

class AcceptInvite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaignId: this.props.navigation.getParam('campaignId')
    }
  }

  componentDidMount = async () => {

  }

  componentDidUpdate = async () => {

  }

  render() {
    return(
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <Text style={styles.headline}>Accept{"\n"}Invite{"\n"}Screen</Text>
          <Text style={styles.label}>campaignId: {this.state.campaignId} </Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({

})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(AcceptInvite);
