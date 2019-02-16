import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Linking } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';

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
    console.log(`============AcceptInvite.js============`)
    console.log(`===========componentDidMount===========`)
    console.log(`=======================================`)
    // const { campaignId } = this.props.navigation.getParam('campaignId')
    // console.log('CampaignId: ', campaignId)
    console.log(`============AcceptInvite.js============`)
    console.log(`===========componentDidMount===========`)
    console.log(`=======================================`)
  }

  componentDidUpdate = async () => {
    // console.log(`==========================`)
    // console.log(`====componentDidUpdate====`)
    // console.log(`==========================`)
    // const { path, queryParams } = await Linking.parseInitialURLAsync()
    // const url = Linking.makeUrl('invite', { displayName: 'hi_im_joe' })
    // const { path, queryParams } = Linking.parse(url)
    // console.log(url)
    // console.log(`path: ${path}`)
    // console.log(`queryParams: ${queryParams}`)
    // console.log(`displayName: ${queryParams.displayName}`)
    // console.log(`==========================`)
    // console.log(`====componentDidUpdate====`)
    // console.log(`==========================`)
  }

  render() {
    return(
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={customStyles.container}>
          <Text style={styles.headline}>Accept Invite Screen </Text>
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
  container: {
    marginTop: 50,
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(AcceptInvite);
