import React, { Component } from 'react';
import { View, TouchableHighlight,Text } from 'react-native';




export default class ToggleContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleSetValue(value, event) {
      console.log(event.target);
      this.setState({ value : value });
    }

    

    state = { toggled: false }
  
    render() {
      const { children } = this.props;
    return (
      <View>
        {React.Children.map(children, (child) => (
          <TouchableHighlight>
            {child}
          </TouchableHighlight>
        ))}
      </View>


      

    );
  }
}


handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })