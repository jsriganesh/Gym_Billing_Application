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
import { ErrorMessage } from '../../components/commonComponents';
import { DropDownProps, PackageListDetailsDetailsProps } from '../../interface/common';
import { getRequest, postRequest, putRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RupeeIcon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updatePlanList } from '../../redux/slices/commonSlice';

type FormData = {
    planName: string;
    totalAmount: string;
    durations: DropDownProps;
};

const AddPackages = () => {
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

    const { planList } = useAppSelector((state) => state.commonData);
    const [selectedPackage, setSelectedPackage] = useState<PackageListDetailsDetailsProps | null>()
    const [selectedPackIndex, setSelectedPackIndex] = useState<number | null>()

    const [durations, updateDuration] = useState<DropDownProps>(PackageDuration[0])


    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color
        },
    };

    const resetAllDetails = () => {
        setSelectedPackage(null)
        setSelectedPackIndex(null)
        reset({
            planName: '',
            totalAmount: '',
            // durations: PackageDuration[0]
        })
    }

    const onSubmit: SubmitHandler<FormData> = async data => {
        let preparPayload = {
            planName: data.planName,
            planValue: data.totalAmount,
            planDuration: durations ? durations.key : '',
        };


        if (selectedPackage?._id) {
            // preparPayload={...preparPayload,...{'_id':selectedPackage._id,i}}
            const updateData = { ...selectedPackage, }
            updateData['planName'] = data.planName
            updateData['planValue'] = parseInt(data.totalAmount)
            updateData['planDuration'] = durations ? parseInt(durations.key) : 0,

                putRequest(
                    EndPoint.plan + selectedPackage._id,
                    updateData,
                    success => {

                        if (selectedPackIndex !== null && selectedPackIndex !== undefined && selectedPackIndex >= 0) {
                            const list = [...planList]

                            list.splice(selectedPackIndex, 1)
                            list.unshift(success)

                            dispatch(updatePlanList(list))
                            reset()
                            resetAllDetails()
                        }
                    },
                    error => {
                        console.log('error -->', error);
                    },
                );
        } else {
            postRequest(
                EndPoint.plan,
                preparPayload,
                success => {
                    const list = [...planList]
                    list.unshift(success)
                    dispatch(updatePlanList(list))
                    reset()
                    setSelectedPackage(null)
                },
                error => {
                    console.log('error -->', error);
                },
            );
        }
    };

    useEffect(() => {
        getRequest(EndPoint.plan,
            (success) => {
                if (success.length > 0) {
                    dispatch(updatePlanList(success))
                } else {
                    dispatch(updatePlanList([]))
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }, [])


    const renderPacageListCard = (data: PackageListDetailsDetailsProps, index: number) => {
        return (
            <TouchableOpacity style={styles.pacageListCard} key={index}
                onPress={() => {

                    const findPDuration = PackageDuration.find(pack => pack.key === data.planDuration.toString())
                    setSelectedPackage(data)
                    setSelectedPackIndex(index)
                    reset({
                        planName: data.planName,
                        totalAmount: data.planValue.toString(),
                    });

                    if (findPDuration) updateDuration(findPDuration)
                    else updateDuration(PackageDuration[0])


                }}
            >
                <Icons
                    name="delete"
                    size={24}
                    color={colors.themeColor}
                    style={[styles.deleteIcon, selectedPackage?.planID === data.planID ? { color: colors.red, right: 7, top: 1 } : {}]}
                />
                <View
                    style={[styles.packageCardStyle, selectedPackage?.planID === data.planID ? styles.selectedCardStyle : {}]}>
                    <Text12PXBold
                        style={[styles.packageTitleText, selectedPackage?.planID === data.planID ? styles.selectedCardTextStyle : {}]}
                        numberOfLines={1}>
                        {data.planName}
                    </Text12PXBold>

                    <Text18PXBold
                        style={[styles.packageTitleText, selectedPackage?.planID === data.planID ? styles.selectedCardTextStyle : {}]}
                        numberOfLines={2}>
                        <RupeeIcon name="rupee-sign" size={17} /> {data.planValue}
                        {'/-'}
                    </Text18PXBold>
                    <Text12PXBold style={[styles.packageTitleText, selectedPackage?.planID === data.planID ? styles.selectedCardTextStyle : {}]}>{data.planDuration +' days'}</Text12PXBold>

                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.black} />
            <PageHeader
                label={'Add Package'}
                showSubmitIcon
                onClickSubmitIcon={handleSubmit(onSubmit)}
            />

            <View style={styles.contants}>
                <CommonInput
                    name="planName"
                    control={control}
                    label="Package name eg:3 month plan"
                    rules={validations.required}
                />
                <CommonInput
                    name="totalAmount"
                    control={control}
                    label="Total amount"
                    rules={validations.required}
                />

                <View style={styles.componentSpacing}>
                    <SigleSelectDropDown
                        label="Durations"
                        selectedData={updateDuration}
                        value={durations}
                        options={PackageDuration}
                    />
                </View>
                <TextHyperLink12PXBold onPress={() => { resetAllDetails() }}>{'Clear'}</TextHyperLink12PXBold>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {planList.length > 0 ?
                            planList.map((obj, index) => renderPacageListCard(obj, index))
                            : null}

                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default AddPackages;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contants: {
        flex: 1,
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    tabContainer: {
        // width:'100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
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
        marginTop: 6,
    },
    datePickerFontStyle: {
        color: colors.black,
        fontSize: 16,
    },
    componentSpacing: {
        marginTop: 5,
    },

    pacageListCard: {
        marginVertical: 5
    },
    deleteIcon: {
        position: 'absolute', zIndex: 1, right: 3
    },
    packageCardStyle: {
        padding: 10,
        marginTop: 5,
        backgroundColor: 'lightgreen',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'green',
        height: 80,
        width: Dimensions.get('screen').width / 3 - 30,
        marginRight: 10,
        justifyContent:"space-evenly"
    },
    packageTitleText: {
        color: colors.themeColor,
        textShadowColor: '#585858', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 3, // Shadow radius
    },

    selectedCardStyle: { borderColor: colors.themeColor, backgroundColor: colors.themeColor },
    selectedCardTextStyle: { color: colors.yellow }

});
