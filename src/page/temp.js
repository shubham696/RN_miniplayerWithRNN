// Home.js
import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

console.disableYellowBox = true;
export default class Temp extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Temp'
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
        <Text>Hello from Temp screen.</Text>
        <Button
          onPress={this.showOverlay}
          title="Show Overlay-temp"
        />
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Home',
              }
            });
          }}
          title="temp File"
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
