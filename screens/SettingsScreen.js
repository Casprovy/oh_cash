import React from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getItems} from '../actions';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Funding',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`http://${this.props.url}/revolut`, {})
      .then(response => response.json())
      .then(data => this.props.getItems(data))
  }

  handleUrl () {
    Linking.openURL('https://sandbox-business.revolut.com/r/signin');
  }

  render() {

    let eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.props.data[2]["balance"]);
    let usd = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(this.props.data[1]["balance"]);
    let gbp = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(this.props.data[0]["balance"]);
    let eurInv = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.props.data[3]["balance"]);

    return (

      <View style={styles.container}>

        <TouchableOpacity style={styles.imageCont} onPress={() => this.handleUrl()}>
        {/* Alert.alert('DEV mode!!!' */}
            <Image
              source={
                __DEV__
                  ? require('../assets/images/RevolutLogo.png')
                  : require('../assets/images/RevolutLogo.png')
              }
              style={styles.revolutImage}
            /> 
        </TouchableOpacity>

        <View style={styles.funding}>
          <Text style={styles.text1}>Funding</Text>

            <View style={styles.fundsCont}>
              <Text style={styles.text}>{eur}</Text>
            </View>

            <View style={styles.fundsCont}>
              <Text style={styles.text}>{usd}</Text>
            </View>

            <View style={styles.fundsCont}>
              <Text style={styles.text}>{gbp}</Text>
            </View>

        </View>

          <View style={styles.investment}>
            <Text style={styles.text1}>Investments</Text>

              <View style={styles.fundsCont}>  
                <Text style={styles.text}>{eurInv}</Text>
              </View>

              <View style={styles.interest}>
                <Text style={styles.text1}>Interest rate</Text>

                  <View style={styles.interestCont}>
                    <Text style={styles.text}>7%</Text>
                  </View>
              </View>

           </View>
      
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingTop: 20,
    height: 600,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    margin: 'auto',
    fontFamily: 'Arial',
    fontSize: 18,
  },
  text1: {
    color: '#2196F3',
    margin: 'auto',
    fontFamily: 'Arial',
    fontSize: 18,
  },
  revolutImage: {
    width: 130,
    height: 60,
    resizeMode: 'contain',
    margin: 'auto',
  },
  imageCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 80,
    backgroundColor: 'white',
    shadowColor: 'blue',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'lightblue',
    borderWidth: 0.2,
    borderRadius: 30,
  },
  fundsCont: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 70,
    backgroundColor: '#2196F3',
    shadowColor: 'blue',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'lightblue',
    borderWidth: 0.2,
    borderRadius: 30,
  },
  interestCont: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    shadowColor: 'blue',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: 'lightblue',
    borderWidth: 0.2,
    borderRadius: 30,
  },
  funding: {
    marginTop: 20,
  },
  investment: {
    marginTop: 10,
  },
  interest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

const mapStateToProps = (state) => ({
  data: state.data,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (data) => dispatch(getItems(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);