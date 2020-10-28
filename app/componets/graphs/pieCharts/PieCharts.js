import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, processColor } from 'react-native';
import { Dimensions, Image } from "react-native";
import incoming from '../../../assets/image/incoming/incoming.png';
import {PieChart} from 'react-native-charts-wrapper';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_SIZE_14} from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import * as config from '../../../utils/localization/config/i18n';

  
class PieCharts extends Component {

  constructor(props){
    super(props);
    this.state = {
      legend: {
        enabled: false,
        textSize: 15,
        //form: '',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
       wordWrapEnabled: true
     },
      data: {
        dataSets: [{
          values: [0,0,0],
          label:'',
          config: {
            
           // valueTextSize: 20,
           // valueTextColor: processColor('green'),
            sliceSpace: 5,
            //selectionShift: 13,
             xValuePosition: "OUTSIDE_SLICE",
             yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "",
            //valueLineColor: processColor('green'),
           // valueLinePart1Length: 0.5
          }
        }],
      },
     // highlights: [{x:2}],
      // description: {
      //   text: 'This is Pie chart description',
      //   textSize: 15,
      //   textColor: processColor('darkgray'),

      // }
    };
    
  }

  componentDidMount = () => {
    console.log('Pie charts componet did mount method');
    const tempCountArr = [];
    
    this.props.pieChartData.filter((t,i) => {
          tempCountArr[i] = t.count;
})
    this.setState({
      data: {
        dataSets: [{
          values: [tempCountArr[0] ,
          tempCountArr[1],
          tempCountArr[2]],
            label:'',
          config: {
            colors: [processColor('#ff8373'), processColor('#f2d98e'), processColor('#4ca8f2')],
            valueTextSize: 20,
           // valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "",
           // valueLineColor: processColor('green'),
           // valueLinePart1Length: 0.5
          }
        }],
      },
    })
  }
  
   componentDidUpdate = (prevProps) => {
     if (prevProps.pieChartData !== this.props.pieChartData) {
     const tempCountArr = [];
    
      this.props.pieChartData.filter((t,i) => {
            tempCountArr[i] = t.count;
  })
    console.log('Pie charts data', tempCountArr);

     this.setState({
      data: {
        dataSets: [{
          values: [tempCountArr[0] ,
            tempCountArr[1],
            tempCountArr[2]],
            label:'',
          config: {
            colors: [processColor('#ff8373'), processColor('#f2d98e'), processColor('#4ca8f2')],
            valueTextSize: 20,
           // valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 13,
           
            valueFormatter: "",
           // valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5
          }
        }],
      },
    })
     
     }
  }

    render() {
      if (config.fallback == 'en') {
        return (
          <View style={styles.container}>
            <View style={styles.mainContainer}>
                 <Text style={{fontSize:20,fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:20,marginTop:10,marginBottom:20}}>{this.props.name}</Text>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                 <View style={{width:30,height:10,backgroundColor:'#ff8373'}}/>
                 <Text style={{marginLeft:5}}>Open</Text>
                 <View style={{width:30,height:10,marginLeft:15,backgroundColor:'#ffda83'}}/>
                 <Text style={{marginLeft:5}}>Closed</Text>
                 <View style={{width:30,height:10,marginLeft:15,backgroundColor:'#4ca8f2'}}/>
                 <Text style={{marginLeft:5}}>Info Only</Text>
             </View>
    
          <PieChart
            style={styles.chart}
            logEnabled={true}
            width={screenWidth -20}
            //chartBackgroundColor={processColor('#f0f0f0')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            //highlights={this.state.highlights}

            entryLabelColor={processColor('#FFFFFF')}
            entryLabelTextSize={0}
            drawEntryLabels={false}
           
           ///  selectedEntry={false}
            //rotationEnabled={true}
           // rotationAngle={60}
            usePercentValues={false}
           // styledCenterText={{text:'Pie center text!', color: processColor('pink'), size: 20}}
          //  centerTextRadiusPercent={200}
            //holeRadius={60}
            //holeColor={processColor('#f0f0f0')}
           // transparentCircleRadius={45}
           // transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={360}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
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
    
          <PieChart
            style={styles.chart}
            logEnabled={true}
            width={screenWidth -20}
            //chartBackgroundColor={processColor('#f0f0f0')}
            chartDescription={this.state.description}
            data={this.state.data}
           // legend={this.state.legend}
            //highlights={this.state.highlights}

            entryLabelColor={processColor('#FFFFFF')}
            entryLabelTextSize={0}
            drawEntryLabels={false}
           
           ///  selectedEntry={false}
            //rotationEnabled={true}
           // rotationAngle={60}
            usePercentValues={false}
           // styledCenterText={{text:'Pie center text!', color: processColor('pink'), size: 20}}
          //  centerTextRadiusPercent={200}
            //holeRadius={60}
            //holeColor={processColor('#f0f0f0')}
           // transparentCircleRadius={45}
           // transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={360}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />    
              </View>
            </View>  
        );
      }
    }
}

export default PieCharts;

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:400,
    // width:screenWidth + 40,
    marginLeft:0,
marginRight:20,
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
    height:350,
    width:screenWidth-20,
    paddingHorizontal:0,
    paddingVertical:0,
    marginLeft:10,
    marginRight:10,
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
  width:screenWidth
 }
});
 