import { colors } from "./colors"


export enum DiscountEnum  {
    Percentage='P',
    Amount='A',
    None='N',
}

export const Gender =[
    {label:'Male',value:'M' },
    {label:'Female',value:'F' },
    {label:'others',value:'T' },
]

export const MemberFilterOption =[
    {label:'All',value:'all' },
    {label:'Active',value:'active' },
    {label:'In-Active',value:'inactive' },
]

export const DiscountList =[
    {label:'Percentage',value:DiscountEnum.Percentage },
    {label:'Amount',value:DiscountEnum.Amount },
    {label:'None',value:DiscountEnum.None},
]

export const PaymentMode =[
    {value:'Cash On Hand',key:'coh' },
    {value:'UPI',key:'upi' },
]
export const PackageDuration =[
    {value:'7 days - one week',key:'7' },
    {value:'30 days - one month)',key:'30' },
    {value:'60 days - two month',key:'60' },
    {value:'90 days - three month',key:'90' },
    {value:'120 days - four month',key:'120' },
    {value:'180 days - six month',key:'180' },
    {value:'365 days - one year',key:'365' },
]


export const DateFilterOptions =[
    {value:'Today',key:'today'},
    {value:'Yesterday',key:'yesterday'},
    {value:'Last 7 days',key:'last7days'},
    {value:'This month',key:'this month'},
    {value:'Last month',key:'last month'},
    {value:'Last 2 month',key:'last 2 months'},  // includig current month 
    {value:'Last 3 month',key:'last 3 months'},  // includig current month 
    {value:'Last 6 month',key:'last 6 months'},  // includig current month 
    {value:'This year',key:'this year'},  // includig current month 
]

export const TimingRange =[
    {period:'Morning',timing:['05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM']},
    {period:'After Noon',timing:['12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM']},
    {period:'Evening',timing:['04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM']},
    {period:'Night',timing:['08:30 PM','09:00 PM','09:30 PM','10:00 PM']}
]

export const paymentReportChartConfig={

    backgroundGradientFrom: colors.themeColor,
    backgroundGradientTo: colors.themeColor,
    barPercentage: 0.7,
    height:5000, // bar gradient
    fillShadowGradient: colors.darkGrey,
    fillShadowGradientOpacity: 8,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => colors.white,
    labelColor: (opacity = 1) => colors.white,
    // barPercentage: 0.6, 
    spacingInner: 0.1,
    spacingOuter:0.7,
    style: {
      flex:1,
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 0.3,
      stroke: "#e3e3e3",
      strokeDasharray: "1",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
}

export const memberJoinReportChartConfig={

    backgroundGradientFrom: colors.themeColor,
    backgroundGradientTo: colors.themeColor,
    barPercentage: 0.7,
    height:5000, // bar gradient
    fillShadowGradient: '#7E69FF',
    fillShadowGradientOpacity: 8,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => colors.white,
    labelColor: (opacity = 1) => colors.white,
  
    style: {
      flex:1,
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 0.2,
      stroke: "#e3e3e3",
      strokeDasharray: "1",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
}



export const barchartDefaultValue ={
  labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
  datasets: [
    {
      data: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
  ]
}
