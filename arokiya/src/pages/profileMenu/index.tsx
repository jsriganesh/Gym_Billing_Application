import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { colors, memberListCardColors } from '../../utils/colors'
import { Text12PXBold, Text12PXSemiBold, Text14PXBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
import MembersListCard from "../../components/memberListCard";
import PageHeader from "../../components/pageHeader";
// import { PrimaryButton } from '../../components/buttons'
import { TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import CommonInput from "../../components/inputComponent";
import DateTimePickerComponent from "../../components/dateAndTimePicker";
import { convertLocalDate, convertLocalTime, preparPackageListForDropDown } from "../../commonMethods";
import RadioButtonGroup from "../../components/radioButtonGroup";
import { DiscountList, Gender, PaymentMode } from "../../utils/constant";
import SigleSelectDropDown from "../../components/singleSelectDropDown";
import { IconWithTitle } from "../../components/supportIcons";
import Icons from 'react-native-vector-icons/Ionicons';
import MembersBasicDetailsCard from "../../components/memberBasicDetailsCard";
import { DropDownProps, GeneralProps, MemberDetails } from "../../interface/common";
import { Route } from "@react-navigation/native";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { validations } from "../../utils/validation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import moment from "moment";
import { postRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { updateMemberList } from "../../redux/slices/commonSlice";
import { EmptySpace } from "../../components/commonComponents";
import { ScreenName } from "../../utils/screenNames";


interface Props extends GeneralProps {
    route: Route<string, (object & { memberDetails: MemberDetails }) | undefined>;
}
const ProfileMenuScreen: React.FC<Props> = ({
    navigation, route
}) => {

    const options = (label: string,callback?:()=>void) => {
        return (
            <>
            <TouchableOpacity style={styles.optionsView} onPress={()=>callback && callback()}>
                <Text14PXBold style={{color:colors.themeColor}}>{label}</Text14PXBold>
                <Icons name="chevron-forward-outline" color={colors.lightGrey} size={20}/>
            </TouchableOpacity>
            {/* {<EmptySpace/>} */}
            </>
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <View style={{ paddingVertical: 16 }}>
                <View style={styles.trainerDetails}>
                    <Image style={{ height: 80, width: 80, borderRadius: 100 }} source={require('../../assets/images/sample-trainer-image.jpeg')} />
                    <Text14PXBold style={{ color: colors.black }}>{"Sriganesh"}</Text14PXBold>
                </View>
                <ScrollView>
                    <View style={styles.contants}>
                        {options('Diet Plan',()=>navigation.navigate(ScreenName.dietPlan))}
                        {options('Trainers List')}
                        {options('Plan List',()=>navigation.navigate(ScreenName.addPackages))}
                        {<EmptySpace/>}
                        {options('Members List',()=>navigation.navigate(ScreenName.membersListPage))}
                        {options('Payment Details',()=>navigation.navigate(ScreenName.paymentDetails))}
                        {options('Overall Report',()=>navigation.navigate(ScreenName.overAllReport))}
                        {options('Revenue Report')}

                        {<EmptySpace/>}

                        {options('*****')}
                        {options('*****')}
                        {options('*****')}
                        {options('*****')}

                        {<EmptySpace/>}

                    </View>
                </ScrollView>
            </View>
        </View>

    )
}

export default ProfileMenuScreen

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contants: {
        backgroundColor: colors.white,
        flex: 1,
        marginVertical: 0,
        paddingHorizontal: 10,
        paddingVertical: 16
    },
    trainerDetails: {
        alignSelf: "center",
        alignItems: "center"
    },
    optionsView:{
        paddingVertical:8,
        paddingHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
    }


})