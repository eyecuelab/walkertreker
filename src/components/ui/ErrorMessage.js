import React, { Component } from 'react';
import { Text, ImageBackground, View } from 'react-native';
import { Label } from './../text';

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{height: "100%", width: "100%", alignContent: "center", justifyContent: "center"}}>
        <Label style={{textAlign: 'center'}} size="lg"> {this.props.errorMessage} </Label>
      </View>

    );
  }
}

export default ErrorMessage;
