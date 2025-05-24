import moment from "moment"
import { DropDownProps,PackageListDetailsDetailsProps } from "../interface/common"
import { bookingStatusColors } from "../utils/colors"


export const convertLocalDate=(date:Date)=>{
    return date.toLocaleDateString()
}
export const convertLocalTime=(date:Date)=>{
    return date.toLocaleTimeString()
}

export const getBookingStatusColorCode=(status:'P'|'A'|'C'|'R'|'D'):string=>{
    switch(status){
        case 'P':  return bookingStatusColors.pending; break;
        case 'A':  return bookingStatusColors.approved; break;
        case 'C':  return bookingStatusColors.canceled; break;
        case 'R':  return bookingStatusColors.rejected; break;
        case 'D':  return bookingStatusColors.done; break;
    }
}


export const preparPackageListForDropDown=(list:PackageListDetailsDetailsProps[]):DropDownProps[]=>{
    

    const newList : DropDownProps[] = list.map((pack)=>{ return {key:pack.planID.toString(),value:pack.planName,planDetails:pack}})
    return newList
    
}


export const changeDateFormat= (date:Date)=> moment(date).format('DD/MM/YYYY')