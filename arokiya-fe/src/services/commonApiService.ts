import { getRequest } from "./axiosService"
import { EndPoint } from "./endPoint"
import { configureStore } from '@reduxjs/toolkit';
import { store } from './../redux/store';         
import { updatePlanList } from "../redux/slices/commonSlice";

export const getAllPlanList =()=>{
     getRequest(EndPoint.plan,
    (success) => {
        if (success.length > 0) {
            store.dispatch(updatePlanList(success));
        } else {
            store.dispatch(updatePlanList([]));
        }
    },
    (error) => { console.log('error -->', error) },
)
}