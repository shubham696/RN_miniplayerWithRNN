import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

const abcd = {
  children: [
    {
      stack: {
        id:'discoverStack',
        children: [{
          component: {
            name: 'Home',
          }
        }],
        options: {
          bottomTab: {
            text: 'Home',
            icon: require('./assets/home_icon.png')
          }
        }
      }
    },
    {
      stack: {
        children:[{
          component: {
            name: 'Home'
          },
          component:{
            name:'Explore'
          }
        }],
        options: {
          bottomTab: {
            text: 'Explore',
            icon: require('./assets/explore_icon.png')
          }
        }
      }
    }
  ],
  options: {}
};

export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: abcd
  }
});