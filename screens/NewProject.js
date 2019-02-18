import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { getItems, getPitches, getBasket } from '../actions';
import { ScrollView } from 'react-native-gesture-handler';

class NewProject extends React.Component {
  static navigationOptions = {
    title: 'New project',
  };

  state = {
      nickName: "",
      projTitle: "",
      projDesc: "",
      url: "https://res.cloudinary.com/ohcash/image/upload/v1547400757/photo-1526304640581-d334cdbbf45e.jpg",
      loanTenor: null,
      targetAmt: null,
  }

  updateProject = () => {
     fetch(`http://${this.props.url}/oh/new`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickName: `${this.state.nickName}`,
        projTitle: `${this.state.projTitle}`,
        projDesc: `${this.state.projDesc}`,
        url: `${this.state.url}`,
        loanTenor: `${this.state.loanTenor}`,
        targetAmt: `${this.state.targetAmt}`,
      })
    })
  }
  
  fetchData = () => {
     fetch(`http://${this.props.url}/revolut`, {})
      .then(response => response.json())
      .then(data => this.props.getItems(data))
  }

  fetchPitch = () => {
     fetch(`http://${this.props.url}/oh`, {
    })
      .then(response => response.json())
      .then(data => this.props.getPitches(data))
  }

  fetchBasket = () => {
     fetch(`http://${this.props.url}/oh/basket`, {
    })
      .then(response => response.json())
      .then(data => this.props.getBasket(data))
  }

  addProject = () => {
    Alert.alert('Project added!');
    this.updateProject();
    this.fetchPitch();
    this.fetchData();
    this.fetchBasket();
  }  

  render () {

    return (

  
   <KeyboardAvoidingView  behavior="position" enabled> 
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.titleCont}>
          <Text style={styles.header}>Fill the form</Text>
        </View>

        <TextInput
        style={styles.inputField}
        placeholder={' nickname...'}
        maxLength = {20}
        placeholderTextColor={'gray'}
        onChangeText={(nickName) => this.setState({nickName})}
      />

      <TextInput
        style={styles.inputField}
        placeholder={' project title...'}
        maxLength = {20}
        placeholderTextColor={'gray'}
        onChangeText={(projTitle) => this.setState({projTitle})}
      />

      <TextInput
        style={styles.inputField}
        placeholder={' target amount...'}
        placeholderTextColor={'gray'}
        onChangeText={(targetAmt) => this.setState({targetAmt})}
      />

      <TextInput
        style={styles.inputField}
        placeholder={' loan tenor...'}
        placeholderTextColor={'gray'}
        onChangeText={(loanTenor) => this.setState({loanTenor})}
      />

      <TextInput
        style={styles.inputFieldDesc}
        placeholder={' description (max 400 chars)...'}
        multiline = {true}
        numberOfLines = {4}
        maxLength = {400}
        placeholderTextColor={'gray'}
        onChangeText={(projDesc) => this.setState({projDesc})}
      />

      <TextInput
        style={styles.inputFieldUrl}
        placeholder={' image url...'}
        placeholderTextColor={'gray'}
        onChangeText={(url) => this.setState({url})}
      />

        <View style={styles.button}>
          <Button
          onPress = {()=> this.addProject()}
          color = 'white'
          title = 'Go for it!'
          >
          </Button>
        </View>

        </View>
        </ScrollView>
      </KeyboardAvoidingView>
 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingTop: 20,
    height: 600,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    height: 38,
    width: 330,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    color: '#2196F3',
  },
  inputField: {
    marginVertical: 10,
    height: 30,
    width: 150,
    backgroundColor: '#E6E6E6',
  },
  inputFieldDesc: {
    marginVertical: 10,
    height: 200,
    width: 315,
    backgroundColor: '#E6E6E6',
  },
  inputFieldUrl: {
    marginVertical: 10,
    height: 30,
    width: 315,
    backgroundColor: '#E6E6E6',
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 40,
    backgroundColor: 'white',
    shadowColor: 'blue',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'lightblue',
    borderWidth: 0.2,
    borderRadius: 30,
    marginBottom: 15,
  },
})

const mapStateToProps = (state) => ({
  data: state.data,
  pitches: state.pitches,
  basket: state.basket,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (data) => dispatch(getItems(data)),
  getPitches: (data) => dispatch(getPitches(data)),
  getBasket: (data) => dispatch(getBasket(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProject);