import React, { Component } from 'react';
import { StyleSheet ,processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {
    Text,
    View
  } from 'native-base';
  import { Dimensions } from "react-native";
  // import incoming from '../../../assets/image/incoming/incoming.png';
  import { FONT_FAMILY_PT_REGULAR} from '../../../utils/styles/typography';
  import moment from 'moment';

  const screenWidth = Dimensions.get("window").width;
  import * as config from '../../../utils/localization/config/i18n';

  
class StackBarCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      legend: {
        enabled: false,
      },
      xAxis:{
        enabled: true,
        granularity: 1,
        drawLabels: true,
        position: 'BOTTOM',
        drawAxisLine: true,
        drawGridLines: false,
       // fontFamily: 'SFProText-Medium',
       // fontWeight: 'bold',
        textSize: 13,
        textColor: processColor('black'),
        valueFormatter: [],
        },
      data: {
        dataSets: [{
          values: [[0],[0],[0],[0]],
          label: '',
          config: {
            colors: [processColor('#4ca8f2'), processColor('#f2d98e'), processColor('#ff8373')],
            stackLabels: ['Open', 'Close', 'Info Only']
          }
        }],
      },
    };
  }
  componentDidMount = () => {
    var tempChartLabels = [];
    var tempCountArr_Open = [];
    var tempCountArr_Closed = [];
    var tempCountArr_InfoOnly = [];
    
    this.props.barchartsData.filter((t, i) => {
      let d = new Date(new Date().setMonth(t.month-1)).setFullYear(t.year);
      moment.locale('en');
      tempChartLabels[i] = moment(d ).format('MMM YYYY');

          if (t.status == "Open") {
            tempCountArr_Open.push(t.count);
          } else if (t.status == "Closed") {
            tempCountArr_Closed.push(t.count);
          } else if (t.status == "Info Only") {
            tempCountArr_InfoOnly.push(t.count);
          }
    });
    
     var array = []
     array.push(tempCountArr_Open[0]);
     array.push(tempCountArr_Closed[0]);
     array.push(tempCountArr_InfoOnly[0]);
     var array1 = []
     array1.push(tempCountArr_Open[1]);
     array1.push(tempCountArr_Closed[1]);
     array1.push(tempCountArr_InfoOnly[1]);
     var array2 = []
     array2.push(tempCountArr_Open[2]);
     array2.push(tempCountArr_Closed[2]);
     array2.push(tempCountArr_InfoOnly[2]);
     var array3 = []
     array3.push(tempCountArr_Open[3]);
     array3.push(tempCountArr_Closed[3]);
     array3.push(tempCountArr_InfoOnly[3]);
     const unique = new Set(tempChartLabels);
     const uniqueData = [...unique];
     this.setState({
      data: {
        xAxis:{
          enabled: true,
          granularity: 1,
          drawLabels: true,
          position: 'BOTTOM',
          drawAxisLine: true,
          drawGridLines: false,
         // fontFamily: 'SFProText-Medium',
         // fontWeight: 'bold',
          textSize: 13,
          textColor: processColor('black'),
          valueFormatter: uniqueData,
          },
          dataSets: [{
            values: [[0],[0],[0],[0]],
            label:'',
            config: {
              colors: [processColor('#4ca8f2'), processColor('#f2d98e'), processColor('#ff8373')],
              stackLabels: ['Open', 'Close', 'Info Only']
            } 
          }],
        },
      })
  };

  componentDidUpdate = (prevProps) => {  
    if (prevProps.barchartsData !== this.props.barchartsData && this.props.barchartsData.length > 0) {
      var tempChartLabels = [];
      var tempCountArr_Open = [];
      var tempCountArr_Closed = [];
      var tempCountArr_InfoOnly = [];
      
      this.props.barchartsData.filter((t, i) => {
        let d = new Date(new Date().setMonth(t.month-1)).setFullYear(t.year);
        moment.locale('en');
        
        tempChartLabels[i] = moment(d ).format('MMM YYYY');  
            if (t.status == "Open") {
              tempCountArr_Open.push(t.count);
            } else if (t.status == "Closed") {
              tempCountArr_Closed.push(t.count);
            } else if (t.status == "Info Only") {
              tempCountArr_InfoOnly.push(t.count);
            }
      });
      var array = []
      array.push(tempCountArr_Open[0]);
      array.push(tempCountArr_Closed[0]);
      array.push(tempCountArr_InfoOnly[0]);
      var array1 = []
      array1.push(tempCountArr_Open[1]);
      array1.push(tempCountArr_Closed[1]);
      array1.push(tempCountArr_InfoOnly[1]);
      var array2 = []
      array2.push(tempCountArr_Open[2]);
      array2.push(tempCountArr_Closed[2]);
      array2.push(tempCountArr_InfoOnly[2]);
      var array3 = []
      array3.push(tempCountArr_Open[3]);
      array3.push(tempCountArr_Closed[3]);
      array3.push(tempCountArr_InfoOnly[3]);  

      const unique = new Set(tempChartLabels);
      const uniqueData = [...unique];

      this.setState({
        xAxis:{
          enabled: true,
          granularity: 1,
          drawLabels: true,
          position: 'BOTTOM',
          drawAxisLine: true,
          drawGridLines: false,
         // fontFamily: 'SFProText-Medium',
         // fontWeight: 'bold',
          textSize: 13,
          textColor: processColor('black'),
          valueFormatter: uniqueData,
          },
        data: {
            dataSets: [{
              values: [array,array1,array2,array3],
              label:'',
              config: {
                colors: [processColor('#4ca8f2'), processColor('#f2d98e'), processColor('#ff8373')],
                stackLabels: ['Open', 'Close', 'Info Only']
              },
            }],
          },
        }) 
    }
  }

    render() {
      if (config.fallback == 'en'){
        return ( 
           <View style={styles.container}>
             <View style={styles.mainContainer}>
             <Text style={{fontSize:20,fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:20,marginTop:10,marginBottom:20}}>{this.props.name}</Text>
             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                 <View style={{width:30,height:10,backgroundColor:'#ff8373'}}/>
                 <Text style={{marginLeft:5}}>Open</Text>
                 <View style={{width:30,height:10,marginLeft:15,backgroundColor:'#f2d98e'}}/>
                 <Text style={{marginLeft:5}}>Closed</Text>
                 <View style={{width:30,height:10,marginLeft:15,backgroundColor:'#4ca8f2'}}/>
                 <Text style={{marginLeft:5}}>Info Only</Text>
              </View>
              
             <BarChart
            style={styles.chart}           
            data={this.state.data}
            legend={this.state.legend}
           drawValueAboveBar={true}
           xAxis={this.state.xAxis}

           label= {''}
            marker={{
              enabled: true,
              markerColor: processColor('#F0C0FF8C'),
              textColor: processColor('white'),
              markerFontSize: 14,
            }}
          />
             </View>
           </View>
        );
       }else {
        return ( 
          <View style={styles.container}>
            <View style={styles.mainContainer}>
            <Text style={{fontSize:20,fontFamily:FONT_FAMILY_PT_REGULAR,marginRight:20,marginTop:10,marginBottom:20,textAlign:'right'}}>{this.props.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
               
               <Text style={{marginRight:5}}>Info Only</Text>
                <View style={{width:30,height:10,marginRight:15,backgroundColor:'#4ca8f2'}}/>

                <Text style={{marginRight:5}}>Closed</Text>
                <View style={{width:30,height:10,marginRight:15,backgroundColor:'#f2d98e'}}/>

                <Text style={{marginRight:5}}>Open</Text>
                <View style={{width:30,height:10,backgroundColor:'#ff8373'}}/>

             </View>
             
            <BarChart
           style={styles.chart}          
           data={this.state.data}
           legend={this.state.legend}
          drawValueAboveBar={true}
          xAxis={this.state.xAxis}

          label= {''}
           marker={{
             enabled: true,
             markerColor: processColor('#F0C0FF8C'),
             textColor: processColor('white'),
             markerFontSize: 14,
           }}
         />
            </View>
          </View>
       );
       }
    }
}

