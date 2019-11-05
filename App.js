import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
import Navigation from './application/navigations/Logged';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAnHlRVgNxEuk-3hXusgB9HOP1tPQDuLtA",
    authDomain: "auth-226ca.firebaseapp.com",
    databaseURL: "https://auth-226ca.firebaseio.com",
    projectId: "auth-226ca",
    storageBucket: "auth-226ca.appspot.com",
    messagingSenderId: "533567482896"
  };
  firebase.initializeApp(config);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#ff3650"/>
          <Navigation />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('native-base/Fonts/Roboto.ttf'),
        require('native-base/Fonts/Roboto.ttf'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});




