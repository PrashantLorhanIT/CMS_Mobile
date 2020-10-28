import React, { Component } from 'react';

import {
    SafeAreaView,
    Body,
    Card,
    CardItem,
    Icon,
    Text,
    View,
    Segment,
    Container,
    Button,
    Content,
    
  } from 'native-base';
  import { ScrollView, Dimensions, StyleSheet,Image } from 'react-native';
  import { WHITE, TEMP_THEME_PRIMARY, TEMP_THEME_SECONDARY } from '../../utils/styles/colors';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_FAMILY_PT_BOLD } from '../../utils/styles/typography';
  import * as config from '../../utils/localization/config/i18n';

class DashboardCard extends Component {
    render() {
        if(this.props.red == true) {
            if (config.fallback == 'en'){
                return (
                    <Card style={styles.container} >
                        <CardItem style={{borderRadius:8}}>
                           <Body>
                           <View style={{marginTop:0,width:220,height:100}}>
                        
                        <View style={{marginTop:10}}>
                           <Text style={{fontSize:16,color:TEMP_THEME_PRIMARY,fontFamily:FONT_FAMILY_PT_BOLD,fontWeight: FONT_WEIGHT_BOLD,textAlign:'left'}}>{this.props.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginLeft:0}}>
                        <View style={{marginTop:30,marginLeft:10}}>
                           <Text style={{fontSize:30,color:TEMP_THEME_PRIMARY,fontWeight: FONT_WEIGHT_BOLD,fontFamily:FONT_FAMILY_PT_BOLD,color:TEMP_THEME_PRIMARY}}>{this.props.count ? this.props.count : 0}</Text>
                        </View>
                        <View style={{marginTop:7,marginRight:-15,backgroundColor:'#f2f2f2',height:70,width:80,justifyContent:'center',alignItems:'flex-end',borderTopStartRadius:200}}>
                            <Image style={{height:32,width:32,marginRight:20}} source ={this.props.image}/>
                        </View>
                        </View>   
                     </View>
                     </Body>
                     </CardItem>
                     </Card>
                );
            } else {
            return (
                <Card style={styles.container} >
                    <CardItem style={{borderRadius:8}}>
                       <Body>
                       <View style={{marginTop:0,width:220,height:100}}>
                    
                    <View style={{marginTop:10}}>
                       <Text style={{fontSize:16,color:TEMP_THEME_PRIMARY,fontFamily:FONT_FAMILY_PT_BOLD,fontWeight: FONT_WEIGHT_BOLD,textAlign:'right',marginRight:1}}>{this.props.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginRight:0}}>
                    <View style={{marginTop:7,marginLeft:-15,backgroundColor:'#f2f2f2',height:70,width:80,justifyContent:'center',alignItems:'flex-start',borderTopEndRadius:200}}>
                        <Image style={{height:32,width:32,marginLeft:20}} source ={this.props.image}/>
                    </View>
                    <View style={{marginTop:30,marginLeft:10}}>
                       <Text style={{fontSize:30,color:TEMP_THEME_PRIMARY,fontWeight: FONT_WEIGHT_BOLD,fontFamily:FONT_FAMILY_PT_BOLD,color:TEMP_THEME_PRIMARY}}>{this.props.count ? this.props.count : 0}</Text>
                    </View>
                    
                    </View>   
                 </View>
                 </Body>
                 </CardItem>
                 </Card>
            );
          }
        } else {
            if (config.fallback == 'en'){
                return (
                    <Card style={styles.container} >
                        <CardItem style={{borderRadius:8}}>
                           <Body>
                           <View style={{marginTop:0,width:220,height:100}}>
                        
                        <View style={{marginTop:10}}>
                           <Text style={{fontSize:16,color:'#373d38',fontFamily:FONT_FAMILY_PT_BOLD,fontWeight: FONT_WEIGHT_BOLD,textAlign:'left'}}>{this.props.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginLeft:0}}>
                        <View style={{marginTop:30,marginLeft:10}}>
                           <Text style={{fontSize:30,color:'#373d38',fontWeight: FONT_WEIGHT_BOLD,fontFamily:FONT_FAMILY_PT_BOLD,}}>{this.props.count ? this.props.count : 0}</Text>
                        </View>
                        <View style={{marginTop:7,marginRight:-15,backgroundColor:'#f2f2f2',height:70,width:80,justifyContent:'center',alignItems:'flex-end',borderTopStartRadius:200}}>
                            <Image style={{height:32,width:32,marginRight:20}} source ={this.props.image}/>
                        </View>
                        </View>   
                     </View>
                     </Body>
                     </CardItem>
                     </Card>
                );
            } else {
            return (
                <Card style={styles.container} >
                    <CardItem style={{borderRadius:8}}>
                       <Body>
                       <View style={{marginTop:0,width:220,height:100}}>
                    
                    <View style={{marginTop:10}}>
                       <Text style={{fontSize:16,color:'#373d38',fontFamily:FONT_FAMILY_PT_BOLD,fontWeight: FONT_WEIGHT_BOLD,textAlign:'right',marginRight:1}}>{this.props.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginLeft:0}}>
                    <View style={{marginTop:7,marginLeft:-15,backgroundColor:'#f2f2f2',height:70,width:80,justifyContent:'center',alignItems:'flex-start',borderTopEndRadius:200}}>
                        <Image style={{height:32,width:32,marginLeft:20}} source ={this.props.image}/>
                    </View>
                    <View style={{marginTop:30,marginLeft:10}}>
                       <Text style={{fontSize:30,color:'#373d38',fontWeight: FONT_WEIGHT_BOLD,fontFamily:FONT_FAMILY_PT_BOLD,}}>{this.props.count ? this.props.count : 0}</Text>
                    </View>
                    
                    </View>   
                 </View>
                 </Body>
                 </CardItem>
                 </Card>
            );
          }
        }
        
    }
}

export default DashboardCard;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
          borderRadius: 10,
        // borderColor: '#ddd',
        // borderBottomWidth: 0,
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.9,
        marginTop:0,
        //shadowRadius: 2,
        //elevation: 7,
        marginRight:5,
        marginLeft:20
    },
    mainContainer : {
        height:170,
        width:170,
        marginLeft:20,
       // borderWidth:0.1,
        borderRadius:10,
        shadowColor:'#f2f2f2', 
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
         height: 1,
         width: 1
       }
    }
  });