import React from 'react';
import { connect } from 'react-redux';
import {ImageBackground, Text} from 'react-native';


class AuthCheck extends React.Component {

  componentDidMount() {
    const { player, navigation, redirect } = this.props;
    
    if(!player.id && redirect.path !== 'recovery' ) {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('MainApp');
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
      <Text>Hello from AuthCheck</Text>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => { 
  return {
    player: state.player,
    redirect: state.redirect
  }
}

export default connect(mapStateToProps)(AuthCheck);
