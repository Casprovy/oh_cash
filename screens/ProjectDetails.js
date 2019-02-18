
import React from 'react';
import {
  Alert,
  Image,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getItems, getPitches, getBasket } from '../actions';


class ProjectDetails extends React.Component {
  static navigationOptions = {
    title: 'Project Details'
  };

  componentDidMount () {
    this.fetchData();
    this.fetchPitch();
    this.fetchBasket();
  }

  showAlert1 () {
    Alert.alert('This exceeds target!!!')
  }

  showAlert2 () {
    Alert.alert('Not enough funds!!!')
  }

  showAlert3 (amt) {
    Alert.alert(`Invested ${amt} EUR!`)
  }

  updateData = (amt, raisedAmm, targetAmm, myFunds) => {
    if (amt > myFunds) {
      this.showAlert2();
      return;
    }
    if (raisedAmm + amt > targetAmm) {
      this.showAlert1();
      return;
    }
    this.showAlert3(amt);
    this.transferFunds(amt);
    this.updatePitches(amt);
    this.fetchPitch();
    this.fetchBasket();
    this.fetchData();
  }

  transferFunds = async (amt) => {
    return fetch(`http://${this.props.url}/revolut/transfer/${amt}`, {
      method: 'POST',
    })
  }

  updatePitches = async (amt) => {
    const id = this.props.navigation.state.params.project._id;
    const investAmt = amt;
    const raisedAmt = investAmt;
    return fetch(`http://${this.props.url}/oh/${id}/${investAmt}/${raisedAmt}`, {
      method: 'POST',
    })
  }

  fetchData = async () => {
    return fetch(`http://${this.props.url}/revolut`, {})
      .then(response => response.json())
      .then(data => this.props.getItems(data))
  }

  fetchPitch = async () => {
    return fetch(`http://${this.props.url}/oh`, {
    })
      .then(response => response.json())
      .then(data => this.props.getPitches(data))
  }

  fetchBasket = async () => {
    return fetch(`http://${this.props.url}/oh/basket`, {
    })
      .then(response => response.json())
      .then(data => this.props.getBasket(data))
  }

  render () {
    
    const index = this.props.pitches.filter(ele => ele._id === this.props.navigation.state.params.project._id);
    const nickName = index[0].nickName;
    const raisedAmm = index[0].raisedAmt;
    const targetAmm = index[0].targetAmt;
    const projDetal = index[0].projDesc;
    const myFunds = this.props.data[2]["balance"];
    const myInv = index[0].lender === undefined ?  0 : index[0].lender["Toma"];

    const raisedAmmFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(raisedAmm);
    const targetAmmFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(targetAmm);
    const myInvFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(myInv);
    const myFundsFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(myFunds);

    return (
      <View style={styles.container}>

        <Image
              source={
                __DEV__
                  ? {url: index[0].url}
                  : {url: index[0].url}
              }
              style={styles.projectImage}
            /> 

      <View style={styles.description}>
        <Text style={styles.textDesc}>{projDetal}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.text1}>{nickName}</Text>
        <Text style={styles.text}>target amount: {targetAmmFmt}</Text>
        <Text style={styles.text}>raised funds: {raisedAmmFmt}</Text>
        <Text style={styles.text}>my share: {myInvFmt}</Text>
        <Text style={styles.text}>funds available: {myFundsFmt}</Text>
      </View> 


      <View style={styles.button}>
        <Button
        onPress = {()=> this.updateData(10, raisedAmm, targetAmm, myFunds)}
        color = 'white'
        title = 'I invest 10 EUR'
        >
        </Button>
      </View>

      <View style={styles.button}>
        <Button
        onPress = {()=> this.updateData(50, raisedAmm, targetAmm, myFunds)}
        color = 'white'
        title = 'I go crazy... 50 EUR'
        ></Button>
      </View>
      
      <View style={styles.button}>
        <Button
        onPress = {()=> this.updateData(100, raisedAmm, targetAmm, myFunds)}
        color = 'white'
        title = 'I must be mad!!! 100 EUR'
        ></Button>
      </View>

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  description: {
    margin: 10,
    height: 130,
  },
  details: {
    height: 100,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    height: 38,
    width: 330,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  textDesc: {
    padding: 3,
    color: '#696969',
    fontSize: 13,
    margin: 'auto',
    textAlign: 'justify',
  },
  text: {
    padding: 3,
    color: 'orange',
    fontSize: 13,
    margin: 'auto',
    textAlign: 'right',
  },
  text1: {
    padding: 3,
    color: '#FF4500',
    fontSize: 13,
    margin: 'auto',
    textAlign: 'center',
  },
  projectImage: {
    width: 350,
    height: 210,
    margin: 'auto',
    paddingBottom: 10,
  }
});

const mapStateToProps = (state) => ({
  data: state.data,
  pitches: state.pitches,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (data) => dispatch(getItems(data)),
  getPitches: (data) => dispatch(getPitches(data)),
  getBasket: (data) => dispatch(getBasket(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);