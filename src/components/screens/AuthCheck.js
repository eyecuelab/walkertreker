import React from 'react';
import constants from './../../constants';
import { connect } from 'react-redux';


const { c } = constants;

class AuthCheck extends React.Component {
  componentDidMount() {
    const { player, navigation, redirect, dispatch } = this.props;
    if(!player.id) {
      navigation.navigate('Auth');
    } else {
      console.log(redirect.redirectAction)
      redirect.redirectAction ? dispatch({type: c.HANDLE_REDIRECT_ACTION, redirectAction: redirect.redirectAction}) : navigation.navigate('MainApp')
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
