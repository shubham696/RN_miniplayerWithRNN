// screens.js

import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./page/Home').default);
  Navigation.registerComponent('Initializing', (sc) => require('./page/Initializing').default);
  Navigation.registerComponent('SignIn', () => require('./page/SignIn').default);
  Navigation.registerComponent('SignUp', () => require('./page/SignUp').default);
  Navigation.registerComponent('Screen2', () => require('./page/Screen2').default);
}
