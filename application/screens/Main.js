import React, { Component } from 'react';
// import { NavigationActions, StackNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs, navigationOptions, navigateAction } from 'react-navigation';
import { StyleSheet, View, Image, ImageBackground, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';


export default class Main extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor() {
        super();

        this.state = {
            name: null,
        };
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({name:user.displayName})
            }
        })
    }

    render() {


        return (


            <ScrollView>
                <Text>Main Page</Text>
                <Text>{this.state.name}</Text>
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
