import React, { Component } from 'react';
// import { NavigationActions, StackNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs, navigationOptions, navigateAction } from 'react-navigation';
import { Alert, StyleSheet, View, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { CheckBox } from 'react-native-elements'
import * as firebase from 'firebase';

export default class Signup extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor() {
        super();

        this.state = {
            email: null,
            password: null,
            DOB: null,
        };
    }

    Register() {
        if (this.state.email != null && this.state.password && this.state.DOB != null) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((data) => {
                    var userId = firebase.auth().currentUser.uid

                    firebase.database().ref('users').child(userId).set({
                        Email: this.state.email.trim(),
                        DOB: this.state.DOB,
                    });
                    this.props.navigation.navigate('Main');
                }).catch((error) => {
                    Alert.alert(
                        'Try Again' + error
                    )
                });
        }
        else {
            Alert.alert("Please Fill Form!");
        }
        // Alert.alert(this.state.value);
    }




    render() {
        return (

            < View style={styles.container} >
                <ScrollView >

                    {/* <Item style={{ backgroundColor: '#E6E6E6', borderColor: 'transparent', padding: 3, borderRadius: 2 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'#68CDD8'}
                                animation={true}
                                labelStyle={{ fontSize: 16, marginRight: 40, marginLeft: 10 }}
                                style={{ padding: 13, width: 303, marginLeft: 9 }}
                                borderWidth={1}
                                buttonInnerColor={'#fff'}
                                buttonOuterColor={'#68CDD8'}
                                buttonSize={12}
                                buttonOuterSize={30}
                                onPress={(value) => { this.setState({ value: value }) }}
                            >
                            </RadioForm>
                        </Item> */}

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
                        <Icon name='gift'
                            color="#68CDD8"
                            size={30}
                            style={{ padding: 13, marginLeft: 10, marginRight: 7 }} />
                        <Input
                            placeholder='Date of Birth'
                            onChangeText={(DOB) => this.setState({ DOB })}
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

                    {/* <CheckBox
                            textStyle={{ fontSize: 11, color: '#7abbc1', fontWeight: '100' }}
                            containerStyle={{ borderColor: 'transparent', backgroundColor: '#fff' }}
                            title="I agree with MediQonnect's terms and conditions"
                            checked={this.state.checked}
                            checkedColor='#68CDD8'
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        /> */}

                    <View>

                        <Button onPress={this.Register.bind(this)}
                            block warning style={styles.LoginBTN}>
                            <Text>SignUp</Text>
                        </Button>
                        {/* <TouchableOpacity onPress={this.Register.bind(this)}>
                            <Text>SignUp</Text>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </View >
        )
    }
}

//styling for login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 200,
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
