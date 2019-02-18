import React from 'react';
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import Basket from './Basket';
import { withNavigation } from 'react-navigation';


class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Portfolio',
  };

render() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>

          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>Portfolio</Text>
          </View>
          <Image
                source={
                  __DEV__
                    ? {uri: this.props.photoUrl}
                    : {uri: this.props.photoUrl}
                }
                style={styles.userImage}
              /> 

          <ScrollView style={styles.container1} >
            <Basket />
          </ScrollView>

        </View>
      </ScrollView>
    </View>
  );
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
  userImage : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  }
});

const mapStateToProps = (state) => ({
  data: state.data,
  basket: state.basket,
  name: state.name,
  photoUrl: state.photoUrl,
});

const mapDispatchToProps = (dispatch) => ({
  getBasket: (data) => dispatch(getBasket(data))
});


LinksScreenNav = withNavigation(LinksScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreenNav);

