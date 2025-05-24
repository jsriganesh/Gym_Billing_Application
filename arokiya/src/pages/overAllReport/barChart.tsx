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
import { Text12PXBold, Text14PXBold, Text16PXBold } from '../../components/styledComponents/labels';





interface BarChartInterFace {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  }
  prefix: string,
  suffix: string,
  label: string,
  config: object
}

const BarChartReport = ({ data, prefix, suffix, label, config }: BarChartInterFace) => {

  const screenWidth = Dimensions.get("window").width;

  const graphStyle = {

    // marginVertical: 10,   // Space around the chart
    marginHorizontal: 16, // Space on the sides
    borderRadius: 16,     // Rounded corners
    // backgroundColor: '#f4f4f4', // Custom background color
    padding: 5,           // Padding inside the chart
    // shadowColor: '#000',  // Shadow effect
    shadowOpacity: 0.2,
    shadowRadius: 5,
  };


  return (
    <View style={{marginVertical:5}}>
      <Text16PXBold style={{color:colors.themeColor,paddingLeft:10}}>{label}</Text16PXBold>
      <View>

        <ScrollView horizontal style={{ width: screenWidth }}>
          <View style={{}}>
            <BarChart
              // showBarTops
              showValuesOnTopOfBars
              data={data}
              // withInnerLines
              width={screenWidth}
              height={250}
              chartConfig={config}
              segments={5}
              flatColor
              showBarTops
              xLabelsOffset={0}
              style={graphStyle}
              // data={data}
              // width={screenWidth}
              // height={220}
              yAxisLabel={prefix}
              yAxisSuffix={suffix}
              // chartConfig={chartConfig}
              verticalLabelRotation={30}

            // fromZero={true} // Starts the Y-axis at 0
            // withInnerLines={false} // Removes grid lines inside the chart


            />
          </View>
        </ScrollView>
      </View>

    </View>

  )
}

export default BarChartReport


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
})