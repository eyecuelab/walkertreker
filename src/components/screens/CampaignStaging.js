import React from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';

export default class CampaignStaging extends React.Component {
  constructor(props) {
    super(props);
    const game = this.props.navigation.getParam('game');
    const invites = this.props.navigation.getParam('invites');
    console.log(game);
    console.log(invites);
    this.state = {
      game,
      invites,
    };

  }

  render() {
    return(
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={customStyles.contentContainer}>
            <View style={customStyles.headerContainer}>
              <Text style={styles.headline}>Campaign Party</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  // contentContainer: {
  //   width: '100%',
  //   height: '90%',
  //   paddingBottom: 10,
  // },
  // headerContainer: {
  //
  // },
});
