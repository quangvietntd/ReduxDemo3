import React, { Component } from 'react';
import { View, Text, TouchableOpacity, YellowBox, Alert } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import firebase from 'react-native-firebase';

import styles from './Login.component.style';
import MyButton from '../MyButton/MyButton.component';

YellowBox.ignoreWarnings(['Require cycle:']); // ẩn Warning Require cycle của React-Native-Firebase

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    myNotification(notification) {
        // xử lý nhận thông báo khi app ở foreground.
        // Alert.alert(notification._title, notification._body);
        // Build a channel
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        // Create the channel
        firebase.notifications().android.createChannel(channel);
        const mNotification = new firebase.notifications.Notification()
            .setNotificationId(notification._notificationId)
            .setTitle(notification._title)
            .setBody(notification._body)
            .setSound("default")
            .android.setChannelId("test-channel")
            .android.setAutoCancel(true)
            .android.setSmallIcon('ic_notification') // có thể gây ra lỗi nếu không có ic_notification trong thư mục mipmap
            .android.setCategory(firebase.notifications.Android.Category.Alarm);
        firebase.notifications().displayNotification(mNotification);
    }

    componentDidMount() {
        //push notifications
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.notificationListener = firebase.notifications()
                        .onNotification((notification) => this.myNotification(notification));
                } else {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            this.notificationListener = firebase.notifications()
                                .onNotification((notification) => this.myNotification(notification));
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    }

    componentWillUnmount() {
        this.notificationListener();
    }

    onLoginPress() {
        const { email, password } = this.state;
        if(email===''||password==='') {
            alert('Please enter your email and password!');
            return ;
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Movie'))
            .catch(() => alert('Authentication failed.'))
    }
    render() {
        const { wrapper, header, labelInput, input, formInput, registerLabel } = styles;
        const propsFloatingLabel = {
            labelStyle: labelInput,
            inputStyle: input,
            style: formInput
        }
        return (
            <View style={wrapper}>
                <Text style={header}>Login Information</Text>
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
                <MyButton
                    label='Login'
                    onPress={() => this.onLoginPress()}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={registerLabel}>Register?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

