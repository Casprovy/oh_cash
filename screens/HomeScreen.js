import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getItems, getPitches } from '../actions';
import TabBarIcon from '../components/TabBarIcon';
import { withNavigation } from 'react-navigation';
import List from './List';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Projects',
  };

  componentDidMount() {
    this.fetchData();
    this.fetchPitch();
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
  
  render() {
    if (this.props.data.length && this.props.pitches.length) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.welcomeContainer}>

            <View style={styles.tabBarInfoContainer}>
              <View>
                <Text style={styles.tabBarInfoText}>Projects Box</Text>
              </View>
            </View>

            <ScrollView >
              <List style={styles.container1} />
            </ScrollView>
            
            <TouchableOpacity style={styles.addProject} onPress={() => this.props.navigation.push('NewProject')}>
              <View>
                  <TabBarIcon
                    name={
                      Platform.OS === 'ios'
                        ? `md-add`
                        : 'md-add'
                    }
                  />
              </View>   
            </TouchableOpacity>

        </View>

        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
    // paddingBottom: 60
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    shadowColor: 'black',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop: 20,
    paddingBottom: 25,
  },
  tabBarInfoText: {
    marginTop: 5,
    fontSize: 18,
    color: '#4682B4',
    fontWeight: '700',
    textAlign: 'center',
  },
  addProject: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 18,
    left: 320,
    width: 35,
    height: 35,
    backgroundColor: '#2196F3',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => ({
  data: state.data,
  pitches: state.pitches,
  isLoadingComplete: state.isLoadingComplete,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (data) => dispatch(getItems(data)),
  getPitches: (data) => dispatch(getPitches(data)),
});

HomeScreenNav = withNavigation(HomeScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenNav);