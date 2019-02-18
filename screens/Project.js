import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';


class Project extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render () {

    let myInv = this.props.el.lender === undefined ?  0 : this.props.el.lender["Toma"];
    let myInvFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(myInv);
    let targetAmm = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.props.el.targetAmt);
    let raisedAmm = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.props.el.raisedAmt);

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.props.navigation.push('Details', {project: this.props.el})} >

          <View style={styles.button} >

            <Image
                source={
                  __DEV__
                    ? {url: this.props.el.url}
                    : {url: this.props.el.url}
                }
                style={styles.projectImage}
              /> 


            <View style={styles.title} >
              <Text style={styles.titleText}>{this.props.el.projTitle}</Text>
            </View>

            <View style={styles.condition}>
              <Text style={styles.buttonText}>target: {targetAmm}</Text>
            </View>

            <View style={styles.titleDate} >
              <Text style={styles.dateText}>created: {this.props.el.creaDate}</Text>
            </View>

          </View>

        </TouchableOpacity>  

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 350,
    height: 280,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  projectImage: {
    width: 370,
    height: 280,
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    top: 215,
    left: 2,
    height: 20,
    paddingTop: 0,
    width: 346,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  condition: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    top: 235,
    left: 2,
    height: 20,
    width: 346,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  titleDate: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    top: 255,
    left: 2,
    height: 20,
    paddingBottom: 2,
    width: 346,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  titleText: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
    marginLeft: 3,
  },
  dateText: {
    color: '#4CD2FF',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 3,
  },
});

const mapStateToProps = (state) => ({
  pitches: state.pitches,
});

ProjectNav = withNavigation(Project);

export default connect(
  mapStateToProps
)(ProjectNav);
