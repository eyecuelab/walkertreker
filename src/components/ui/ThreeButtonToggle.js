import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';

import ButtonToggle from './ButtonToggle';

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
      <View style={styles.container} >
        <Text style={{color: this.props.titleColor, fontSize: 18}}>{this.props.title}</Text>
        <Text style={{color: this.props.titleColor, fontSize: 12}}>{this.props.subtitle}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.touchableArea}
            onPress={() => {this._toggleActiveFlags(0); this.props.handleUpdate(0);}}
          >
            <ButtonToggle value={this.props.button1value} label={this.props.button1label} active={this.state.activeFlags[0]} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchableArea}
            onPress={() => {this._toggleActiveFlags(1); this.props.handleUpdate(1);}}
          >
            <ButtonToggle value={this.props.button2value} label={this.props.button2label} active={this.state.activeFlags[1]} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchableArea}
            onPress={() => {this._toggleActiveFlags(2); this.props.handleUpdate(2);}}
          >
            <ButtonToggle value={this.props.button3value} label={this.props.button3label} active={this.state.activeFlags[2]} />
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
  button1value: PropTypes.string,
  button1label: PropTypes.string,
  button2value: PropTypes.string,
  button2label: PropTypes.string,
  button3value: PropTypes.string,
  button3label: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
};

const width = (100/3).toString() + "%";
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  touchableArea: {
    width,
    aspectRatio: 1.5,
  },
});
