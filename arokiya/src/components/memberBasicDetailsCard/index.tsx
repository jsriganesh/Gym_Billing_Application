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
import { Text12PXBold, Text12PXSemiBold, Text14PXBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
// import { PrimaryButton } from '../../components/buttons'

import Icons from 'react-native-vector-icons/Ionicons';
import BillIcon from 'react-native-vector-icons/FontAwesome';
import { IconWithTitle } from "../supportIcons";
import { MemberDetails } from "../../interface/common";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../utils/screenNames";
import { changeDateFormat } from "../../commonMethods";


interface MembersBasicDetailsCardProps{
    memberDetails:MemberDetails
    hideSupportIcon?:boolean
}
const MembersBasicDetailsCard = ({memberDetails,hideSupportIcon}:MembersBasicDetailsCardProps) => {
    const navigation = useNavigation();

    const details = (label: string, value: string, sameLine: boolean = true) => {
        return (
            <View style={{ flexDirection: sameLine ? 'row' : 'column', marginBottom: 5,flex:0.5 }}>
                <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label}: `}</Text12PXBold>
                <Text12PXSemiBold style={{ color: memberListCardColors.valueColoe }}>{value}</Text12PXSemiBold>
            </View>
        )
    }
    const dueAmountView = (label: string, value: string,highlighttValue?:boolean) => {
        return (
            <View style={{ justifyContent:'space-between'}}>
                <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label} `}</Text12PXBold>
                <Text14PXBold style={{ color: highlighttValue ? colors.red:memberListCardColors.valueColoe}}>{value}</Text14PXBold>
            </View>
        )
    }


  
    const supportIconList = [
        { iconName: 'call', label: 'Call' },
        { iconName: 'chatbox', label: 'Message' },
        { iconName: 'gift', label: 'Renew' },
        { iconName: 'ban', label: 'Block' },
    ]
    return (
        <View style={styles.segmentContainer}>
                <View style={styles.details}>
                    <View style={styles.profileImage}></View>
                    <View style={styles.detailsInfo}>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            {details('Name', memberDetails.memberName, false)}
                            {details('Member ID', memberDetails.memberID, false)}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            {details('Mobile No', memberDetails.mobileNo, false)}
                            {details('Email ID', memberDetails.emailId, false)}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            {details('Date of join', changeDateFormat(memberDetails.dateOfJoin as Date), false)}
                            {details('Last payment', changeDateFormat(memberDetails.lastpaymentDate as Date), false)}
                            {details('Next payment', changeDateFormat(memberDetails.nextPaymentDate as Date), false)}
                        </View>
                    </View>
                </View>
                {!hideSupportIcon && <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                    {supportIconList.map((icon, index) => <IconWithTitle key={index} iconName={icon.iconName} label={icon.label}
                    onClick={()=>{
                      if(icon.label === 'Renew')  navigation.navigate(ScreenName.renewPlanDetailsScreen, {memberDetails} )
                    }}
                    />)}
                    {dueAmountView('Due Amount', memberDetails.planDetails.dueAmount.toString(),memberDetails.planDetails.dueAmount > 0 )}
                </View>}
            </View>
    )
}

export default MembersBasicDetailsCard

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contants: {
        backgroundColor: colors.white,
        flex: 1,
        marginVertical: 0
    },
    segmentContainer: {
        backgroundColor: memberListCardColors.backgroundColor,
        paddingVertical: 16,
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:10

    },
    details: {
        flexDirection: 'row'
    },
    profileImage: {
        flex: 0.3
    },
    detailsInfo: {
        flex: 0.7
    },


})