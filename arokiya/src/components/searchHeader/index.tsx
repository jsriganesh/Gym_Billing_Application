import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {colors, memberListCardColors} from '../../utils/colors';
import {
  Text10PXSemiBold,
  Text12PXBold,
  Text14PXBold,
  Text14PXSemiBold,
  Text18PXBold,
} from '../styledComponents/labels';
import {labels} from '../../utils/labels';
import {Searchbar} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import RadioButtonGroup from '../radioButtonGroup';
// import { TouchableOpacity } fro÷m "react-native-gesture-handler";
import Icons from 'react-native-vector-icons/Ionicons';
import {DateFilterOptions, MemberFilterOption} from '../../utils/constant';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PageFilterDates from './pageFilterDates';
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

interface SearchHeaderProps {
  onClickAdd: () => void;
  hideTopProfileDetails?: boolean;
  hideActiveInactive?: boolean;
  showDateFilter?: boolean;
  filterDateDetails?:(dates:FilterDatesProps)=>void,
  membersCount?:number
  searchQuery?:string,
  setSearchQuery?:(val:string)=>void,
}
const SearchHeader = ({
  onClickAdd,
  hideTopProfileDetails,
  hideActiveInactive,
  showDateFilter,
  filterDateDetails,
  membersCount,
  searchQuery,
  setSearchQuery
}: SearchHeaderProps) => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  const theme = {
    ...useTheme(),
    colors: {
      ...useTheme().colors,
      primary: 'blue', // Change this to your desired color
    },
  };

  return (
    <View style={styles.container}>
      {!hideTopProfileDetails && (
        <View style={styles.topRow}>
          <Text18PXBold style={{color: colors.lightWhite}}>
            {'Members'}
          </Text18PXBold>
          <View style={styles.profileImage}></View>
        </View>
      )}

      <Searchbar
        inputStyle={{minHeight: 40, color: 'black'}}
        style={{height: 40, justifyContent: 'center', marginVertical: 10}}
        mode="bar"
        theme={theme}
        placeholder="Search"
        onChangeText={setSearchQuery}
        onClearIconPress={()=>setSearchQuery && setSearchQuery('')}
        value={searchQuery?searchQuery:''}
      />
      {!hideActiveInactive && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',height:30}}>
          {/* <RadioButtonGroup list={MemberFilterOption} /> */}
          <View style={{ flexDirection: 'row' }}>
                <Text14PXBold style={{ color: memberListCardColors.titleColor }}>{`${'Total Members Count'}: `}</Text14PXBold>
                <Text14PXSemiBold style={{ color: memberListCardColors.valueColoe }}>{membersCount? membersCount:0}</Text14PXSemiBold>
            </View>

          <TouchableOpacity
            onPress={() => onClickAdd()}
            style={{
              flexDirection: 'row',
              // backgroundColor: colors.darkGrey,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              height:'100%',
              paddingHorizontal: 10,
            }}>
            {/* <Icons name="add-circle" size={20} color={colors.white} />
            <Text14PXBold style={{color: colors.white, marginLeft: 10}}>
              {'Add'}
            </Text14PXBold> */}
            <Image style={{height:25,width:40}} tintColor={colors.darkGrey} source={require('../../assets/images/addMember.png')}/>
          </TouchableOpacity>
        </View>
      )}
      {showDateFilter &&  filterDateDetails && <PageFilterDates filterDateDetails={filterDateDetails}/> }
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("screen").height / 5,
    backgroundColor: colors.black,
    width: '100%',
    padding: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: colors.lightWhite,
  },
});
