import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, } from 'react-native';

import ButtonToggle from './ButtonToggle';
import defaultStyle from '../../styles/defaultStyle';

const bg1 = require('../../../assets/buttontexture1.png');
const bg2 = require('../../../assets/buttontexture2.png');
const bg3 = require('../../../assets/buttontexture3.png');

export default class ThreeInfoSquares extends React.Component {

  render() {
    return (
      <View style={threeInfoSquaresStyles.container} >
        <Text style={[styles.label, {margin: 5, marginBottom: 0}]}>{this.props.title}</Text>

        <Text style={[styles.detail, {margin: 5}]}>{this.props.subtitle}</Text>

        <View style={threeInfoSquaresStyles.squareContainer}>

          <View style={threeInfoSquaresStyles.square}>
            <ButtonToggle
              background={bg1}
              value={this.props.button1value}
              label={this.props.button1label}
              bigValue={this.props.bigValue} />
          </View>

          <View style={threeInfoSquaresStyles.square}>
            <ButtonToggle
              background={bg2}
              value={this.props.button2value}
              label={this.props.button2label}
              bigValue={this.props.bigValue} />
          </View>

          <View style={threeInfoSquaresStyles.square}>
            <ButtonToggle
              background={bg3}
              value={this.props.button3value}
              label={this.props.button3label}
              bigValue={this.props.bigValue} />
          </View>

        </View>
      </View>
    );
  }
}

ThreeInfoSquares.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleColor: PropTypes.string,
  bigValue: PropTypes.bool,
  button1value: PropTypes.string,
  button1label: PropTypes.string,
  button2value: PropTypes.string,
  button2label: PropTypes.string,
  button3value: PropTypes.string,
  button3label: PropTypes.string,
};

ThreeInfoSquares.defaultTypes = {
  bigValue: false,
}

const styles = StyleSheet.create(defaultStyle);
const width = (99/3).toString() + "%";
const threeInfoSquaresStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  squareContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  square: {
    width,
    aspectRatio: 1.5,
  },
});
