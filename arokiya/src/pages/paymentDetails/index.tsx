import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { Text10PXBold, Text10PXSemiBold, Text12PXBold, Text12PXSemiBold, Text14PXBold, Text16PXBold, Text16PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
import MembersListCard from "../../components/memberListCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Route, useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../utils/screenNames";
import { getRequest, postRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { updateMemberList, updatePlanList } from "../../redux/slices/commonSlice";
import { FilterDatesProps, GeneralProps, PaymentHistoryDetails } from "../../interface/common";
// import { PrimaryButton } from '../../components/buttons'
import BillIcon from 'react-native-vector-icons/FontAwesome';
import PaymentTypeIconCash from 'react-native-vector-icons/FontAwesome5';
import GPayIcon from 'react-native-vector-icons/FontAwesome6';
import PaymentShortDetailsCard from "../../components/paymentShortDetailsCard";
import moment from "moment";



interface Props extends GeneralProps {
    // userDetails: UserDetailsProps;
    route: Route<string, object | undefined>;
}

const PaymentDetails: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    // const navigation = useNavigation();
    const [paymentList, setPaymentList]=useState<PaymentHistoryDetails[]>([])
    const [totalAmount, setTotalAmount]=useState<number>(0)
    const { membersList } = useAppSelector((state) => state.commonData);
    const [dates,setDates]= useState<FilterDatesProps>({fromDate: new Date(),toDate: new Date()})
    // const getPacageList = () => {
    //     getRequest(EndPoint.plan,
    //         (success) => {
    //             if (success.length > 0) {
    //                 dispatch(updatePlanList(success))
    //             } else {
    //                 dispatch(updatePlanList([]))
    //             }
    //         },
    //         (error) => { console.log('error -->', error) },
    //     )
    // }

    const getPaymentHistoryList = () => {

        const fromDate =  dates.fromDate
        const clonedDate = new Date(fromDate.getTime()); // Clone using getTime()
        clonedDate.setDate(clonedDate.getDate() - 1);
        const datas =  {
            fromDate:moment(clonedDate).format('YYYY-MM-DD')+'T:18:30.00Z',
            toDate:moment(dates.toDate).format('YYYY-MM-DD')+'T:18:29.59Z'
        }

        console.log('datas *******',datas)

        postRequest(EndPoint.paymentHistoryFilter,
            datas,
            (success) => {
                if (success.paymentDetails.length > 0) {
                    setPaymentList(success.paymentDetails)
                    setTotalAmount(success.totalAmount)

                } else {
                    setPaymentList([])
                    setTotalAmount(0)
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }


    useEffect(() => {
        getPaymentHistoryList()

    }, [dates])

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.black} />
                <SearchHeader
                    hideTopProfileDetails
                    hideActiveInactive
                    showDateFilter
                    filterDateDetails={(dates) => { setDates(dates)}}
                    onClickAdd={() => props.navigation.navigate(ScreenName.addNewMember as never)}
                />
                <View style={styles.totalAmountStyle}>
                    <Text14PXBold style={{color:colors.white}}>{'Total amount :  '}</Text14PXBold>
                    <Text16PXSemiBold style={{color:colors.white}}>{totalAmount}</Text16PXSemiBold>

                </View>
                <ScrollView>
                    <View style={styles.contants}>
                        {
                            paymentList.length > 0 ?
                            paymentList.map((details, index) => {
                                    return <PaymentShortDetailsCard key={index} paymentDetails={details}/>
                                })
                                : null
                        }


                    </View>
                </ScrollView>
            </View>


            <Footer />

        </View>
    )
}

export default PaymentDetails

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between'
    },

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
    totalAmountStyle:{
        height:50,
        backgroundColor:colors.black,
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20,
        marginTop:0.5,flexDirection:'row',justifyContent:"center",alignItems:"center"    
    }
})