import React, { Component } from 'react';
import { Text } from 'react-native';
import Modal from 'react-native-modalbox';
import styles from './EditModal.style';
import FloatingLabel from 'react-native-floating-labels';
import MyButton from '../MyButton/MyButton.component';

export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            releaseYear: ''
        };
    }

    showEditModal = (item) => {
        this.setState({
            id: item.id.toString(),
            name: item.name,
            releaseYear: item.releaseYear.toString(),
        });
        this.refs.myModal.open();
    }

    render() {
        const { wrapper, title, labelInput, input, formInput } = styles;
        return (
            <Modal
                ref={'myModal'}
                style={wrapper}
                position='center'
                coverScreen={true}
                backdrop={true}
                onClosed={() => {
                }}
            >
                <Text style={title}>
                    Update movie
                </Text>
                <FloatingLabel
                    labelStyle={labelInput}
                    inputStyle={input}
                    style={formInput}
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                >Movie's name</FloatingLabel>
                <FloatingLabel
                    labelStyle={labelInput}
                    inputStyle={input}
                    style={formInput}
                    onChangeText={(text) => this.setState({ releaseYear: text })}
                    value={this.state.releaseYear}
                    keyboardType='numeric'
                >Release Year</FloatingLabel>
                <MyButton
                    label='Save'
                    onPress={() => {
                        if (this.state.name.length === 0 || this.state.releaseYear.length === 0) {
                            alert('You must enter movie name and release year!');
                            return;
                        }
                        this.props.movieComponent.props.onUpdateMovie(this.state);
                        this.refs.myModal.close();
                    }}
                />
            </Modal>
        );
    }
}
