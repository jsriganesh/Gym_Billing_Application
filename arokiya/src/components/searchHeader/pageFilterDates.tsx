import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Touchable,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/colors';
import {
    Text10PXSemiBold,
    Text12PXBold,
    Text14PXBold,
    Text18PXBold,
} from '../styledComponents/labels';
import { labels } from '../../utils/labels';
import { Searchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import RadioButtonGroup from '../radioButtonGroup';
// import { TouchableOpacity } fro÷m "react-native-gesture-handler";
import Icons from 'react-native-vector-icons/Ionicons';
import { DateFilterOptions, MemberFilterOption } from '../../utils/constant';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
import DateTimePickerComponent from '../dateAndTimePicker';
import { FilterDatesProps } from '../../interface/common';

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
        width: 120,
        alignItems: 'center' as 'center',
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

interface PageFilterDatesProps {
    onClickAdd?: () => void;
    hideTopProfileDetails?: boolean;
    hideActiveInactive?: boolean;
    showDateFilter?: boolean;
    filterDateDetails:(dates:FilterDatesProps)=> void
}
const PageFilterDates = ({
    filterDateDetails
}: PageFilterDatesProps) => {

    const [fromDate, setFromDate] = useState<Date>(new Date())
    const [toDate, setToDate] = useState<Date>(new Date())
    const [showDatePickerKey, setShowDatePickerKey] = useState<string>('')

    useEffect(()=>{
        filterDateDetails({fromDate,toDate})
    },[fromDate,toDate])

    const  getStartAndEndDate=(option: string):FilterDatesProps =>{
        const today = new Date();
        let fromDate: Date;
        let toDate: Date = new Date(today);
    
        switch (option) {
            case 'today':
                fromDate = new Date(today);
                break;
            case 'yesterday':
                fromDate = new Date(today);
                fromDate.setDate(today.getDate() - 1);
                toDate = new Date(fromDate);
                break;
            case 'last7days':
                fromDate = new Date(today);
                fromDate.setDate(today.getDate() - 7);
                break;
            case 'this month':
                fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'last month':
                fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                toDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'last 2 months':
                fromDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
                toDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'last 3 months':
                fromDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
                toDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'last 6 months':
                fromDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);
                toDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'this year':
                fromDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                throw new Error('Invalid filter option');
        }

        setFromDate(fromDate)
        setToDate(toDate)
        return { fromDate, toDate };
    }
    


    return (

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', }} onPress={()=>setShowDatePickerKey('from')}>

                    <Icons
                        name="calendar"
                        size={25}
                        color={colors.white}
                    />
                    <View style={{ marginLeft: 5 }}>
                        <Text10PXSemiBold style={{ color: colors.darkGrey }}>{'From date'}</Text10PXSemiBold>
                        <Text12PXBold style={{ color: colors.white }}>{moment(fromDate).format('DD-MM-YYYY')}</Text12PXBold>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', marginLeft: 18 }} onPress={()=>setShowDatePickerKey('to')}>

                    <Icons
                        name="calendar"
                        size={25}
                        color={colors.white}
                    />
                    <View style={{ marginLeft: 5 }}>
                        <Text10PXSemiBold style={{ color: colors.darkGrey }}>{'To date'}</Text10PXSemiBold>
                        <Text12PXBold style={{ color: colors.white }}>{moment(toDate).format('DD-MM-YYYY')}</Text12PXBold>
                    </View>
                </TouchableOpacity>

            </View>

            <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                    <View
                        // onPress={()=>{ }}
                        style={styles.filterButtonStyle}>
                        <Text14PXBold style={{ color: colors.white, marginRight: 10 }}>
                            {'Filter'}
                        </Text14PXBold>

                        <Icons
                            name="filter-circle-outline"
                            size={20}
                            color={colors.white}
                        />
                    </View>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                    {DateFilterOptions.map((data, index) => {
                        return (
                            <MenuOption
                                key={index}
                                onSelect={() =>getStartAndEndDate(data.key)}>
                                <Text12PXBold>{data.value}</Text12PXBold>
                            </MenuOption>
                        );
                    })}
                </MenuOptions>
            </Menu>


            {showDatePickerKey && (
                        <DateTimePickerComponent
                            minimumDate={showDatePickerKey === 'from' ? undefined :fromDate}
                            maximumDate={showDatePickerKey === 'from' ? toDate :undefined}
                            mode="date"
                            updateDate={(date) => {
                                if(showDatePickerKey){
                                if (showDatePickerKey === 'from') {
                                    setFromDate(date)
                                } else {
                                    setToDate(date)
                                }
                                setShowDatePickerKey('');
                            }
                            }}
                            date={showDatePickerKey === 'from' ? fromDate:toDate}
                        />
                    )}
        </View>

    );
};

export default PageFilterDates;

const styles = StyleSheet.create({
    filterButtonStyle: {
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: colors.white,
        borderWidth: 0.5,
        paddingVertical: 5,
    }
});
