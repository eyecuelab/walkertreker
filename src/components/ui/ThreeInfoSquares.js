import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import ButtonToggle from "./ButtonToggle";
import Avatar from "./Avatar";
import defaultStyle from "../../styles/defaultStyle";
import { Label, SubHeader } from "../text";

const bg1 = require("../../../assets/buttontexture1.png");
const bg2 = require("../../../assets/buttontexture2.png");
const bg3 = require("../../../assets/buttontexture3.png");

const styles = StyleSheet.create(defaultStyle);
const width = `${(99 / 3).toString()  }%`;
const heightUnit = hp("1%");
const widthUnit = wp("1%");
const customStyles = StyleSheet.create({
  container: {
    width: "100%"
  },

  avatarStyle: {
    width: widthUnit * 10,
    aspectRatio: 1
  },
  title: {
    margin: 0,
    marginLeft: 0,
    marginBottom: 0,
    fontSize: heightUnit * 5,
    color: "black"
  },
  squareContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  square: {
    width,
    aspectRatio: 1.5
  }
});

export default class ThreeInfoSquares extends React.Component {
  // TODO: feed all the ButtonToggles an 'isRed' and an 'isGreen' prop as a boolean

  // _percentColor = () => {
  //   const val = parseInt(this.props.button1value.slice(0, -1));
  //   if (val < 50) {
  //     return 'red';
  //   } else if (val > 100) {
  //     return 'green';
  //   } else {
  //     return 'white'
  //   }
  // }

  _healthColor = () => {
    const val = this.props.button2value;
    if (val === "Poor") {
      return "red";
    }
    if (val === "Good") {
      return "green";
    }
    return "white";
  };

  _hungerColor = () => {
    const val = this.props.button3value;
    if (val === "High") {
      return "red";
    }
    if (val === "Low") {
      return "green";
    }
    return "white";
  };

  render() {
    return (
      <View style={customStyles.container}>
        <Label color="#000">{this.props.title}</Label>

        <View style={customStyles.squareContainer}>
          <View style={customStyles.square}>
            <ButtonToggle
              background={bg1}
              value={this.props.button1value}
              label={this.props.button1label}
              bigValue={this.props.bigValue}
              color="white"
            />
          </View>

          <View style={customStyles.square}>
            <ButtonToggle
              background={bg2}
              value={this.props.button2value}
              label={this.props.button2label}
              bigValue={this.props.bigValue}
              color={this._healthColor()}
            />
          </View>

          <View style={customStyles.square}>
            <ButtonToggle
              background={bg3}
              value={this.props.button3value}
              label={this.props.button3label}
              bigValue={this.props.bigValue}
              color={this._hungerColor()}
            />
          </View>
        </View>
      </View>
    );
  }
}

// <Avatar player={this.props.player} imageStyles={customStyles.avatarStyle} />

ThreeInfoSquares.propTypes = {
  title: PropTypes.string.isRequired,
  // player: PropTypes.shape(),
  bigValue: PropTypes.bool,
  button1value: PropTypes.string,
  button1label: PropTypes.string,
  button2value: PropTypes.string,
  button2label: PropTypes.string,
  button3value: PropTypes.string,
  button3label: PropTypes.string
};

ThreeInfoSquares.defaultProps = {
  bigValue: false,
  button1value: "",
  button1label: "",
  button2value: "",
  button2label: "",
  button3value: "",
  button3label: ""
  // player: {},
};
