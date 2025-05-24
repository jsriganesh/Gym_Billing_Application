import { TouchableOpacity, View } from "react-native"


import Icons from 'react-native-vector-icons/Ionicons';
import BillIcon from 'react-native-vector-icons/FontAwesome';
import { colors, memberListCardColors } from "../../utils/colors";
import { Text12PXBold } from "../styledComponents/labels";


interface IconWithTitleProps{
    iconName:string,
    label:string,
    onClick?:()=>void
}
export const IconWithTitle =({iconName,label,onClick}:IconWithTitleProps)=>{
    return <TouchableOpacity style={{alignItems:"center"}} onPress={()=>onClick&& onClick()}>
         {label === 'Bill' ? <BillIcon name={iconName} size={22} color={colors.lightGrey} /> :<Icons name={iconName} size={22} color={colors.lightGrey} />}
         <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label}`}</Text12PXBold>
     </TouchableOpacity>
 }