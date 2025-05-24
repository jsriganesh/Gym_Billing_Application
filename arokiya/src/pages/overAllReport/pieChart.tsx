import React from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,  
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { colors } from '../../utils/colors';
import { Text12PXBold, Text16PXBold } from '../../components/styledComponents/labels';


interface PieChartInterFace {
  data: {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}[]
}


const PieChartReport = ({data}:PieChartInterFace) => {
  
      const chartConfig = {
        // backgroundGradientFrom: "#1E2923",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "#08130D",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        // strokeWidth: 2, // optional, default 3
        // barPercentage: 0.5,
        // useShadowColorFromDataset: false // optional
        
        // style:{
        //     // color: 'pink'
        // },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
    
      };
      
    
  return (
      <View>
              <Text16PXBold style={{color:colors.themeColor,paddingLeft:10}}>{'Pending due amount members count'}</Text16PXBold>

  <View style={{flexDirection:'row',borderRadius:10,borderWidth:1,borderColor:colors.darkGrey,marginVertical:10,marginHorizontal:16,backgroundColor:colors.themeColor}}>
  <PieChart
    data={data}
    width={Dimensions.get("window").width/2.3}
    height ={150}
    chartConfig={chartConfig}
    accessor={"population"}
    backgroundColor={"transparent"}
    paddingLeft={"30"}
    center={[0, 0]}
    absolute
    hasLegend={false} 
  />

<View style={{justifyContent:"space-evenly"}}>
    {data.length > 0 && data.map((legend,index)=>{
        return (<View key={index} style={{flexDirection:"row",alignItems:"center"}}>
            <View style={{height:15,width:15,borderRadius:50,backgroundColor:legend.legendFontColor,marginRight:10}}/>
            <Text12PXBold style={{color:legend.legendFontColor}}>{`${legend.population} ${legend.name}`}</Text12PXBold>
        </View>)
    })}
  </View>

  
  </View>

</View>

  )
}

export default PieChartReport


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      chart: {
        flex: 1
      }
})