export default StackBarCharts;
const styles = StyleSheet.create({
  container: {
    // flex:1,
    height:450,
   //width:screenWidth + 40,
    marginLeft:10,
    marginRight:10,
    marginTop:-20,
    flexDirection:'column',
    borderColor:'#f2f2f2',
    shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 1,
      shadowOffset: {
       height: 1,
       width: 1
     }

  },
  mainView:{
    flex:1,
    justifyContent:'center',
  },
  mainContainer : {
    height:400,
    // width:screenWidth ,
    paddingHorizontal:0,
    paddingVertical:0,
    marginLeft:0,
    marginRight:0,
    marginTop:0,
    borderWidth:0,
    borderRadius:7,
    flexDirection:'column',
    shadowColor:'#f2f2f2', 
    backgroundColor:'white',
    shadowColor: "#F3f2f2",
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: {
     height: 1,
     width: 1
   }
  },
    circleOpen: {
      width: 24,
      height: 24,
      borderRadius: 24/2,
      color:"#9898e6",
      backgroundColor:"#9898e6"
   },
   circleClose: {
    width: 24,
    height: 24,
    borderRadius: 24/2,
    color:"#f9db8f",
    backgroundColor:"#f9db8f"
  },
  circleInfo: {
    width: 24,
    height: 24,
    borderRadius: 24/2,
    color:"#ef8979",
    backgroundColor:"#ef8979"
  },
  chart: {
    flex: 1,
    marginTop:10,
    marginBottom:20,
    width:screenWidth-20
  }
 });