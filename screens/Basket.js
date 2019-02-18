import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getBasket } from '../actions';
import Project from './Project';

class Basket extends React.Component {
  static navigationOptions = {
    title: 'Portfolio',
  };

componentDidMount() {
  this.fetchBasket();
}

fetchBasket = () => {
  fetch(`http://${this.props.url}/oh/basket`, {
  })
    .then(response => response.json())
    .then(data => this.props.getBasket(data))
}

render () {
  if (this.props.basket.length) {
  return (
    <View style={styles.box}>
      <ScrollView>
      {this.props.basket.map(el => <Project el={el} key={el._id} /> )}

      </ScrollView>
    </View>
  )
}
return (
  <Text>No investments</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    marginLeft: 50,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 610,
    width: 360,
    margin: 'auto',
    marginTop: 75,
  },
});

const mapStateToProps = (state) => ({
  data: state.data,
  basket: state.basket,
  pitches: state.pitches,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  getBasket: (data) => dispatch(getBasket(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);

