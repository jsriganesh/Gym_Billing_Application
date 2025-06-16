import { getRequest } from "./axiosService"
import { EndPoint } from "./endPoint"
import { configureStore } from '@reduxjs/toolkit';
import { store } from './../redux/store';         
import { updateMemberList, updatePlanList } from "../redux/slices/commonSlice";

export const getAllPlanList =()=>{
     getRequest(EndPoint.plan,
    (success) => {
        console.log('success ===>',success)
        if (success.length > 0) {
            store.dispatch(updatePlanList(success));
        } else {
            store.dispatch(updatePlanList([]));
        }
    },
    (error) => { console.log('error -->', error) },
)
}


export const getAllMembers =()=>{
    getRequest(EndPoint.membersList,
   (success) => {
       console.log('members ===>',success)
       if (success.length > 0) {
           store.dispatch(updateMemberList(success));
       } else {
           store.dispatch(updateMemberList([]));
       }
   },
   (error) => { console.log('error -->', error) },
)
}