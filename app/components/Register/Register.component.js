import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import firebase from 'react-native-firebase';

import styles from './Register.component.style';
import MyButton from '../MyButton/MyButton.component';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    onRegisterPress() {
        const { email, password, confirmPassword } = this.state;
        if(email===''||password==='') {
            alert('Please enter your email and password!');
            return ;
        }
        if (password !== confirmPassword) {
            alert('Password and Confirm Password does not match!');
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Register successfully!');
                this.props.navigation.navigate('Movie');
            })
            .catch((error) => {
                alert('Register failed! Please check your email and password!');
                console.log(error);
            });
    }

    render() {
        const { wrapper, header, labelInput, input, formInput, loginLabel } = styles;
        const propsFloatingLabel = {
            labelStyle: labelInput,
            inputStyle: input,
            style: formInput
        }
        return (
            <View style={wrapper}>
                <Text style={header}>Register</Text>
                <FloatingLabel
                    {...propsFloatingLabel}
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    keyboardType='email-address'
                >Email</FloatingLabel>
                <FloatingLabel
                    {...propsFloatingLabel}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                >Password</FloatingLabel>
                <FloatingLabel
                    {...propsFloatingLabel}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    value={this.state.confirmPassword}
                >Confirm Password</FloatingLabel>
                <MyButton
                    label='Register'
                    onPress={() => this.onRegisterPress()}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={loginLabel}>Login?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

