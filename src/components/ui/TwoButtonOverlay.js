import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TwoButtonOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  _button1render() {
    if (this.props.button1isDisabled) {
      return (<Button disabled title={this.props.button1title} color={this.props.button1color} onPress={this.props.button1onPress} />);
    } else {
      return (<Button title={this.props.button1title} color={this.props.button1color} onPress={this.props.button1onPress} />);
    }
  }

  _button2render() {
    if (this.props.button2isDisabled) {
      return (<Button disabled title={this.props.button2title} color={this.props.button2color} onPress={this.props.button2onPress} />);
    } else {
      return (<Button title={this.props.button2title} color={this.props.button2color} onPress={this.props.button2onPress} />);
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
        <View style={styles.buttonsRow} >
          {this._button1render()}
          {this._button2render()}
        </View>
      </View>
    );
  }
}

TwoButtonOverlay.propTypes = {
  title: PropTypes.string,
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
  button1onPress: () => {console.log(`You pressed button 1.`)},
  button1color: "deepskyblue",
  button1isDisabled: false,
  button2onPress: () => {console.log(`You pressed button 2.`);},
  button2color: "tomato",
  button2isDisabled: false,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'darkgray',
    borderWidth: 2,
  },
  buttonsRow: {
    margin: 5,
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
})
