import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ButtonToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggle = this.props.active ? styles.active : styles.inactive;
    const valueFontStyle = this.props.bigValue ? styles.bigValue : styles.value;
    const activeTint = this.props.active ? 'white' : 'black';
    const color = (color) => {
      if (color == 'red') {
        return styles.red;
      } else if (color == 'green') {
        return styles.green;
      } else {
        return;
      }
    };

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={this.props.background} tintColor={activeTint}>
        <View style={[styles.container, toggle]} >
          <View style={styles.valueContainer}>
            <Text style={[toggle, valueFontStyle, color(this.props.color)]}>{this.props.value}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, toggle]}>{this.props.label}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

ButtonToggle.propTypes = {
  value: PropTypes.string,
  bigValue: PropTypes.bool,
  label: PropTypes.string,
  active: PropTypes.bool,
  background: PropTypes.any,
};

ButtonToggle.defaultProps = {
  active: false,
  bigValue: false,
};

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  active: {
    color: 'darkred',
  },
  inactive: {
    color: 'white',
  },
  valueContainer: {
    flex: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontFamily: 'gore',
    fontSize: widthUnit*6,
  },
  bigValue: {
    fontFamily: 'gore',
    fontSize: widthUnit*9,
  },
  label: {
    fontFamily: 'gore',
    fontSize: widthUnit*4,
  },
  red: {
    color: 'darkred'
  },
  green: {
    color: '#68ae5b'
  },
});
