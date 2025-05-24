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

type FormData = {
    payAmount:number
};


interface Props extends GeneralProps {
    route: Route<string, (object & { memberDetails: MemberDetails }) | undefined>;
}
const RenewPlanDetailsScreen: React.FC<Props> = ({
    navigation, route
}) => {
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>();
    const { planList,membersList } = useAppSelector((state) => state.commonData);
    const planListDetails = preparPackageListForDropDown(planList)

    const memberDetails = route.params?.memberDetails

    console.log('memberDetails,--->',memberDetails)
    const [text, setText] = React.useState("");
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [paymentDate, setPaymentDate] = useState<Date>(new Date());
    const [planDetails, updatePlanDetails] = useState<DropDownProps>(preparPackageListForDropDown(planList)[0]);
    const [paymentMethod, setPaymentMethod] = useState<DropDownProps>(PaymentMode[0]);

    const [totalPayAmount,setTotalPayAmount]= useState<number>(0)
    const [currentBalance,setCurrentBalance]= useState<number>(0)

    const oldDueAmount = memberDetails?.planDetails.dueAmount ? memberDetails?.planDetails.dueAmount :0


    

    useEffect(()=>{
        if(planDetails?.planDetails?.planValue){
            if(oldDueAmount){
                setTotalPayAmount(planDetails.planDetails?.planValue+oldDueAmount)
            }else{
                setTotalPayAmount(planDetails.planDetails?.planValue)
            }
        }else if(oldDueAmount){
            setTotalPayAmount(oldDueAmount)
        }else{
            setTotalPayAmount(0)  
        }
    },[oldDueAmount,planDetails])


    const payAmount = useWatch({
        control,
        name: 'payAmount', // Field to watch
    });

    useEffect(()=>{
        console.log('payAmount =============')
        setCurrentBalance(totalPayAmount-(payAmount ?payAmount :0))
    },[totalPayAmount,payAmount])

    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color

        },
    };

    const emptySpace = () => <View style={{ height: 5, backgroundColor: colors.lightGrey }} />


    const basicDetails = () => {
        return (
            <>
                {memberDetails && <MembersBasicDetailsCard memberDetails={memberDetails} hideSupportIcon />}
                {emptySpace()}
            </>
        )
    }
    

    const onSubmit: SubmitHandler<FormData> = data => {

        if (planDetails) {
            const preparData = {
                "memberID":memberDetails?.memberID,
                "memberName":memberDetails?.memberName,
                "paidDate":paymentDate,
                "paidAmount":data.payAmount,
                "planID":planDetails.planDetails?.planID,
                "dueAmount":currentBalance,
                "paidMethod":paymentMethod.key,
                "nextPaymentDate":memberDetails?.nextPaymentDate
            }
           


            postRequest(EndPoint.renewplan,preparData,successCallback=>{
                const list = [...membersList]

                const editMemberIndex= list.findIndex(member=> member.memberID === memberDetails?.memberID)
                list.splice(editMemberIndex,1,successCallback)
                // list.unshift(successCallback)
                dispatch(updateMemberList(list))
                Alert.alert('Payment updated')
                navigation.goBack()
            },errorCallback=>{})

            console.log(preparData)
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <PageHeader label={'Renew Plan'} showSubmitIcon onClickSubmitIcon={handleSubmit(onSubmit)}/>
            <ScrollView>
                <View style={styles.contants}>
                    {basicDetails()}

                    <View style={styles.body}>
                    

                    <View style={styles.componentSpacing}>
                                <Text12PXBold style={{ color: colors.themeColor }}>{'Payment Date'}</Text12PXBold>
                                <TouchableOpacity style={styles.batepickertContainer} onPress={() => {
                                    setShowDatePicker(true)
                                }}>
                                    <Text12PXBold>{paymentDate ? moment(paymentDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'}</Text12PXBold>
                                </TouchableOpacity>
                            </View>
                       
                        <View style={styles.componentSpacing}>
                            <SigleSelectDropDown
                                label="Choose a plan"
                                selectedData={(selected) => {
                                    updatePlanDetails(selected)
                                }}
                                value={planDetails}
                                options={planListDetails}
                            />
                        </View>
                        
                        <CommonInput
                        name="payAmount"
                        control={control}
                        label="Current Payment amount"
                        rules={validations.required}
                    />
                     <View style={styles.infofiled}>
                        <Text12PXBold style={{ color:  oldDueAmount > 0 ? colors.red:colors.themeColor}}>{`Old Due Amount: ${oldDueAmount}`}</Text12PXBold>
                    </View>
                     <View style={styles.infofiled}>
                        <Text12PXBold style={{ color: colors.themeColor,marginBottom:5 }}>{`Total Payable Amount: ${totalPayAmount}`}</Text12PXBold>
                        <Text12PXBold style={{ color: colors.themeColor }}>{`Current Balance Amount: ${currentBalance}`}</Text12PXBold>
                    </View>

                    <View style={styles.componentSpacing}>
                                <SigleSelectDropDown
                                    label="Payment mode"
                                    selectedData={(selected) => setPaymentMethod(selected)}
                                    value={paymentMethod}
                                    options={PaymentMode}
                                />
                            </View>
                    </View>

                    {showDatePicker && (
                        <DateTimePickerComponent
                            mode="date"
                            updateDate={(date) => {
                                setShowDatePicker(false);
                                setPaymentDate(date)
                            }}
                            date={paymentDate}
                        />
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default RenewPlanDetailsScreen

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
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10

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
    optionsView: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    body: {
        paddingHorizontal: 16
    },
    
    
    batepickertContainer: {
        justifyContent: 'center', paddingLeft: 16, height: 40, borderRadius: 5, borderWidth: 1, borderColor: colors.themeColor
    },
    componentSpacing: {
        marginTop: 5
    },
    infofiled: {
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: 'orange',
        paddingHorizontal: 10,
        // height: 60,
        paddingVertical:8,
        justifyContent: 'space-evenly'
    }

})