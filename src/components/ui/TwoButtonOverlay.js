import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight } from 'react-native';

export default class TwoButtonOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  _button1render() {
    if (this.props.button1isDisabled) {
      return (
        <Button
          disabled
          style={styles.button1style}
          title={this.props.button1title}
          color={this.props.button1color}
          onPress={this.props.button1onPress}
        />
      );
    } else {
      return (
        <Button
          style={styles.button1style}
          title={this.props.button1title}
          color={this.props.button1color}
          onPress={this.props.button1onPress}
        />
      );
    }
  }

  _button2render() {
    if (this.props.button2isDisabled) {
      return (
        <Button
          disabled
          style={styles.button2style}
          title={this.props.button2title}
          color={this.props.button2color}
          onPress={this.props.button2onPress}
        />
      );
    } else {
      return (
        <Button
          style={styles.button2style}
          title={this.props.button2title}
          color={this.props.button2color}
          onPress={this.props.button2onPress}
        />
      );
    }
  }

  _titleRender() {
    if (this.props.title) {
      return (<Text>{this.props.title}</Text>);
    } else return;
  }

  render() {
    return (
      <View style={styles.container} >
        {this._titleRender()}
        <View style={[styles.buttonContainer, {flexDirection: this.props.flexDirection}]}>
          <View style={styles.buttonStyle}>
            <TouchableHighlight style={[styles.touchable]} onPress={this.props.button1onPress}>
              <Text style={styles.buttonText}>{this.props.button1title}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableHighlight style={styles.touchable} onPress={this.props.button2onPress}>
              <Text style={styles.buttonText}>{this.props.button2title}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

TwoButtonOverlay.propTypes = {
  title: PropTypes.string,
  flexDirection: PropTypes.string,
  button1onPress: PropTypes.func,
  button1title: PropTypes.string.isRequired,
  button1color: PropTypes.string,
  button1isDisabled: PropTypes.bool,
  button2onPress: PropTypes.func,
  button2title: PropTypes.string.isRequired,
  button2color: PropTypes.string,
  button2isDisabled: PropTypes.bool,
}

TwoButtonOverlay.defaultProps = {
  flexDirection: 'row',
  button1onPress: () => {console.log(`You pressed button 1.`)},
  button1color: 'black',
  button1isDisabled: false,
  button2onPress: () => {console.log(`You pressed button 2.`);},
  button2color: 'black',
  button2isDisabled: false,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    flex: 1,
    height: '100%',
  },
  touchable: {
    height: '100%',
    width: '97.5%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'gore',
    fontSize: 24,
  }
});
