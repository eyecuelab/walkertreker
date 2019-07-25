import React from 'react';
import MainText from './MainText';
import { StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class TextWithBackground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
    }
  }

  componentWillMount(){
    this.setState({ image: this.props.image })
  }

  render() {
    return (
      <ImageBackground source={this.state.image}
                  resizeMode={'stretch'}
                  style={customStyles.bg}
                  overflow='visible'>
        <MainText style={customStyles.text}>{this.props.text}</MainText>
      </ImageBackground>
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  bg: {
    width: '100%',
    height: undefined,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: widthUnit*4,
    marginVertical: widthUnit*-1,
  },
  text: {
    fontFamily: 'Gill Sans MT Condensed Bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
})

export default TextWithBackground;