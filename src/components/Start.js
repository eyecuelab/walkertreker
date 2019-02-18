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
    const path = this.props.screenProps.path
    const params = this.props.screenProps.queryParams

    if (path === 'invite') {
      await this.setState({ route: this.props.navigation.navigate('AcceptInvite', params) })
      console.log(this.state.route)
    }
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
