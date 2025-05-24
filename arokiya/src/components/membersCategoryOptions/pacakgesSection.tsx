import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { DietPlanDetails, DietPlanListDetails, PlanDetails } from '../../interface/common'
import { Text12PXSemiBold } from '../styledComponents/labels'
import { colors } from '../../utils/colors'
import AddIcons from 'react-native-vector-icons/AntDesign'
import { useAppSelector } from '../../redux/store'
import { DietPlanList } from '../dietPlanComponents'


interface PackagesSectionProps {
    packageDetails?: PlanDetails
}
const PackagesSection = ({ packageDetails }: PackagesSectionProps) => {
    const planDetails =(label:string,value:string|number)=>{
        return(
            <View style={{flexDirection:'row'}}>
                <Text12PXSemiBold style={{ color: colors.themeColor ,flex:0.3}}>{label}</Text12PXSemiBold>
                <Text12PXSemiBold style={{ color: colors.themeColor ,flex:0.6}}>{': '+value}</Text12PXSemiBold>
            </View>
        )
    }
    return (
        <View>
            {
                !packageDetails ?
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', paddingBottom: 5 }}>
                        <Text12PXSemiBold style={{ color: colors.disableTextColor, marginRight: 5 }}>{'This Member doesnt have any Package'}</Text12PXSemiBold>
                    </View>
                    : 
                    <View style={{ paddingBottom: 5,paddingHorizontal:15 }}>
                        <Text12PXSemiBold style={{ color: colors.disableTextColor, marginRight: 5 }}>{'Last Package details is '}</Text12PXSemiBold>
                        {planDetails('Package Title',packageDetails.planName)}
                        {planDetails('Duration',packageDetails.duration+' days')}
                        {planDetails('Package Value',packageDetails.planValue)}
                    </View>
            }
        </View>
    )
}


export default PackagesSection