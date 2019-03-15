import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text } from 'react-native'
import * as Expo from "expo";
import { Font } from 'expo';
import { connect } from 'react-redux';
import { googleSignIn } from '../actions';
import { GOOGLE_ID } from '../env';


class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontLoaded: false,
  };

async componentDidMount () {
  await Font.loadAsync({
    'Leckerli-One': require('../assets/fonts/LeckerliOne-Regular.ttf'),
  });
  this.setState({ fontLoaded: true });
}

signIn = async () => {
  try {
    console.log('logging...');
    let result = await Expo.Google.logInAsync({
      clientId: GOOGLE_ID,
      scopes: ['profile', 'email']
    });

    if (result.type === 'success') {
      this.props.googleSignIn(result.user.name, result.user.photoUrl);
      this.props.navigation.navigate('Main');
    
    } else {
      console.log('cancelled')
    }

  } catch (e) {
    console.log('error', e)
  }
}

render() {
  return (
    <View style={styles.container}>
      {this.props.signedIn || !this.state.fontLoaded ? (
        <View style={styles.container}>
        <Text style={styles.header}>Oooopsss!{this.props.name}</Text>
      </View>
      ) : (
        <View style={styles.container}>
                    <Image
              source={
                __DEV__
                  ? {url: "https://res.cloudinary.com/ohcash/image/upload/v1547568524/photo-1515548212260-ac87067b15ab.jpg"}
                  : {url: "https://res.cloudinary.com/ohcash/image/upload/v1547568524/photo-1515548212260-ac87067b15ab.jpg"}
              }
              style={styles.backImage}
            /> 

            <Text style={styles.textApp}>Ohcash</Text>
        <TouchableOpacity onPress={this.signIn} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign in with</Text>
                <Image
                source={
                  __DEV__
                    ? require('../assets/images/google-logo.png')
                    : require('../assets/images/google-logo.png')
                }
                style={styles.googleImage}
              /> 
          </View>
        </TouchableOpacity>
      </View>
      )}
    </View>
  )
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  backImage: {
    position: 'absolute',
    width: 380,
    height: 820,
    resizeMode: 'stretch',
  },
  googleImage: {
    position: 'absolute',
    top: 5,
    left: 215,
    width: 27,
    height: 27,
  },
  button: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    top: 300,
    height: 38,
    width: 330,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonText: {
    color: '#696969',
    fontSize: 18,
    width: 300,
    textAlign: 'center',
  },
  textApp: {
    position: 'absolute',
    top: 250,
    fontFamily: 'Leckerli-One',
    fontSize: 100,
    color: '#00BFFF',
  }
})

const mapStateToProps = (state) => ({
  signIn: state.signedIn,
  name: state.name,
  photoUrl: state.photoUrl,
})

const mapDispatchToProps = (dispatch) => ({
  googleSignIn: (name, photoUrl) => dispatch(googleSignIn(name, photoUrl)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(LoginScreen)

