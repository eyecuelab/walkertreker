import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Label } from "../text";
// import ShortId from "shortid";

// import { widthPercentageToDP as wp,
// heightPercentageToDP as hp } from 'react-native-responsive-screen';
// const widthUnit = wp('1%');
// const heightUnit = hp('1%');

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});

class ToggleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: undefined,
      value:
        this.props.options[0].value !== undefined
          ? this.props.options[0].value
          : this.props.options[0].label
    };
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  componentDidMount() {
    this.setState({ selectedIndex: this.props.options[0].id });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.onValueChange &&
      prevState.selectedIndex !== this.state.selectedIndex
    ) {
      this.props.onValueChange(this.state.value);
    }
  }

  handleOnPress = index => {
    const { options } = this.props;
    this.setState({
      selectedIndex: options[index].id,
      value:
        options[index].value !== undefined
          ? options[index].value
          : options[index].label
    });
  };

  render() {
    const { options } = this.props;
    return (
      <View style={styles.container}>
        {options.map((option, index) => {
          console.log("index", index);
          return (
            <TouchableOpacity key={option.id}>
              {this.state.selectedIndex === option.id ? (
                <Label style={{ color: "green" }} size="md">
                  {" "}
                  {option.label}{" "}
                </Label>
              ) : (
                <Label
                  style={{ color: "white" }}
                  size="md"
                  onPress={() => this.handleOnPress(index)}
                >
                  {option.label}
                </Label>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

ToggleBar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  onValueChange: PropTypes.func.isRequired
};

/*
options : [{ label: required, value: optional }]
*/

export default ToggleBar;
