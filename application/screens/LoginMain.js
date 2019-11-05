import React, { Component } from 'react';
// import { NavigationActions, StackNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs, navigationOptions, navigateAction } from 'react-navigation';
import { StyleSheet, View, Image, ImageBackground, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';

export default class Splash extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    PatientScreen() {
        this.props.navigation.navigate('PatientLogin', { user: 'Lucy' });
    }
    DoctorScreen() {
        this.props.navigation.navigate('DoctorLogin', { user: 'Lucy' });
    }

    componentDidMount() {
        //android back button handle
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.navigation.navigate('Main');
            }
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.setParams({ SignOut: this._SignOut });


    }
    componentWillUnmount() {
        //android back button handle
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        //exit when click on android back button. if we dont use this then it will navigate to splash screen.
        BackHandler.exitApp();
    }



    render() {


        return (

            <ImageBackground
                source={require('../Assets/Welcome.png')}
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                }}
            >

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 400 }}>
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
                        <Image
                            style={{ width: 110, height: 110, marginTop: -260, marginRight: 180 }}
                            source={require('../Assets/logo2.png')}
                        />
                    </Animatable.View>

                    <View style={styles.heart}>

                    </View>
                    <View style={styles.imageUploadDiv}>
                        <TouchableOpacity onPress={this.PatientScreen.bind(this)}>
                            <Image
                                style={{ width: 350, height: 70 }}
                                source={require('../Assets/signinpatient.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageUploadDiv}>
                        <TouchableOpacity onPress={this.DoctorScreen.bind(this)}>
                            <Image
                                style={{ width: 350, height: 70 }}
                                source={require('../Assets/Signindoctor.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground >

        )
    }
}

const styles = StyleSheet.create({
    LoginBTN: {
        marginTop: 20,
        borderRadius: 6,
    },

});
