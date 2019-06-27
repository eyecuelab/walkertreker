import React from 'react';
import { Text } from 'react-native';
import NewPlayerForm from './../ui/NewPlayerForm';

function SignUp(props) {
  return(
    <NewPlayerForm navigation={props.navigation}></NewPlayerForm>
  )
}

export default SignUp;
