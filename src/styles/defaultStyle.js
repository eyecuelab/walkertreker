// use these style rules for all screen components

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const widthUnit = wp('1%');
const heightUnit = hp('1%');
export default defaultStyle = {
  // default wrapper for screen components
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: widthUnit*5,
    marginTop: heightUnit*7,
  },
  // text styles
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit*12,
    lineHeight: widthUnit*12,
    paddingTop: widthUnit*3,
    color: 'white',
  },
  subHeading: {
    fontFamily: 'gore',
    fontSize: widthUnit*8,
    lineHeight: widthUnit*6,
    paddingTop: widthUnit*5,
    color: 'white',
    textShadowColor: '#222',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  subHeadingBlack: {
    fontFamily: 'gore',
    fontSize: widthUnit*8,
    lineHeight: widthUnit*6,
    paddingTop: widthUnit*5,
    color: 'black',
  },
  label: {
    fontFamily: 'gore',
    fontSize: widthUnit*5,
    color: 'white',
  },
  labelBlack: {
    fontFamily: 'gore',
    fontSize: widthUnit*5,
    color: 'black',
  },
  plainText: {
    fontFamily: 'verdana',
    fontSize: widthUnit*4.7,
    color: 'white',
    lineHeight: 24,
  },
  detail: {
    fontFamily: 'verdana',
    fontSize: widthUnit*3.5,
    color: 'white',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: widthUnit*2,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}
