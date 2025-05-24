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
import React, { useState } from 'react'
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
import { convertLocalDate, convertLocalTime } from "../../commonMethods";
import RadioButtonGroup from "../../components/radioButtonGroup";
import { DiscountList, Gender } from "../../utils/constant";
import SigleSelectDropDown from "../../components/singleSelectDropDown";
import { IconWithTitle } from "../../components/supportIcons";
import Icons from 'react-native-vector-icons/Ionicons';
import MembersBasicDetailsCard from "../../components/memberBasicDetailsCard";
import { DietPlanDetails, GeneralProps, MemberDetails, RootStackParamList } from "../../interface/common";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {Route, } from '@react-navigation/native';
import { EmptySpace } from "../../components/commonComponents";
import AddIcons from 'react-native-vector-icons/AntDesign'
import MembersUtilsOption from "../../components/membersCategoryOptions";
import DietPlanModal from "../../components/dietPlanModal";
import { putRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateMemberList } from "../../redux/slices/commonSlice";

// type Props = NativeStackScreenProps<RootStackParamList, 'MemberDetails'>;

interface Props extends GeneralProps {
    // userDetails: UserDetailsProps;
    // (object & {educationDetails: EducationDetailsProp}) | undefined
    route: Route< string, (object & {memberDetails: MemberDetails}) | undefined >;
  }
  
const MemberDetailsScreen: React.FC<Props> = ({
    navigation,route
  }) => {

    const [memberDetails,updateMemberDetails]= useState<MemberDetails|undefined>(route.params?.memberDetails)
    // let memberDetails = route.params?.memberDetails

    const { membersList } = useAppSelector((state) => state.commonData);

    console.log('memberDetails **************',memberDetails)
    const [text, setText] = React.useState("");
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [preferredDate, setPreferredDate] = useState<Date>(new Date());

    const [showDietPlanModal,setShowDietPlanModal] = useState<boolean>(false)
    const [planDetails,setPlanDetails] = useState<DietPlanDetails[]>([])
    const dispatch = useAppDispatch();

    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color

        },
    };

    const details = (label: string, value: string, sameLine: boolean = true) => {
        return (
            <View style={{ flexDirection: sameLine ? 'row' : 'column', marginBottom: 10, flex: 0.5 }}>
                <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label} `}</Text12PXBold>
                <Text12PXSemiBold style={{ color: memberListCardColors.valueColoe }}>{value}</Text12PXSemiBold>
            </View>
        )
    }
    const dueAmountView = (label: string, value: string) => {
        return (
            <View style={{ justifyContent:'space-between'}}>
                <Text12PXBold style={{ color: memberListCardColors.titleColor }}>{`${label} `}</Text12PXBold>
                <Text14PXBold style={{ color: memberListCardColors.valueColoe }}>{value}</Text14PXBold>
            </View>
        )
    }

    const supportIconList = [
        { iconName: 'call', label: 'Call' },
        { iconName: 'chatbox', label: 'Message' },
        { iconName: 'gift', label: 'Renew' },
        { iconName: 'ban', label: 'Block' },
    ]




    // const options = (label: string) => {
    //     return (
    //         <>
    //         <TouchableOpacity style={styles.optionsView}>
    //             <Text14PXBold style={{color:colors.pink}}>{label}</Text14PXBold>
    //             <Icons name="chevron-forward-outline" color={colors.lightGrey} size={20}/>
    //         </TouchableOpacity>

    //         <View>
    //             <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',paddingBottom:5}}>
    //                 <Text12PXSemiBold style={{color:colors.disableTextColor,marginRight:5}}>{'This Member doesnt have any diet plan'}</Text12PXSemiBold>
    //                 <TouchableOpacity style={{ flex: 0.1 }} onPress={() =>{}}>
    //                             <AddIcons name='pluscircle' color={colors.green} size={18} />
    //                         </TouchableOpacity>
    //             </View>
    //         </View>
    //         {<EmptySpace/>}
    //         </>
    //     )
    // }


    const basicDetails = () => {
        return (
            <>
            {memberDetails && <MembersBasicDetailsCard memberDetails={memberDetails}/>}
            {<EmptySpace/>}
            </>
        )
    }


    const updateMemberDietPlan = (selectedPlan: DietPlanDetails[]) => {
        if (memberDetails) {

            const updateData = { ...memberDetails, dietPlanDetails: selectedPlan }

            putRequest(
                EndPoint.membersList + memberDetails._id,
                updateData,
                success => {
                    // setDietPlans([...selectedPlan])
                    setShowDietPlanModal(false)
                    setPlanDetails([])
                    Alert.alert('updated success fully')
                    const list = [...membersList]
                    const findIndex = membersList.findIndex(member => success.memberID === member.memberID)
                    if (findIndex >= 0) {
                        list.splice(findIndex, 1, success)
                        // memberDetails = success
                        updateMemberDetails(success)
                        dispatch(updateMemberList(list))
                    }
                },
                error => {
                    console.log('error -->', error);
                },
            );
        }
    }


    const optionsList = [
        {key:'dietPlan',label:'Diet Plan'},
        {key:'workoutPlan',label:'Workout Plan'},
        {key:'measurements',label:'Measurements'},
        {key:'packages',label:'Packages'},
        {key:'service',label:'Service'},
    ]
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <PageHeader label={'Member Details'} showEditIcon onClickEditIcon={()=>{}}/>
            <ScrollView>
                <View style={styles.contants}>
                    {basicDetails()}
                    {optionsList.map((options,index)=><MembersUtilsOption 
                    updateMemberDietPlan={updateMemberDietPlan}
                    showMemberEditDiet={(details:DietPlanDetails[])=>{
                        setShowDietPlanModal(true)
                        setPlanDetails(details)
                    }} memberDetails={memberDetails} options={options}  key={index}/>)}
                    
                   
                </View>
            </ScrollView>

            {showDietPlanModal && <DietPlanModal modalType={'edit'} selectedDietDetails={
                {
                    _id: '',
                    dietplanID: 0,
                    dietPlanList: planDetails,
                    dietPlanTitle:''
                }
                // dietPlans
                } 
                memberEdit
                updateMemberDietPlan={updateMemberDietPlan}
                closeModal={()=>setShowDietPlanModal(false)}/>}
        </View>

    )
}

export default MemberDetailsScreen

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contants: {
        position:'relative',
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
    optionsView:{
        paddingVertical:12,
        paddingHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
    }
})