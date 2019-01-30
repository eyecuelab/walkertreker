import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class ThreeButtonToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={{color: this.props.titleColor, fontSize: 18}}>TITLE</Text>
      </View>
    );
  }
}

ThreeButtonToggle.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
};

ThreeButtonToggle.defaultProps = {

};

const styles = StyleSheet.create({
});
