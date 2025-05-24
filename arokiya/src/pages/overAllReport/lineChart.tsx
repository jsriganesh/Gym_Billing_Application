import React from 'react';
import {
  AppRegistry,
  Dimensions,
  ScrollView,
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
import { Text12PXBold } from '../../components/styledComponents/labels';




const LineChartReport = () => {

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June","July"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43,10],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    // width:1000,
    backgroundGradientFrom: colors.themeColor,
    backgroundGradientTo: colors.themeColor,
    barPercentage: 0.7,
    height:5000, // bar gradient
    fillShadowGradient: colors.darkGrey,
    fillShadowGradientOpacity: 8,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => 'yellow',
    labelColor: (opacity = 1) => `white`,
  
    style: {
      flex:1,
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#e3e3e3",
      strokeDasharray: "0",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
    // propsForDots: {
    //   r: "10",
    //   strokeWidth: "10",
    //   stroke: "#ffa726"
    // }

  };

      const _chartConfig = {
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
        // propsForDots: {
        //     r: "6",
        //     strokeWidth: "2",
        //     stroke: "#ffa726"
        //   }
    
      };
      const graphStyle = {

        marginVertical: 10,   // Space around the chart
        marginHorizontal: 20, // Space on the sides
        borderRadius: 16,     // Rounded corners
        // backgroundColor: '#f4f4f4', // Custom background color
        padding: 5,           // Padding inside the chart
        // shadowColor: '#000',  // Shadow effect
        shadowOpacity: 0.2,
        shadowRadius: 5,
      };
      
    
  return (
      <View style={{}}>
  <Text>Payment report monthly wise - active members only </Text>
  <View>

  <ScrollView horizontal style={{width:screenWidth}}>
<View style={{}}>
<LineChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>
</View>
</ScrollView>
</View>

</View>

  )
}

export default LineChartReport


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      chart: {
        flex: 1
      }
})