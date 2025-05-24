import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DietPlanDetails, DietPlanListDetails } from '../../interface/common'
import { Text12PXSemiBold } from '../styledComponents/labels'
import { colors } from '../../utils/colors'
import AddIcons from 'react-native-vector-icons/AntDesign'
import { useAppSelector } from '../../redux/store'
import { DietPlanList } from '../dietPlanComponents'
import EditIcon from 'react-native-vector-icons/FontAwesome5'
import DietPlanModal from '../dietPlanModal'


interface DietPlanSectionProps {
    dietPlans:DietPlanDetails[]
    updateMemberDietPlan:(data:DietPlanDetails[])=>void
    showMemberEditDiet?:(data:DietPlanDetails[])=>void
}
const DietPlanSection=({dietPlans,updateMemberDietPlan,showMemberEditDiet}:DietPlanSectionProps)=> {
    const { dietPlanList } = useAppSelector((state) => state.commonData);
    const [showDietPlanModal,setShowDietPlanModal] = useState<boolean>(false)

    const dietList = (plan: DietPlanListDetails, index: number) => {
        return (
            <DietPlanList plan={plan} index={index} onClick={() => {
                updateMemberDietPlan(plan.dietPlanList)
                console.log('dietPlanList ==>', plan.dietPlanList)
            }} isMemberPage />
        )
    }

  return (
    <View style={{position:'relative'}}>


                {
                    dietPlans?.length > 0 ?
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:22}}>
                            <View>
                            {
                                dietPlans.map((diet) => {
                                    return (
                                        <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                                            <Text12PXSemiBold style={{ color: colors.themeColor, marginBottom: 5 }}>{`${diet.period} - ${diet.time}`}</Text12PXSemiBold>
                                            <Text12PXSemiBold style={{ color: colors.themeColor }}>{diet.description}</Text12PXSemiBold>
                                        </View>
                                    )
                                })
                            }
                            </View>
                            <EditIcon onPress={()=>showMemberEditDiet && showMemberEditDiet(dietPlans)} name={'pen'} size={12} color={colors.themeColor}/>
                        </View>


                        :
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', paddingBottom: 5 }}>
                                <Text12PXSemiBold style={{ color: colors.disableTextColor, marginRight: 5 }}>{'This Member doesnt have any diet plan, please choose any one '}</Text12PXSemiBold>
                                {/* <TouchableOpacity style={{ flex: 0.1 }} onPress={() => { }}>
                                    <AddIcons name='pluscircle' color={colors.green} size={18} />
                                </TouchableOpacity> */}
                            </View>
                            {
                                dietPlanList.map((plan, index) => dietList(plan, index))
                            }
                        </>

                }
            </View>
  )
}


export default DietPlanSection