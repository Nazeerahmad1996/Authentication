import React, { Component } from 'react';
// import { NavigationActions, StackNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs, navigationOptions, navigateAction } from 'react-navigation';
import { Alert, StyleSheet, View, Image, StatusBar, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase';

export default class Login extends React.Component {

  //Header styling
  static navigationOptions = {
    title: 'Login to Continue',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#FFA500',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      marginLeft: '30%',
    },
  };

  _loginWithGoogle = async function() {

    
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId : "533567482896-01bbi74j8tqu8equ19pjvukgofegqssv.apps.googleusercontent.com",
        iosClientId: "533567482896-tfqo1krlhbqkp974i06s5ehpb6tlr192.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
  
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            this.props.navigation.navigate('Main')
            console.log("Successful");
          })
          .catch(error => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  constructor() {
    super();

    this.state = {
      email: null,
      password: null,
    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  async loginWithFacebook() {

    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2228699757395672', { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      this.props.navigation.navigate('Main')
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  Navigate() {
    this.props.navigation.navigate('SingUp');
  }

  Login() {
    if (this.state.email != null && this.state.password != null) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
    else {
      Alert.alert("Please fill form!")
    }
  }




  render() {
    return (
      <ScrollView>

        <View style={styles.container}>

          <Item regular style={styles.input}>
            <Input
              placeholder='Phone/email'
              placeholderTextColor='#d1d5da'
              onChangeText={(email) => this.setState({ email })}
            />
          </Item>
          <Item regular style={styles.input}>
            <Input
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='#d1d5da'
              onChangeText={(password) => this.setState({ password })}
            />

          </Item>

          <Button onPress={this.Login.bind(this)}
            block warning style={styles.LoginBTN}>
            <Text>Login</Text>
          </Button>

          <TouchableOpacity
            onPress={this.Navigate.bind(this)}
          >
            <Text style={styles.forgetBTN}>SignUp!</Text>
          </TouchableOpacity>

          {/* this view is divider  */}
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>

            {/* Left side line  */}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
                width: '45%',
                marginBottom: 10,
                marginRight: 10,
                color: '#a88181'
              }}
            />
            <View>
              <Text style={{ color: '#a88181', }}>or</Text>
            </View>

            {/* Right side line  */}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
                width: '45%',
                marginBottom: 10,
                marginLeft: 10,
                color: '#a88181'
              }}
            />
          </View>

          {/* Social buttons  */}

          <Button iconLeft block style={styles.SocialBTN} onPress={() => this.loginWithFacebook()}>
            <Icon name='logo-facebook'
              color="#fff"
              size={17} />
            <Text>Login with facebook           </Text>
          </Button>

          <Button iconLeft block danger style={styles.SocialBTN}  onPress={() => this._loginWithGoogle()}>
            <Icon name='logo-googleplus'
              color="#fff"
              size={17} />
            <Text>Login with Google +            </Text>
          </Button>





        </View>
      </ScrollView>
    )
  }
}

//styling for login
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  },
  input: {
    borderRadius: 8,
    marginTop: 16,
  },
  LoginBTN: {
    marginTop: 20,
    borderRadius: 6,
  },
  forgetBTN: {
    fontSize: 13,
    color: '#a88181',
    marginTop: 10,
    marginBottom: 10,
  },
  skipBTN: {
    color: '#FFA500',
    fontSize: 17,
  },
  SocialBTN: {
    borderRadius: 6,
    marginBottom: 10,
  },
  PolicyText: {
    padding: 15,
    fontSize: 13,
    color: '#a88181',
    textAlign: 'center'
  }
});
