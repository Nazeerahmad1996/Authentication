import React, { Component } from 'react';
// import { NavigationActions, StackNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs, navigationOptions, navigateAction } from 'react-navigation';
import { StyleSheet, View, Image, ImageBackground, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';

export default class PatientScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor() {
        super();

        this.state = {
            email: null,
            password: null,
        };
    }

    SignUp() {
        this.props.navigation.navigate('Signup', { user: 'Lucy' });
    }
    ForgotPassword() {
        this.props.navigation.navigate('ForgotPassword');
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

                <ImageBackground
                    source={require('../Assets/SignIn.png')}
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 225, padding: 20, }}>
                        <Item style={{ backgroundColor: '#E6E6E6', borderColor: 'transparent', padding: 3, borderRadius: 2, marginTop: 2 }}>
                            <Icon name='email-outline'
                                color="#68CDD8"
                                size={30}
                                style={{ padding: 13, marginLeft: 10, marginRight: 7 }} />
                            <Input
                                placeholder='Email'
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </Item>

                        <Item style={{ backgroundColor: '#E6E6E6', borderColor: 'transparent', padding: 3, marginTop: 2, borderRadius: 2 }}>
                            <Icon name='lock-outline'
                                color="#68CDD8"
                                size={30}
                                style={{ padding: 13, marginLeft: 10, marginRight: 7 }} />
                            <Input
                                secureTextEntry={true}
                                placeholder='Password'
                                onChangeText={(password) => this.setState({ password })}
                            />

                        </Item>

                        <TouchableOpacity style={styles.ForgotPassword} onPress={this.ForgotPassword.bind(this)}>
                            <Text style={ styles.ForgetText }>Forgot password?</Text>
                        </TouchableOpacity>


                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity onPress={this.Login.bind(this)}>
                                <Image
                                    style={{ width: 342, height: 70 }}
                                    source={require('../Assets/signinpatient.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity onPress={this.SignUp.bind(this)}>
                                <Image
                                    style={{ width: 342, height: 70 }}
                                    source={require('../Assets/signupbtn.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground >
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    LoginBTN: {
        marginTop: 20,
        borderRadius: 6,
    },
    ForgotPassword: {
        marginTop: 10,
        marginLeft: 175,
    },
    ForgetText: {
        color: '#68CDD8',
    }
});
