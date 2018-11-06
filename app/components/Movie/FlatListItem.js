import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import Swipeout from 'react-native-swipeout';
import theme from '../../styles/theme.style';

export default class FlatListItem extends Component {
    render() {
        const swipeSettings = {
            autoClose: true,
            right: [
                { //Button Edit
                    text: 'Edit',
                    type: 'primary',
                    onPress: () => {
                        const { movieComponent } = this.props;
                        //show edit modal here!
                        movieComponent.refs.editModal.showEditModal({ ...this.props });
                    }
                },
                { //Button Delete
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert('Alert',
                            'Are you sure you want to delete this movie?',
                            [
                                { text: 'No', onPress: () => console.log('cancel press'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        const { movieComponent } = this.props;
                                        movieComponent.props.onDeleteItemAction(this.props.id);
                                    }
                                }
                            ],
                            { cancelable: true }
                        );
                    }
                }
            ],
            sectionId: 1,
            rowId: this.props.id
        };
        return (
            <Swipeout {...swipeSettings}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        padding: 10,
                        fontSize: theme.FONT_SIZE_MEDIUM,
                        color: 'white',
                        backgroundColor: (this.props.itemIndex % 2 === 0) ? 'darkgreen' : 'darkblue'
                    }}>
                        Name: {this.props.name}{'\n'}Release Year: {this.props.releaseYear}
                    </Text>
                </View>
            </Swipeout>
        );
    }
}
