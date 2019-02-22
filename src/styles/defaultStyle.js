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
    marginTop: heightUnit*5,
  },
  // text styles
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit*12,
    lineHeight: widthUnit*9,
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
  label: {
    fontFamily: 'gore',
    fontSize: widthUnit*5,
    color: 'white',
  },
  plainText: {
    fontFamily: 'verdana',
    fontSize: widthUnit*5,
    color: 'white',
    lineHeight: 24,
  },
  detail: {
    fontFamily: 'verdana',
    fontSize: widthUnit*3.5,
    color: 'white',
  },
}
