import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Project from './Project';
import { connect } from 'react-redux';
import { getPitches } from '../actions';


class List extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.fetchPitch();
  }

  fetchPitch = () => {
    fetch(`http://192.168.1.183:3000/oh`, {
    })
      .then(response => response.json())
      .then(data => this.props.getPitches(data))
  }

  render () {
    if (this.props.pitches.length) {
    return (
   
      <View style={styles.box}>
        <ScrollView>
        {this.props.pitches.map(el => {
          return (
            <Project el={el} fetchPitch={this.fetchPitch} key={el._id} />
            );
          })
        }
        </ScrollView>
      </View>
  
  )
}
  return (
    <Text>Loading</Text>
  )
}
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 610,
    width: 360,
    margin: 'auto',
    marginTop: 75,
  },
  details: {
    color: 'white',
  },
});

const mapStateToProps = (state) => ({
  pitches: state.pitches,
  data: state.data
});

const mapDispatchToProps = (dispatch) => ({
  getPitches: (data) => dispatch(getPitches(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

