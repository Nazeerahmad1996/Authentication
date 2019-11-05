
import React from 'react';
import { Dimensions, Text,View,TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';


var { height, width } = Dimensions.get('window');

import SingUp from '../screens/Signup'
import login from '../screens/Login'
import Main from '../screens/Main'


const HomeNavigator = createStackNavigator({
  login: {
    screen: login
  },
  SingUp: {
    screen: SingUp,
  },
  Main: {
    screen: Main,
  },
});




const App = createAppContainer(HomeNavigator);
export default App;