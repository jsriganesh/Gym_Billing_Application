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
    TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/colors';
import { Text12PXBold, Text16PXSemiBold } from '../styledComponents/labels';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { TimingRange } from '../../utils/constant';
import Icons from 'react-native-vector-icons/AntDesign'
import Delete from 'react-native-vector-icons/MaterialCommunityIcons'
import { EmptySpace } from '../commonComponents';

import { Dialog, Portal } from 'react-native-paper';
import CommonButton from '../buttons';
import { postRequest, putRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';
import { DietPlanDetails, DietPlanListDetails } from '../../interface/common';
import { updateDietPlanList } from '../../redux/slices/commonSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';


export const triggerStyles = {
    triggerTouchable: {
        underlayColor: colors.white,
        borderRadius: 10,
        activeOpacity: 0.5,
    },
};

export const optionsStyles = {
    optionsContainer: {
        borderRadius: 6,
        paddingVertical: 5,
        marginTop: 30,
        width: Dimensions.get('screen').width,
        //   width: '90%',

        //   alignItems: 'center' as 'center',
    },
    optionWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    optionTouchable: {
        underlayColor: colors.white,
        activeOpacity: 0.5,
    },
};

interface DietPlanListProps {
    period: string,
    time: string,
    description: string
}

const defaultList = [{
    period: '',
    time: '',
    description: ''
}]

interface DietPlanModalProps {
    selectedDietDetails?: DietPlanListDetails
    closeModal: () => void
    modalType:'view'|'edit'|'create',
    selectedPlanIndex?:number
    memberEdit?:boolean
    updateMemberDietPlan?:(details:DietPlanListProps[]) => void
}
const DietPlanModal = ({ selectedDietDetails, closeModal,modalType,selectedPlanIndex ,memberEdit,updateMemberDietPlan}: DietPlanModalProps) => {

    const { dietPlanList } = useAppSelector((state) => state.commonData);

    const [dietPlanDetaileList, setDietPlanList] = useState<DietPlanListProps[]>([])
    const [dietPlanTitle, setDietPlanTitle] = useState<string>(selectedDietDetails?.dietPlanTitle || '')
    // const [createAndEditNew, setDIetPlanID] = useState<string>('')

    // const [visible, setVisible] = React.useState(true);

    // const hideDialog = () => setVisible(false);
    const dispatch = useAppDispatch();


    const createAndEditNew = modalType ==='view' ? false : true


    const updateDietToMembers=()=>{
        updateMemberDietPlan && updateMemberDietPlan(dietPlanDetaileList)
    }

    const onSubmit = async () => {
        if (selectedDietDetails?._id ) {
            const updateData = {...selectedDietDetails}
            updateData['dietPlanList'] = dietPlanDetaileList
            updateData['dietPlanTitle'] = dietPlanTitle

                putRequest(
                    EndPoint.dietPlan + selectedDietDetails._id,
                    updateData,
                    success => {

                        if (selectedPlanIndex !== null && selectedPlanIndex !== undefined && selectedPlanIndex >= 0) {
                            const list = [...dietPlanList]

                            list.splice(selectedPlanIndex, 1)
                            list.unshift(success)

                            dispatch(updateDietPlanList(list))
                            closeModal()

                        }
                    },
                    error => {
                        console.log('error -->', error);
                    },
                );
        } else {
            postRequest(
                EndPoint.dietPlan,
                {
                    dietPlanTitle: dietPlanTitle,
                    dietPlanList: dietPlanDetaileList.map(plan => { return { ...plan, description: plan.description.trim() } })
                },
                success => {
                    const list = [...dietPlanList]
                    list.unshift(success)
                    dispatch(updateDietPlanList(list))
                    closeModal()
                },
                error => {
                    console.log('error -->', error);
                },
            );
        }
    }


    useEffect(() => {
        if(selectedDietDetails?.dietPlanList){
            setDietPlanList(selectedDietDetails?.dietPlanList)

        }else{
            setDietPlanList(defaultList)
        }
    }, [selectedDietDetails])


    const addNewRow = () => {
        const details = [...dietPlanDetaileList, defaultList[0]]
        setDietPlanList([...details])
    }

    const removeRow = (index: number) => {
        const details = [...dietPlanDetaileList]
        details.splice(index, 1)
        setDietPlanList([...details])
    }


    const onChangeDietPlanDetails = (index: number, key: 'period' | 'time' | 'description', value: string) => {
        let details = [...dietPlanDetaileList];
        let updatedDetail = { ...details[index] };
        updatedDetail[key] = value
        if (key === 'period') updatedDetail['time'] = '';
        details[index] = updatedDetail;
        setDietPlanList(details);
    }

    const planDetailsRow = (plan: DietPlanListProps, index: number) => {
        console.log(plan, index)
        return (
            <View key={index}>
                <View style={{ flexDirection: 'row', columnGap: 5, marginVertical: 8 }} >
                    <View style={{ flex: 0.25 }}>
                        <View style={{ borderRadius: 5, padding: 5, }}>
                            <Menu>
                                <MenuTrigger customStyles={triggerStyles} disabled={!createAndEditNew}>
                                    <Text12PXBold numberOfLines={1}>{plan.period || 'Period'}</Text12PXBold>
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                        {TimingRange.map((data, i) => {
                                            return (
                                                <MenuOption
                                                    key={i}
                                                    onSelect={() => { onChangeDietPlanDetails(index, 'period', data.period) }}>
                                                    <Text12PXBold>{data.period}</Text12PXBold>
                                                </MenuOption>
                                            );
                                        })}
                                    </View>
                                </MenuOptions>
                            </Menu>
                        </View>


                        <View style={{ borderRadius: 5, padding: 5, }}>
                            <Menu>
                                <MenuTrigger customStyles={triggerStyles} disabled={!createAndEditNew}>
                                    <Text12PXBold>{plan.time || 'Time'}</Text12PXBold>
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                        {TimingRange.find(timing => timing.period === plan.period)?.timing.map((data, i) => {
                                            return (
                                                <MenuOption
                                                    key={i}
                                                    onSelect={() => onChangeDietPlanDetails(index, 'time', data)}>
                                                    <Text12PXBold>{data}</Text12PXBold>
                                                </MenuOption>
                                            );
                                        })}
                                    </View>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>

                    <TextInput multiline style={styles.planDescriptionStyle}
                        value={plan.description}
                        editable={createAndEditNew}
                        onChangeText={(text) => onChangeDietPlanDetails(index, 'description', text)}
                    />

                    {
                    
                    createAndEditNew && <>
                        {
                        dietPlanDetaileList.length - 1 === index ?
                            <TouchableOpacity style={{ flex: 0.1 }} onPress={() => addNewRow()}>
                                <Icons name='pluscircle' color={colors.green} size={18} style={{ marginTop: 5 }} />
                            </TouchableOpacity>

                            :
                            <TouchableOpacity style={{ flex: 0.1 }} onPress={() => removeRow(index)}>
                                <Delete name='delete' color={colors.red} size={18} style={{ marginTop: 5 }} />
                            </TouchableOpacity>
                    }
                            </>
                    }
                </View>
                <EmptySpace height={1} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                width: '90%',
                height: '80%',
                opacity: 1,
                borderRadius: 10,
                padding: 10,
                backgroundColor: colors.white
            }}>

                <Icons name='closecircle' size={20} color={colors.darkGrey} style={{ position: 'absolute', right: 0 ,zIndex:1}} onPress={() => closeModal()} />

                {
                    !memberEdit && createAndEditNew ?
                        <TextInput value={dietPlanTitle} onChangeText={setDietPlanTitle} style={{ borderBottomWidth: 0.5, textAlignVertical: 'top', paddingBottom: 0, marginBottom: 10 }} placeholder='Enter the diet plan title' />
                        : <Text16PXSemiBold style={{ color: colors.black, fontWeight: 'bold', textAlign: "center" }}>{dietPlanTitle || ''}</Text16PXSemiBold>
                }

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            dietPlanDetaileList.map((plan, index) => planDetailsRow(plan, index))
                        }

                        <View>
                            {createAndEditNew && <CommonButton label={modalType === 'edit'?'Update' : 'Submit'} onClick={() =>memberEdit ? updateDietToMembers(): onSubmit()} />}
                        </View>
                    </ScrollView>

                </View>
            </View>

        </View>
    );
};

export default DietPlanModal;

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    planDescriptionStyle: {
        borderRadius: 5, padding: 5, flex: 0.65, borderWidth: 0.5, height: 60, fontSize: 12,
        paddingTop: 10,
        paddingBottom: 10,
        textAlignVertical: 'top',
    }

});
