

import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { DietPlanListDetails, MemberDetails, PackageListDetailsDetailsProps } from "../../interface/common"
// import { ServiceDetails } from "../../interface/commonTypes"

const  membersList = [
  {
      memberName:'sriganesh j',
      mobileNo:'8765432110',
      emailId:'sriganesh98789@gmail.com',
      dateOfJoin:'01/07/2024',
      dateOfBirth:'01/07/1997',
      lastpaymentDate:'01/07/2024',
      nextPaymentDate:'01/08/2024',
      address:'123, kamaraj nagar mettupalayam, coimbatore 641304',
      profileImage:'',
      memberID:'AG001',
      planDetails:{
        planName:'one month plan',
        value:1000,
        duration :30, // days
        planID:1,
        dueAmount:0,
      },
      gender:'M'
  },
]


const  planList = [
  {
      planID:1,
      planName:'one month plan',
      duration:30, // days
      planValue:1000
  },
  {
      planID:2,
      planName:'two month plan',
      duration:60, // days
      planValue:1800
  },
  {
      planID:3,
      planName:'two month plan',
      duration:90, // days
      planValue:2500
  },
]


const commonSlice = createSlice({
  name: "commonData",
  initialState: {
    membersList:[] as MemberDetails[],
    planList:[] as PackageListDetailsDetailsProps[],
    dietPlanList:[] as DietPlanListDetails[]

  },
  reducers: {
    updateMemberList(state, action: PayloadAction<MemberDetails[]>) {
        state.membersList = action.payload
      },
      updatePlanList(state, action: PayloadAction<PackageListDetailsDetailsProps[]>) {
        state.planList = action.payload
      },
      updateDietPlanList(state, action: PayloadAction<DietPlanListDetails[]>) {
        state.dietPlanList = action.payload
      }
  
  }
})
export const { 
  updateMemberList,
  updatePlanList,
  updateDietPlanList
} = commonSlice.actions

export default commonSlice.reducer
