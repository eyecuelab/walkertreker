import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';
import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');



class EventResultDisplay extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
        <ImageBackground
          source={this.props.backgroundImage}
          style={{width: '100%', height: '100%'}} >
          <View style={styles.container}>
    
              <View style={{width: '100%', height: '100%'}}>
                <ImageBackground
                  source={event_bg}
                  resizeMode={'cover'}
                  style={customStyles.randomEventBg}>
    
                  <View style={{flex: 4, backgroundColor: 'rgba(0,0,0,0.4)', padding: widthUnit*5}}>
                    <View style={[customStyles.container, {flex: 3}]}>
                      <Text style={styles.label}>{this.props.timeLeft}</Text>
    
                      <View style={customStyles.headlineContainer}>
                        <Text style={styles.headline}>Group{'\n'}Decision{'\n'}Result</Text>
                      </View>
    
                      <View style={[customStyles.textContainer, customStyles.marginTop]}>
                        <Text style={[styles.plainText, customStyles.text]}>{this.props.event.optionAText}</Text>
                      </View>
                    </View>

                  </View>
    
    
                </ImageBackground>
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
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit * 12,
    lineHeight: widthUnit * 9,
    paddingTop: widthUnit * 3,
    color: 'white',
  },
  textContainer: {
    // marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    lineHeight: heightUnit * 3.75,
  },
  container: {
    // margin: widthUnit*2,
    flex: 1,
    justifyContent: 'flex-start',

  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,

    justifyContent: 'flex-start',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit * 2,
  },
  marginTop: {
    marginTop: heightUnit * 2.5
  }
})

export default EventResultDisplay;