import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';

export default class SingleButtonFullWidth extends React.Component {

  render() {
    return(
      <TouchableHighlight
        style={[customStyles.container, {backgroundColor: this.props.backgroundColor}, {margin: this.props.margin || 0}]}
        onPress={this.props.onButtonPress}
      >
        <Text style={styles.label}>{this.props.title}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

SingleButtonFullWidth.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  onButtonPress: PropTypes.func,
}
