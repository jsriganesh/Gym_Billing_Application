import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/colors';
import {
    Text12PXBold,
    Text12PXSemiBold,
    Text14PXBold,
    Text16PXBold,
    Text18PXBold,
    Text24PXBold,
    TextHyperLink12PXBold,
} from '../../components/styledComponents/labels';
import Footer from '../../components/footer';
import SearchHeader from '../../components/searchHeader';
import MembersListCard from '../../components/memberListCard';
import PageHeader from '../../components/pageHeader';
// import { PrimaryButton } from '../../components/buttons'
import { TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import CommonInput from '../../components/inputComponent';
import DateTimePickerComponent from '../../components/dateAndTimePicker';
import { convertLocalDate, convertLocalTime } from '../../commonMethods';
import RadioButtonGroup from '../../components/radioButtonGroup';
import { DiscountList, Gender, PackageDuration } from '../../utils/constant';
import SigleSelectDropDown from '../../components/singleSelectDropDown';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { validations } from '../../utils/validation';
import { EmptySpace, ErrorMessage } from '../../components/commonComponents';
import { DietPlanListDetails, DropDownProps, PackageListDetailsDetailsProps } from '../../interface/common';
import { getRequest, postRequest, putRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RupeeIcon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateDietPlanList, updatePlanList } from '../../redux/slices/commonSlice';
import NextIcon from 'react-native-vector-icons/Ionicons';
import DietPlanModal from '../../components/dietPlanModal';
import { DietPlanList } from '../../components/dietPlanComponents';

type FormData = {
    planName: string;
    totalAmount: string;
    durations: DropDownProps;
};

const DietPlan = () => {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            planName: '',
            totalAmount: '',
            // durations: PackageDuration[0]
        }
    });
    const dispatch = useAppDispatch();

    const { dietPlanList } = useAppSelector((state) => state.commonData);
    const [selectedPackage, setSelectedPackage] = useState<PackageListDetailsDetailsProps | null>()
    const [selectedPackIndex, setSelectedPackIndex] = useState<number | null>()

    const [durations, updateDuration] = useState<DropDownProps>(PackageDuration[0])


    const [selectedDietDetails,setSelectedDietDetails] = useState<DietPlanListDetails>()
    const [showDietPlanModal,setShowDietPlanModal] = useState<boolean>(false)
    const [modalType,setModalType] = useState<'view'|'create'|'edit'>('view')
    const [selectedDietPlanIndex,setSelectedDietPlanIndex] = useState<number>()
 
    useEffect(()=>{
        setShowDietPlanModal(selectedDietDetails ? true :false)
    },[selectedDietDetails])

    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color
        },
    };


    useEffect(() => {
        getRequest(EndPoint.dietPlan,
            (success) => {
                if (success.length > 0) {
                    dispatch(updateDietPlanList(success))
                } else {
                    dispatch(updateDietPlanList([]))
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }, [])

    const dietList =(plan:DietPlanListDetails,index:number)=>{
        return(
            <DietPlanList plan={plan} 
            index={index} onClick={()=>{
                setModalType('edit')
                setSelectedDietPlanIndex(index)
                setSelectedDietDetails(plan)
            }}/>
            // <View key={index}>
            //      <TouchableOpacity style={styles.optionsView} onPress={()=>{
                    // setModalType('edit')
                    // setSelectedDietPlanIndex(index)
                    // setSelectedDietDetails(plan)}}>
            //             <Text14PXBold style={{color:colors.themeColor}}  numberOfLines={1}>{plan.dietPlanTitle}</Text14PXBold>
            //             <NextIcon name="chevron-forward-outline" color={colors.lightGrey} size={20}/>
            //         </TouchableOpacity>
            //         {<EmptySpace height={1}/>}
                  
                    
            // </View>
        )
    }

    const closeDietModal=()=>{
        setSelectedDietDetails(undefined)
        setShowDietPlanModal(false)
        setModalType('view')
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <PageHeader
                label={'Diet Plan List'}
                showAddIcon
                onClickAddIcon={()=> {
                    setModalType('create')
                    setShowDietPlanModal(true)
                }
                    }
            />

            <View style={styles.contants}>
                <ScrollView>
                   { dietPlanList.map((plan,index)=>dietList(plan,index)) }
                    
                </ScrollView>
            </View>
            {showDietPlanModal && <DietPlanModal selectedPlanIndex={selectedDietPlanIndex} modalType={modalType} selectedDietDetails={selectedDietDetails} closeModal={()=>closeDietModal()}/>}
        </View>
    );
};

export default DietPlan;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contants: {
        flex: 1,
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    optionsView:{
        paddingVertical:8,
        paddingHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
    }
});
