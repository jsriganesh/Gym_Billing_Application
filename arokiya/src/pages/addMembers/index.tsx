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
import { colors } from '../../utils/colors'
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
import { DiscountEnum, DiscountList, Gender, PaymentMode } from "../../utils/constant";
import SigleSelectDropDown from "../../components/singleSelectDropDown";
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form';
import moment from "moment";
import { ErrorMessage } from "../../components/commonComponents";
import { validations } from "../../utils/validation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DropDownProps } from "../../interface/common";
import { postRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { updateMemberList } from "../../redux/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";

type FormData = {
    name: string;
    mobileNo: number;
    address: string;
    email: string
    doj: Date;
    dob: Date;
    gender: string;
    discountType: string
    paidAmount: number;
    discountValue: number
    paymentMode: string
    // packageType: DropDownProps

};

// const defaultValue = {
//     name: '',
//     mobileNo: 0,
//     address: '',
//     email: '',
//     doj: '',
//     dob: '',
//     gender: '',
//     discountType: '',
//     paidAmount: 0,
//     discountValue: 0,
//     paymentMode: '',
//     // packageType: ''

// }


const AddNewMember = () => {
    const navigation = useNavigation();

    const dispatch = useAppDispatch();
    const { membersList } = useAppSelector((state) => state.commonData);


    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>();
    const { planList } = useAppSelector((state) => state.commonData);
    const planListDetails = preparPackageListForDropDown(planList)

    const [text, setText] = React.useState("");
    const [datePickerKey, setDatePickerKey] = useState<'DOJ' | 'DOB'>('DOJ')
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [dueAmount, updateDueAmount] = useState<number>(0);
    const [totalPayAmount, updateTotalPayAmount] = useState<number>(0);
    const [planDetails, updatePlanDetails] = useState<DropDownProps>(preparPackageListForDropDown(planList)[0]);

    const paidAmount = useWatch({
        control,
        name: 'paidAmount', // Field to watch
    });

    const discountAmount = useWatch({
        control,
        name: 'discountValue', // Field to watch
    });

    const discountType = useWatch({
        control,
        name: 'discountType', // Field to watch
    });


    const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
        if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
            return 0
        }

        // Calculate the discount amount
        const discountAmount = (originalPrice * discountPercentage) / 100;

        // Calculate the final price after applying the discount
        const finalPrice = originalPrice - discountAmount;
        return Math.round(finalPrice)
        // Return both the discount amount and the final price
        // return {
        //   discountAmount: discountAmount.toFixed(2),
        //   finalPrice: finalPrice.toFixed(2)
        // };
    }


    useEffect(() => {
        console.log('useeffect planDetails ===>', planDetails)

        let totalAmount = 0
        let calculateDueAmount = 0
        if (planDetails && planDetails.planDetails?.planValue) {
            const typedValue = discountAmount ? discountAmount : 0
            const planValue = planDetails.planDetails?.planValue
            if (discountType === DiscountEnum.Amount) {
                totalAmount = planValue - typedValue
                console.log('****************===>', planValue, typedValue, totalAmount)

            } else if (discountType === DiscountEnum.Percentage) {
                totalAmount = calculateDiscountedPrice(planValue, typedValue)
            } else {
                totalAmount = planValue
            }

            console.log('****************===>', totalAmount, calculateDueAmount, typedValue, discountType)


            if (paidAmount) {
                calculateDueAmount = totalAmount - paidAmount
            } else {
                calculateDueAmount = totalAmount
            }
            updateTotalPayAmount(totalAmount)
            updateDueAmount(calculateDueAmount)

        } else {
            updateTotalPayAmount(totalAmount)
            updateDueAmount(calculateDueAmount)
        }
        // updateDueAmount(calculateDueAmount)
    }, [paidAmount, planDetails, discountAmount, discountType])


    // console.log('errors ===>', errors)
    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data, '*-*');

        if (planDetails) {
            const preparData = {
                "memberName": data.name,
                "mobileNo": data.mobileNo,
                "emailId": data.email,
                "dateOfJoin": data.doj,
                "dateOfBirth": data.dob,
                "lastpaymentDate": new Date(),
                "address": data.address,
                "profileImage": "",
                "planDetails": {
                    "planID": planDetails.planDetails?.planID,
                    "planName": planDetails.planDetails?.planName,
                    "duration": planDetails.planDetails?.planDuration, // days
                    "planValue": planDetails.planDetails?.planValue,
                    "paidAmount": data.paidAmount,
                    "dueAmount": dueAmount
                },
                "gender": data.gender

            }


            postRequest(EndPoint.membersList,preparData,successCallback=>{
                const list = [...membersList]
                list.unshift(successCallback)
                dispatch(updateMemberList(list))
                Alert.alert('member created ')
                navigation.goBack()
            },errorCallback=>{})

            console.log(preparData)
        }
    };



    useEffect(() => {
        setValue('gender', 'M')
        setValue('discountType', 'N')
        setValue('doj', new Date())

    }, [])


    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color

        },
    };

    const getDate = () => {
        const date = datePickerKey === 'DOJ' ? getValues('doj') : getValues('dob')
        console.log(date)

        if (date) {
            return new Date(moment(date, 'MM/DD/YYYY').toDate())
        } else {
            return new Date()
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <PageHeader label={'Add Member'} showSubmitIcon onClickSubmitIcon={handleSubmit(onSubmit)} />
            <ScrollView>
                <View style={styles.contants}>

                    <CommonInput
                        name="name"
                        control={control}
                        label="Enter your name"
                        rules={validations.name}
                    />
                    <CommonInput
                        name="mobileNo"
                        control={control}
                        label="Mobile No"
                        rules={validations.mobileNo}
                    />
                    <CommonInput
                        name="email"
                        control={control}
                        label="Email ID"
                        rules={validations.email}
                    />
                    <CommonInput
                        name="address"
                        control={control}
                        label="Enter your address"
                        rules={validations.address}
                    />


                    <Controller
                        name="gender"
                        control={control}
                        rules={validations.gender}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.componentSpacing}>
                                <Text12PXBold style={{ color: colors.themeColor }}>{'Select Gender'}</Text12PXBold>
                                <RadioButtonGroup
                                    list={Gender}
                                    labelColor={colors.themeColor}
                                    activeColor={colors.themeColor}
                                    checked={value}
                                    setChecked={(key) => onChange(key)}
                                />
                                {errors.gender && <ErrorMessage message={errors.gender.message} />}
                            </View>
                        )}
                    />

                    <Controller
                        name='dob'
                        control={control}
                        rules={validations.dob}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.componentSpacing}>
                                <Text12PXBold style={{ color: colors.themeColor }}>{'Select date of  birth'}</Text12PXBold>
                                <TouchableOpacity style={styles.batepickertContainer} onPress={() => {
                                    setShowDatePicker(true)
                                    setDatePickerKey('DOB')
                                }}>
                                    <Text12PXBold>{value ? moment(value).format('DD/MM/YYYY') : 'DD/MM/YYYY'}</Text12PXBold>
                                </TouchableOpacity>
                                {errors.dob && <ErrorMessage message={errors.dob.message} />}
                            </View>
                        )}
                    />

                    <Controller
                        name='doj'
                        control={control}
                        rules={validations.gender}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.componentSpacing}>
                                <Text12PXBold style={{ color: colors.themeColor }}>{'Select date of  join'}</Text12PXBold>
                                <TouchableOpacity style={styles.batepickertContainer} onPress={() => {
                                    setShowDatePicker(true)
                                    setDatePickerKey('DOJ')
                                }}>
                                    <Text12PXBold>{value ? moment(value).format('DD/MM/YYYY') : 'DD/MM/YYYY'}</Text12PXBold>
                                </TouchableOpacity>
                                {errors.doj && <ErrorMessage message={errors.doj.message} />}
                            </View>
                        )}
                    />

                    <View style={styles.componentSpacing}>
                        <SigleSelectDropDown
                            label="Choose a plan"
                            selectedData={(selected) => {
                                console.log('selected ========')
                                updatePlanDetails(selected)
                            }}
                            value={planDetails}
                            options={planListDetails}
                        />
                    </View>

                    <Controller
                        name="discountType"
                        control={control}
                        rules={validations.discountType}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.componentSpacing}>
                                <Text12PXBold style={{ color: colors.themeColor }}>{'Discount plan'}</Text12PXBold>
                                <RadioButtonGroup
                                    list={DiscountList}
                                    labelColor={colors.themeColor}
                                    activeColor={colors.themeColor}
                                    checked={value}
                                    setChecked={(key) => onChange(key)}
                                />
                                {errors.discountType && <ErrorMessage message={errors.discountType.message} />}
                            </View>
                        )}
                    />

                    <CommonInput
                        name="discountValue"
                        control={control}
                        label="Discount value"
                        rules={validations.discountValue}

                    />


                    <CommonInput
                        name="paidAmount"
                        control={control}
                        label="paid amount"
                        rules={validations.paidAmount}

                    />

                    <View style={styles.infofiled}>
                        <Text12PXBold style={{ color: colors.themeColor }}>{`Total Payable Amount: ${totalPayAmount}`}</Text12PXBold>
                        <Text12PXBold style={dueAmount > 0 ? { color: colors.red } : { color: colors.themeColor }}>{`Due Amount: ${dueAmount}`}</Text12PXBold>
                    </View>

                    <Controller
                        name="paymentMode"
                        control={control}
                        rules={validations.paymentMode}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.componentSpacing}>
                                <SigleSelectDropDown
                                    label="Payment mode"
                                    selectedData={(selected) => onChange(selected)}
                                    value={value}
                                    options={PaymentMode}
                                />
                                {errors.paymentMode && <ErrorMessage message={errors.paymentMode.message} />}
                            </View>
                        )}
                    />

                    {showDatePicker && datePickerKey && (
                        <DateTimePickerComponent
                            mode="date"
                            updateDate={(date) => {
                                if (datePickerKey === 'DOJ') {
                                    setValue('doj', date)
                                } else {
                                    setValue('dob', date)
                                }
                                setShowDatePicker(false);
                            }}
                            date={getDate()}
                        />
                    )}
                </View>
            </ScrollView>
        </View>

    )
}

export default AddNewMember

export const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    contants: {
        flex: 1,
        paddingHorizontal: 16,
        marginVertical: 16
    },
    tabContainer: {
        // width:'100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    datePickerStyle: {
        borderRadius: 5,
        borderColor: colors.themeColor,
        borderWidth: 1,
        height: 45,
        backgroundColor: colors.white,
        color: colors.black,
        paddingHorizontal: 14,
        justifyContent: 'center',
        marginTop: 6
    },
    datePickerFontStyle: {
        color: colors.black,
        fontSize: 16

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
        height: 60,
        justifyContent: 'space-evenly'
    }
})