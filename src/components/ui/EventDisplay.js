import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import ScreenContainer from '../containers/ScreenContainer';  
import { MainText, MainHeader } from './../text';

const event_bg = require('../../../assets/event_bg.png');



class EventDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  handleButtonPress(opt) {
    this.props.onVote(opt)
  }

  render() {
    return (
      <View style={[{backgroundColor: '#6f655b'}, {flex: 1}]}>
      <ImageBackground
        source={event_bg}
        resizeMode={'cover'}
        style={customStyles.randomEventBg}>
        <ScreenContainer>
          <View style={[customStyles.container, { flex: 3 }]}>
            <Text style={customStyles.label}>{this.props.timeLeft}</Text>

            <View style={customStyles.headlineContainer}>
              <MainHeader style={customStyles.header} lineHeight='squish'>Group{'\n'}Decision</MainHeader>
            </View>
            <ScrollView>
              <View style={[customStyles.opacityContainer, customStyles.marginTop]}>
                <MainText style={{ textAlign: "center" }}>{this.props.antecedent}</MainText>
              </View>
            </ScrollView>
          </View>

          <View style={[customStyles.container, { flex: 1, alignContent: 'flex-end', padding: widthUnit }]}>
            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                title={this.props.optionAButton}
                backgroundColor="darkred"
                onButtonPress={() => this.handleButtonPress('A')}
              />
            </View>
            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                title={this.props.optionBButton}
                backgroundColor="darkred"
                onButtonPress={() => this.handleButtonPress('B')}
              />
            </View>
          </View>


        </ScreenContainer>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  header: {
    paddingTop: widthUnit*0.8,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: widthUnit*3.5,
  },
  marginTop: {
    marginTop: heightUnit * 2.5
  },
  label: {
    fontFamily: 'gore',
    fontSize: widthUnit*5,
    color: 'white',
    paddingVertical: widthUnit*2,
  },
})

export default EventDisplay;