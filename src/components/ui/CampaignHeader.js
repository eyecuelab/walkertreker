import React, { Component } from 'react';
import { View } from 'react-native';
import { MainHeader } from './../text';
import DayCounter from './DayCounter';

import { connect } from 'react-redux';

class CampaignHeader extends Component {
  render() {
    return (
      <View>
        <DayCounter campaign={this.props.campaign} />
        <MainHeader style={{textAlign: "center"}}>{this.props.title}</MainHeader>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { campaign: state.campaign }
}

export default connect(mapStateToProps)(CampaignHeader);