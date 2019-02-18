import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { AppLoading, Asset } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';
import { getItems, handleLoad } from './actions';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

export default class RootComponent extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      );
    }
  }

class App extends React.Component {

  render() {
    if (!this.props.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
      
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          
          <AppNavigator />
          
        </View>
      
      );
  }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.props.handleLoad();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  isLoadingComplete: state.isLoadingComplete,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (data) => dispatch(getItems(data)),
  handleLoad: () => dispatch(handleLoad())
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
