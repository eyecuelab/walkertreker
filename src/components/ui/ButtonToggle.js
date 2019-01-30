import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class ButtonToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggle = this.props.active ? styles.active : styles.inactive;
    return (
      <View style={[styles.container, toggle]} >
        <Text style={[styles.value, toggle]}>{this.props.value}</Text>
        <Text style={[styles.label, toggle]}>{this.props.label}</Text>
      </View>
    );
  }
}

ButtonToggle.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
};

ButtonToggle.defaultProps = {
  active: false,
};

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
    backgroundColor: 'white',
    color: 'darkred',
  },
  inactive: {
    backgroundColor: 'black',
    color: 'white',
  },
  value: {
    fontFamily: 'gore',
    fontSize: 24,
  },
  label: {
    fontFamily: 'gore',
    fontSize: 18,
  }
});
