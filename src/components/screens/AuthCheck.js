import React from 'react';
import constants from './../../constants';
import { connect } from 'react-redux';
import {ImageBackground, Text} from 'react-native';


const { c } = constants;

class AuthCheck extends React.Component {
  async componentDidMount() {
    const { player, navigation, dispatch, redirect } = this.props;
    

    const redirectAction = this._checkForRedirectAction();
    
    if(!player.id && redirect.path !== 'recovery' ) {
      
        navigation.navigate('Auth');
     
    } else if(redirectAction){
      navigation.navigate(redirectAction); 
      dispatch({ type: c.CLEAR_REDIRECT_ACTION });
    } else {
      console.log("attempting to navigate to main app")
      navigation.navigate('MainApp');
    }
  }

  _checkForRedirectAction() {
    const { redirect, navigation } = this.props;
    if (redirect.path) {
      return navigation.dangerouslyGetParent().router.getActionForPathAndParams(redirect.path, redirect.queryParams);
    } else if (redirect.redirectAction) {
      return redirect.redirectAction;
    }
  }
    
  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
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
