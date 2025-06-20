// import { ParamListBase, Route } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type RootStackParamList = {
    MemberDetails: { memberDetails:  MemberDetails};
  };
  
  // Define the data type you want to pass
  export interface Data {
    id: number;
    name: string;
    date: string;
  }
  
  





export type RadioButtonProps= {
    label:string,value:string
}

export type DropDownProps= {
    value:string,key:string,disabled?:boolean,
    planDetails?:PackageListDetailsDetailsProps
}


export type MemberDetails={
      memberName:string,
      mobileNo:string,
      emailId:string,
      dateOfJoin:string|Date,
      dateOfBirth:string|Date,
      lastpaymentDate:string|Date,
      nextPaymentDate:string|Date,
      address:string,
      profileImage:string,
      memberID:string,
      planDetails:PlanDetails,
      gender:string,
      dietPlanDetails?:DietPlanDetails[]
      _id:string
      bloodGroup?:string
}

export type PlanDetails={
    planName:string,
    value:number,
    planValue:number
    duration :number, // days
    planID:number,
    dueAmount:number,
}



export type PackageListDetailsDetailsProps={
  planName:string
  planValue:number,
    planDuration:number
    planID:number,
    _id?:string
}

export type FilterDatesProps = { fromDate: Date; toDate: Date }


export type PaymentHistoryDetails = {
  _id: string,
  memberName: string,
  memberID: number,
  paidDate: string,
  paidAmount: number,
  planID: number,
  dueAmount: number,
  paidMethod: string,
  paymentID: number,
  comments?:string
}



export type DietPlanListDetails = {
  _id: string,
  dietplanID:number,
  dietPlanList:DietPlanDetails[]
  dietPlanTitle:string
}

export type DietPlanDetails = {
  description:string,
  period:string,
  time:string
}

export type BarCharDataProps = {
  labels: string[];
  datasets: {
      data: number[];
  }[];
}

export type PieCharDataProps = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
  membersList:MemberDetails[]
}[]