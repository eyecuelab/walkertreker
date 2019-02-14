import React from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
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

    }
  }

  componentDidMount = async () => {
    const { path, queryParams } = await Linking.parseInitialURLAsync()
    this.setState({ campaignId: queryParams.campaignId })
  }

  render() {
    return(
      <Text>Accept Invite to campaign {this.state.campaignId}</Text>
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
