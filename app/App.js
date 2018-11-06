import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStackNavigator } from 'react-navigation';

import rootSaga from './redux/sagas/rootSaga';
import allReducers from './redux/reducers/allReducers';
import MovieContainer from './redux/containers/MovieContainer';
import Login from './components/Login/Login.component';
import Register from './components/Register/Register.component';

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: { header: null },
    },
    Register: {
        screen: Register,
        navigationOptions: { header: null }
    },
    Movie: {
        screen: MovieContainer,
        navigationOptions: { header: null },
    }
},
    {
        initialRouteName: 'Login',
    }
);

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);
sagaMiddleware.run(rootSaga);

export default App;