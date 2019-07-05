import React from 'react';
import constants from './../../constants';
import { connect } from 'react-redux';
import { Linking } from 'expo';




const { c } = constants;

class AuthCheck extends React.Component {

  async componentDidMount() {
    const { player, navigation, redirect, dispatch } = this.props;
    console.log("screen props" + JSON.stringify(this.props.screenProps));
    if(!player.id) {
      navigation.navigate('Auth');
    } else {
      console.log("Attempting redirect with props", redirect.path, redirect.queryParams)
      redirect.path ? dispatch({type: c.HANDLE_REDIRECT_ACTION, path: redirect.path, queryParams: redirect.queryParams}) : navigation.navigate('MainApp')
    }
  }
    
  render() {
    return (
      null
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
