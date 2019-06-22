import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c } = constants;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';

const victory_bg = require('../../../assets/victory_bg.png');

// import data from '../../constants/endofcampaigndummydata'

class CampaignIsWon extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.navigation.getParam('data')
    const finalCampaignState = {DayCounter: 10}
    this.state = { finalCampaignState,  }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={{width: '100%', height: '100%'}}>
            <ImageBackground
              source={victory_bg}
              resizeMode={'cover'}
              style={customStyles.bgImage}
            >
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: widthUnit*5}}>
                <View style={customStyles.headerContainer}>
                  <DayCounter campaign={this.state.finalCampaignState} />
                  <Text style={styles.headline}>Military{"\n"}Check{"\n"}Point</Text>
                </View>
                <View style={customStyles.contentContainer}>
                  <Text style={styles.plainText}>You've finally made it to the military zone! For now, you can take a short breath of relief from your long journey. {"\n \n"}While the military check point is protected, it is not completely safe. As you go over the routes with the captain, you cast your eyes towards the mountains in the distance. "Not much further now," you think to yourself, "we'll finally reunite at the safe haven."</Text>
                </View>
                <View style={customStyles.buttonContainer}>
                  <SingleButtonFullWidth
                    title="Start Another Journey"
                    backgroundColor="darkred"
                    onButtonPress={() => this.props.navigation.navigate('About')}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    marginBottom: heightUnit*2,
    width: '100%',
  },
  contentContainer: {
    // paddingTop: heightUnit,
    // paddingBottom: heightUnit,
    flex: 3,
    width: '100%',
    marginTop: heightUnit*2.5,
    marginBottom: heightUnit*2.5
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buttonContainer: {
    // marginTop: heightUnit*5,
    // marginBottom: heightUnit*5,
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignIsWon)
