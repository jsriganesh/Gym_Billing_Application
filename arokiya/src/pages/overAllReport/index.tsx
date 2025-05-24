import React, { useEffect, useState } from 'react';
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
import PieChartReport from './pieChart';
import BarChartReport from './barChart';
import LineChartReport from './lineChart';
import { paymentReportChartConfig, memberJoinReportChartConfig, barchartDefaultValue } from '../../utils/constant';
import { colors } from '../../utils/colors';
import { getRequest, postRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';
import { BarCharDataProps, PieCharDataProps } from '../../interface/common';
import PageHeader from '../../components/pageHeader';


const OverAllReport = () => {
  const [paymentChartDetails, setPaymentChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
  const [membersChartDetails, setMembersChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
  const [membersPaymentChartDetails, setMembersPaymentChartDetails] = useState<PieCharDataProps>([])

  const getMembersPaymentChartDetails = () => {
    getRequest(EndPoint.membersPaymentChartDetails,
      (success) => {
        if (success.data) {
          setMembersPaymentChartDetails(success.data)

        } else {
        }
      },
      (error) => { console.log('error ', error) },
    )

  }

  const getPaymentChartDetails = () => {
    const datas = {
      fromDate: '2023-12-30T:18:30.00Z',
      toDate: '2024-12-30T:18:29.59Z'
    }


    postRequest(EndPoint.paymentChartDetails,
      datas,
      (success) => {
        console.log(' *****datas *******', success)

        if (success.data) {
          setPaymentChartDetails(success.data.data)

        } else {
          // setPaymentList([])
          // setTotalAmount(0)
        }
      },
      (error) => { console.log('error -->', error) },
    )

  }

  const getMembersChartDetails = () => {
    const datas = {
      fromDate: '2023-12-30T:18:30.00Z',
      toDate: '2024-12-30T:18:29.59Z'
    }


    postRequest(EndPoint.membersChartDetails,
      datas,
      (success) => {
        if (success.data) {
          setMembersChartDetails(success.data)

        } else {
        }
      },
      (error) => { console.log('error -->', error) },
    )

  }


  useEffect(() => {
    getMembersPaymentChartDetails()
    getPaymentChartDetails()
    getMembersChartDetails()
  }, [])



  return (
    <View style={{ flex: 1}}>
      <PageHeader label='Over All Report'/>
      <ScrollView>
        <BarChartReport label={'Payment report monthly wise - active members only'}
          data={paymentChartDetails}
          prefix={'₹'}
          suffix={''}
          config={paymentReportChartConfig}
        />
        <PieChartReport data={membersPaymentChartDetails} />
        <BarChartReport label={'Members join report - every month'}
          data={membersChartDetails}
          prefix={''}
          suffix={''}
          config={memberJoinReportChartConfig}
        />
      </ScrollView>
    </View>
  )
}

export default OverAllReport


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1
  }
})