import React from 'react';
import { ImageBackground } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: null,
    }
  }

  componentDidMount = async () => {
    console.log(`===============Start.js=================`)
    console.log(`============componentDidMount===========`)
    console.log(`================start===================`)

    const path = this.props.screenProps.path
    const params = this.props.screenProps.queryParams
    console.log(path)
    console.log(params)
    
    if (path === 'invite') {
      await this.setState({ route: this.props.navigation.navigate('AcceptInvite', params) })
      console.log(this.state.route)
    }

    console.log(`===============Start.js=================`)
    console.log(`============componentDidMount===========`)
    console.log(`=================done===================`)
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        {this.state.route}
      </ImageBackground>
    )
  }
}
