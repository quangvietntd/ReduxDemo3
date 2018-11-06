import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import FlatListItem from './FlatListItem';
import EditModal from './EditModal';
import styles from './Movie.component.style';
import FloatingLabel from 'react-native-floating-labels';
import MyButton from '../MyButton/MyButton.component';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            releaseYear: '',
        };
    }
    render() {
        const { wrapper, header, title,
            buttonContainer,
            listContainer,
            labelInput, input, formInput
        } = styles;
        return (
            <View style={wrapper}>
                <Text style={header}>
                    Redux Saga tutorials - Movies list
                </Text>
                <Text style={title}>
                    New movie information
                </Text>
                <View>
                    <FloatingLabel
                        labelStyle={labelInput}
                        inputStyle={input}
                        style={formInput}
                        onChangeText={(text) => this.setState({ movieName: text })}
                        value={this.state.movieName}
                    >Enter new movie name</FloatingLabel>
                    <FloatingLabel
                        labelStyle={labelInput}
                        inputStyle={input}
                        style={formInput}
                        onChangeText={(text) => this.setState({ releaseYear: text })}
                        value={this.state.releaseYear}
                        keyboardType='numeric'
                    >Release Year</FloatingLabel>
                </View>
                <View style={buttonContainer}>
                    <MyButton 
                        label='Fetch movies'
                        onPress={() => { this.props.onFetchMovies()}}
                    />
                    <MyButton 
                        label='Add movie'
                        onPress={() => {
                            const { movieName, releaseYear } = this.state;
                            if (movieName.length === 0 || releaseYear.length === 0) {
                                Alert.alert('You must enter movie name and release year!');
                                return;
                            }
                            this.props.onAddMovie({ name: movieName, releaseYear: releaseYear });
                        }}
                    />
                </View>
                <View style={listContainer}>
                    <FlatList
                        data={this.props.movies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <FlatListItem
                            {...item}
                            itemIndex={index}
                            movieComponent={this} />}
                    />
                </View>
                <EditModal ref={'editModal'} movieComponent={this} />
            </View>
        );
    }
}
