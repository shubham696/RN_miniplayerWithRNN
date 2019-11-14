// Home.js
import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

export default class Explore extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Explore'
        },
      }
    };
  }

  showOverlay = async () => {
    Navigation.showOverlay({
      component: {
        name: 'Overlay',
        options: {
          overlay: {
            interceptTouchOutside: false,
            handleKeyboardEvents:true
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Explore screen.</Text>
        <Button
          onPress={this.showOverlay}
          title="Show Overlay"
        />
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              }
            });
          }}
          title="View next screen"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
