import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import { MainText, SubHeader, TextAlt, Label, MainHeader } from './../text';
import ScreenContainer from '../containers/ScreenContainer';  

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');


class EventResultDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupVotes: false,
    }
  }

  _toggleGroupVotes = () => {
   this.setState({ showGroupVotes: !this.state.showGroupVotes })
  }

  conditionalShowVotes = () => {
    console.log
    if (!this.state.showGroupVotes) {
      return (<View style={[customStyles.opacityContainer, customStyles.marginTop]}>
                <MainText>{this.props.resultText}</MainText>
              </View>)
    // } else {
    } else if (this.props.votesList.length) {
      return (<View style={[customStyles.opacityContainer, customStyles.marginTop]}>
              {this.props.votesList.map((entry, index) => {
                  return (<MainText style={customStyles.text} key={index} size='lg'>{entry}</MainText>)
                })}
              </View>)
    } else {
      return (<View style={[customStyles.opacityContainer, customStyles.marginTop]}>
                <MainText>No one in your group voted in time! Indecision itself is a decision when the dead walk. </MainText>
              </View>)
    }
  }
  
  render() {
    return (
      <ImageBackground
        source={event_bg}
        resizeMode={'cover'}
        style={customStyles.randomEventBg}>
        <ScreenContainer>


            <View style={[customStyles.container, { flex: 3 }]}>

              <View style={customStyles.headlineContainer}>
                <MainHeader style={customStyles.header}>Your group decided to {this.props.resultHeader}</MainHeader>
              </View>

              {this.conditionalShowVotes()}
            </View>

          {<TwoButtonOverlay
            button1title="See Group Votes"
            button1onPress={this._toggleGroupVotes}
            button2title="Campaign"
            button2onPress={() => this.props.navigateBack()}
          />}

        </ScreenContainer>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)', 
    padding: widthUnit*3.5,
  },
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    fontSize: widthUnit*9.5,
    marginTop: widthUnit*3,
  },
  text: {
    fontFamily: 'Gill Sans MT Condensed',
    lineHeight: heightUnit * 3.75,
    fontSize: widthUnit*5.5,
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
  marginTop: {
    marginTop: heightUnit * 3.5
  }
})

export default EventResultDisplay;