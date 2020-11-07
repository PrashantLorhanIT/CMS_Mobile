import React, { Component } from 'react';
import { StyleSheet ,processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {
    Text,
    View
  } from 'native-base';
  import { Dimensions} from "react-native";
  // import incoming from '../../../assets/image/incoming/incoming.png';
  import {FONT_FAMILY_PT_REGULAR} from '../../../utils/styles/typography';
  import moment from 'moment';
  const screenWidth = Dimensions.get("window").width;
  import * as config from '../../../utils/localization/config/i18n';

class BarCharts extends Component {

  constructor(props) {

    super(props);
    this.state = {
      stack_barChartLabels_overdue:[],
      documenttypename: '',
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 50,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
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
            values: [0,0,0,0],
            label: '',
            config: {
              color: processColor('#ff8373')
            },
          }],
        },
    };
  }

  componentDidMount = () => {
    var tempChartLabels = [];
    var tempCountArr_Open = [];
   
    this.props.barchartsData.filter((t, i) => {
      let d = new Date(new Date().setMonth(t.month-1)).setFullYear(t.year);
      moment.locale('en');
      tempChartLabels[i] = moment(d ).format('MMM YYYY');
      tempCountArr_Open.push(t.count);

    });   
   // console.log('Bar charts value Array');
   // console.log(tempCountArr_Open);
    //console.log(tempChartLabels);
    // var jobs = this.props.barchartsData.map(item => {
    //         return item.documenttypename;
    //   });
      if (this.props.docId == 1){
        this.setState({
          documenttypename: 'Letter'
        });
      } else if (this.props.docId == 2) {
        this.setState({
          documenttypename: 'Circular'
        });
      } else if (this.props.docId == 3) {
        this.setState({
          documenttypename: 'Memo'
        });
      }else {
        this.setState({
          documenttypename: 'Letter'
        });
      }
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
      valueFormatter: tempChartLabels,
      },
        data: {
            dataSets: [{
              values: [0,0,0,0],
              label: '',
              config: {
                color: processColor('#ff8373'),
              },
            }],
          },
         
    })
  }

componentDidUpdate = (prevProps) => {
  //console.log('bar charts componet did update method ')

  if (prevProps.barchartsData !== this.props.barchartsData && this.props.barchartsData.length > 0) {
    var tempChartLabels = [];
      var tempCountArr_Open = [];
      
      this.props.barchartsData.filter((t, i) => {
        let d = new Date(new Date().setMonth(t.month-1)).setFullYear(t.year);
        moment.locale('en');
        tempChartLabels[i] = moment(d ).format('MMM YYYY');
        tempCountArr_Open.push(t.count);
      });   
      //console.log('Bar charts value Array');
      //console.log(tempCountArr_Open);
      //console.log(tempChartLabels);
      
        if (this.props.docId == 1){
          this.setState({
            documenttypename: 'Letter'
          });
        } else if (this.props.docId == 2) {
          this.setState({
            documenttypename: 'Circular'
          });
        } else if (this.props.docId == 3) {
          this.setState({
            documenttypename: 'Memo'
          });
        }else {
          this.setState({
            documenttypename: 'Letter'
          });
        }
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
            valueFormatter: tempChartLabels,
            },

          data: {
              dataSets: [{
                values: tempCountArr_Open ? tempCountArr_Open : [0,0,0,0],
                label: '',
                config: {
                  color: processColor('#ff8373'),
                },
                xAxis:{
                  enabled: false,
                  granularity: 1,
                  drawLabels: true,
                  position: 'BOTTOM',
                  labelRotationAngle: 90,
                  avoidFirstLastClipping: true,
                  drawAxisLine: true,
                  drawGridLines: false,
                  fontFamily: 'SFProText-Medium',
                  fontWeight: 'bold',
                  textSize: 15,
                  textColor: processColor('black'),
                  valueFormatter: tempChartLabels,
                  }
              }],
            },
            stack_barChartLabels_overdue: tempChartLabels,
            // documenttypename: jobs[0]
      })
  }
}

    render() {

      //console.log('Render Barcharts value updated');
      const { documenttypename } = this.state
      if (config.fallback == 'en'){
        return (
          
          <View style={styles.container}>
            <View style={styles.mainContainer}>
            <Text style={{fontSize:20,fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:20,marginTop:10,marginBottom:20}}>{this.props.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                <View style={{width:30,height:10,backgroundColor:'#ff8373'}}/>
                <Text style={{marginLeft:5}}>{this.state.documenttypename}</Text>
                {/* <Text style={{marginLeft:5}}>Letter</Text> */}

            </View>
            <BarChart
           style={styles.chart}
         //  xAxis={this.state.stack_barChartLabels_overdue}
            xAxis={this.state.xAxis}
           data={this.state.data}
           legend={this.state.legend}
           //label= {''}
          
           legend={this.state.legend}
          //  marker={{
          //    enabled: true,
          //    markerColor: processColor('#F0C0FF8C'),
          //    textColor: processColor('white'),
          //    markerFontSize: 14,
          //  }}
           highlights={this.state.highlights}
         />
            </View>
          </View>
       );
      } else {
        return (
          
          <View style={styles.container}>
            <View style={styles.mainContainer}>
            <Text style={{fontSize:20,fontFamily:FONT_FAMILY_PT_REGULAR,marginRight:20,marginTop:10,marginBottom:20, textAlign:'right'}}>{this.props.name}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
               
                <Text style={{marginLeft:5}}>{this.state.documenttypename}</Text>
                {/* <Text style={{marginRight:5}}>Letter</Text> */}
                <View style={{width:30,height:10,backgroundColor:'#ff8373'}}/>
            </View>
            <BarChart
           style={styles.chart}
         //  xAxis={this.state.stack_barChartLabels_overdue}
           data={this.state.data}
           legend={this.state.legend}
           label= {''}
          // drawValueAboveBar={true}
           marker={{
             enabled: true,
             markerColor: processColor('#F0C0FF8C'),
             textColor: processColor('white'),
             markerFontSize: 14,
           }}
           highlights={this.state.highlights}
         />
            </View>
          </View>
       );
       }    
    }
}

export default BarCharts;
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