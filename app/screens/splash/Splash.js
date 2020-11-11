import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Reachability } from '../../services/netInfo/Rechability';

class Splash extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      isLodaing: true,
    };
  }
    componentDidMount =() => {

      setTimeout(() => { 
        this.setState({
          isLodaing: false
        })   
        }, 5000);

        this.props.checkIfAlreadyAuthenticated();
    }

    render() {

      const { isLodaing } = this.state; 
      if (isLodaing == false) {
      
        if (this.props.usertoken && this.props.usertoken != '') {
         
          console.log('user token in get for saved', this.props.userProfile);
           if (this.props.userProfile) {
            this.props.navigation.navigate('DrawerNavigationRoutes')  
          }
  
        } else {
          console.log('user token in get for saved', this.props.usertoken);
          this.props.navigation.navigate('Auth')
  
        } 

      }

    return (
        <View style={styles.container}>
          <Image
            source={require('../../assets/image/logo/Logo.png')}
            style={{ width: '90%', height:200, resizeMode: 'contain', margin: 30 }}
          />
        </View>
      );
    };
  }
  
 export default Splash;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#aa182c',
        },
        activityIndicator: {
          alignItems: 'center',
          height: 80,
        },
      }); 