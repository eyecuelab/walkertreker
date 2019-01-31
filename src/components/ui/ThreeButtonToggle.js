import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';

import ButtonToggle from './ButtonToggle';
import defaultStyle from '../../styles/defaultStyle';

const bg1 = require('../../../assets/buttontexture1.png');
const bg2 = require('../../../assets/buttontexture2.png');
const bg3 = require('../../../assets/buttontexture3.png');

export default class ThreeButtonToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFlags: [true, false, false]
    }
  }

  _toggleActiveFlags(num) {
    const opts = [0,1,2];
    const newFlags = opts.map(opt => {
      if (opt == num) { return true; }
      else { return false; }
    });
    this.setState({ activeFlags: newFlags, });
  }

  render() {
    return (
      <View style={threeButtonToggleStyles.container} >
        <Text style={[styles.label, {margin: 5, marginBottom: 0}]}>{this.props.title}</Text>
        <Text style={[styles.detail, {fontSize: 16, margin: 5}]}>{this.props.subtitle}</Text>
        <View style={threeButtonToggleStyles.buttonContainer}>
          <TouchableHighlight
            style={threeButtonToggleStyles.touchableArea}
            onPress={() => {this._toggleActiveFlags(0); this.props.handleUpdate(0);}}
          >
            <ButtonToggle background={bg1} value={this.props.button1value} label={this.props.button1label} active={this.state.activeFlags[0]} bigValue={this.props.bigValue} />
          </TouchableHighlight>
          <TouchableHighlight
            style={threeButtonToggleStyles.touchableArea}
            onPress={() => {this._toggleActiveFlags(1); this.props.handleUpdate(1);}}
          >
            <ButtonToggle background={bg2} value={this.props.button2value} label={this.props.button2label} active={this.state.activeFlags[1]} bigValue={this.props.bigValue} />
          </TouchableHighlight>
          <TouchableHighlight
            style={threeButtonToggleStyles.touchableArea}
            onPress={() => {this._toggleActiveFlags(2); this.props.handleUpdate(2);}}
          >
            <ButtonToggle background={bg3} value={this.props.button3value} label={this.props.button3label} active={this.state.activeFlags[2]} bigValue={this.props.bigValue} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

ThreeButtonToggle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  bigValue: PropTypes.bool,
  button1value: PropTypes.string,
  button1label: PropTypes.string,
  button2value: PropTypes.string,
  button2label: PropTypes.string,
  button3value: PropTypes.string,
  button3label: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
};

ThreeButtonToggle.defaultTypes = {
  bigValue: false,
}

const styles = StyleSheet.create(defaultStyle);
const width = (99/3).toString() + "%";
const threeButtonToggleStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchableArea: {
    width,
    aspectRatio: 1.5,
  },
});
