import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, } from 'react-native';

import ButtonToggle from './ButtonToggle';
import defaultStyle from '../../styles/defaultStyle';

const bg1 = require('../../../assets/buttontexture1.png');
const bg2 = require('../../../assets/buttontexture2.png');
const bg3 = require('../../../assets/buttontexture3.png');

export default class ThreeInfoSquares extends React.Component {

  // TODO: feed all the ButtonToggles an 'isRed' and an 'isGreen' prop as a boolean

  _percentColor = () => {
    const val = parseInt(this.props.button1value.slice(0, -1));
    if (val < 50) {
      return 'red';
    } else if (val > 100) {
      return 'green';
    } else {
      return 'white'
    }
  }

  _healthColor = () => {
    const val = this.props.button2value;
    if (val === 'Poor') {
      return 'red';
    } else if (val === 'Good') {
      return 'green';
    } else {
      return 'white';
    }
  }

  _hungerColor = () => {
    const val = this.props.button3value;
    if (val === 'Starving') {
      return 'red';
    } else if (val === 'Full') {
      return 'green'
    } else {
      return 'white';
    }
  }

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
              bigValue={this.props.bigValue}
              color={this._percentColor()} />
          </View>

          <View style={threeInfoSquaresStyles.square}>
            <ButtonToggle
              background={bg2}
              value={this.props.button2value}
              label={this.props.button2label}
              bigValue={this.props.bigValue}
              color={this._healthColor()} />
          </View>

          <View style={threeInfoSquaresStyles.square}>
            <ButtonToggle
              background={bg3}
              value={this.props.button3value}
              label={this.props.button3label}
              bigValue={this.props.bigValue}
              color={this._hungerColor()} />
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
