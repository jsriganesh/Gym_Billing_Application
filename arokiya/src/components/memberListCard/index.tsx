import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React from 'react'
import { colors, memberListCardColors } from '../../utils/colors'
import { Text12PXBold, Text12PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
// import { PrimaryButton } from '../../components/buttons'

import Icons from 'react-native-vector-icons/Ionicons';
import BillIcon from 'react-native-vector-icons/FontAwesome';
import { IconWithTitle } from "../supportIcons";
import { GeneralProps, MemberDetails } from "../../interface/common";
import { Route, useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../utils/screenNames";
import { changeDateFormat } from "../../commonMethods";


// interface MembersListCard{
//     memberDetails:MemberDetails
//     index:number
// }

interface Props extends GeneralProps {
    // userDetails: UserDetailsProps;
    memberDetails:MemberDetails
    index:number
    route: Route<string, object | undefined>;
  }
  


const MembersListCard: React.FC<Props>  = ({memberDetails,index,navigation}) => {
    // const navigation = useNavigation();

    const details = (label: string, value: string, sameLine: boolean = true) => {
        return (
            <View style={{ flexDirection: sameLine ? 'row' : 'column', marginBottom: 5 }}>
                <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label}: `}</Text12PXBold>
                <Text12PXSemiBold style={{ color: memberListCardColors.valueColoe }}>{value}</Text12PXSemiBold>
            </View>
        )
    }

  

    const supportIconList =[
        {iconName:'call',label:'Call'},
        {iconName:'chatbox',label:'Message'},
        {iconName:'gift',label:'Renew'},
        {iconName:'ban',label:'Block'},
        {iconName:'rupee',label:'Bill'},
    ]

    return (
        <View style={memberListCardstyles.body} key={index}>
            <TouchableOpacity style={memberListCardstyles.basicDetails} onPress={()=>navigation.navigate(ScreenName.memberDetailsScreen ,{memberDetails} )}>
                <View style={memberListCardstyles.profile}>
                    <View style={memberListCardstyles.profileNoImage}></View>
                </View>
                <View style={memberListCardstyles.details}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        {details('Name', memberDetails.memberName)}
                        {details('ID', `#${memberDetails.memberID}`)}
                    </View>
                    {details('Mobile No', memberDetails.mobileNo)}
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        {details('Date of joining', changeDateFormat(memberDetails.dateOfJoin as Date), false)}
                        {details('Plan Expiry', changeDateFormat(memberDetails.nextPaymentDate as Date), false)}
                        {details('Due Amount', memberDetails.planDetails.dueAmount.toString(), false)}
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: "space-between",marginHorizontal:8,marginVertical:5 }}>
                {supportIconList.map((icon,index)=><IconWithTitle key={index} iconName={icon.iconName} label={icon.label} onClick={()=>{
                    if(icon.label === 'Renew'){
                        navigation.navigate(ScreenName.renewPlanDetailsScreen, {memberDetails} )
                    }
                }}/>)}
            </View>

        </View>
    )
}

export default MembersListCard

export const memberListCardstyles = StyleSheet.create({
    body: {
        backgroundColor: memberListCardColors.backgroundColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 8
    },
    basicDetails: {
        flexDirection: 'row'
    },
    profile: {
        flex: 0.17
    },
    profileNoImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: '#D9D9D9'
    },
    details: {
        flex: 0.83
    }


})