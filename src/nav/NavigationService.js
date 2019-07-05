// NavigationService.js

import { NavigationActions } from 'react-navigation';


let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateWithPathAndParams(path, queryParams) {
  _navigator.dispatch(path, queryParams);
}

// add other navigation functions that you need and export them

export default {
  _navigator,
  navigate,
  setTopLevelNavigator,
  navigateWithPathAndParams
};