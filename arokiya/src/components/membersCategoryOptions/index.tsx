import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text12PXSemiBold, Text14PXBold } from '../styledComponents/labels'
import Icons from 'react-native-vector-icons/Ionicons';
import { colors, memberListCardColors } from '../../utils/colors';
import { EmptySpace } from "../../components/commonComponents";
import AddIcons from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DietPlanDetails, DietPlanListDetails, MemberDetails } from '../../interface/common';
import { DietPlanList } from '../dietPlanComponents';
import { putRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';
import { updateMemberList } from '../../redux/slices/commonSlice';
import DietPlanSection from './dietPlanSection';
import PackagesSection from './pacakgesSection';
import DietPlanModal from '../dietPlanModal';

interface MemberDetailsUtilsOptions { label: string, key: string }
interface MembersUtilsOptionProps {
    options: MemberDetailsUtilsOptions,
    memberDetails?: MemberDetails
    showMemberEditDiet?:(details:DietPlanDetails[])=> void
    updateMemberDietPlan?:(details:DietPlanDetails[]) => void

}


const MembersUtilsOption = ({ options, memberDetails,showMemberEditDiet ,updateMemberDietPlan}: MembersUtilsOptionProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const { dietPlanList } = useAppSelector((state) => state.commonData);
    const { membersList } = useAppSelector((state) => state.commonData);
    const dispatch = useAppDispatch();

    const [dietPlans, setDietPlans] = useState<DietPlanDetails[]>(memberDetails?.dietPlanDetails ? memberDetails?.dietPlanDetails : [])
    
    useEffect(()=>{
       if(memberDetails?.dietPlanDetails) setDietPlans([...memberDetails.dietPlanDetails])
    },[memberDetails?.dietPlanDetails])


    // const updateMemberDietPlan = (selectedPlan: DietPlanDetails[]) => {
    //     if (memberDetails) {

    //         const updateData = { ...memberDetails, dietPlanDetails: selectedPlan }

    //         putRequest(
    //             EndPoint.membersList + memberDetails._id,
    //             updateData,
    //             success => {
    //                 setDietPlans([...selectedPlan])
    //                 Alert.alert('updated success fully')
    //                 const list = [...membersList]
    //                 const findIndex = membersList.findIndex(member => success.memberID === member.memberID)
    //                 if (findIndex >= 0) {
    //                     list.splice(findIndex, 1, success)
    //                     memberDetails = success
    //                     dispatch(updateMemberList(list))
    //                 }
    //             },
    //             error => {
    //                 console.log('error -->', error);
    //             },
    //         );
    //     }
    // }

    return (
        <>
            <TouchableOpacity style={styles.optionsView} onPress={() => setShowDetails(!showDetails)}>
                <Text14PXBold style={{ color: colors.pink }}>{options.label}</Text14PXBold>
                <Icons name="chevron-forward-outline" style={showDetails ? {transform: [{rotate: '90deg'}]}:{}} color={colors.lightGrey} size={20} />
            </TouchableOpacity>

            {showDetails && <View style={{position:'relative'}}>
               {options.key === 'dietPlan' ? <DietPlanSection showMemberEditDiet={showMemberEditDiet} dietPlans={dietPlans} updateMemberDietPlan={(details)=>updateMemberDietPlan && updateMemberDietPlan(details)} /> :
                options.key === 'packages' ? <PackagesSection packageDetails={memberDetails && memberDetails?.planDetails} />:
                
                null}

            </View>}

            {/* {
                showDetails && <PackagesSection packageDetails={memberDetails && memberDetails?.planDetails} />
            } */}

            {<EmptySpace />}


            
        </>
    )
}


export default MembersUtilsOption



export const styles = StyleSheet.create({
    details: {
        flexDirection: 'row'
    },
    profileImage: {
        flex: 0.3
    },
    detailsInfo: {
        flex: 0.7
    },
    optionsView: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})