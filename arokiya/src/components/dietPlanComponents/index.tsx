import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DietPlanListDetails} from '../../interface/common';
import {Text14PXBold} from '../styledComponents/labels';
import {colors} from '../../utils/colors';
import NextIcon from 'react-native-vector-icons/Ionicons';
import {EmptySpace} from '../commonComponents';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


interface DietPlanListProps {
  plan: DietPlanListDetails;
  index: number;
  onClick: () => void;
  isMemberPage?: boolean;
}

export const DietPlanList = ({
  plan,
  index,
  onClick,
  isMemberPage,
}: DietPlanListProps) => {
  return (
    <View key={index}>
      <TouchableOpacity style={styles.optionsView} onPress={() => onClick()}>
        <Text14PXBold style={{color: colors.themeColor}} numberOfLines={1}>
          {plan.dietPlanTitle}
        </Text14PXBold>
        {isMemberPage ? (
          <Icons name="checkbox-blank-outline" color={colors.lightGrey} size={20} />
        ) : (
          <NextIcon
            name="chevron-forward-outline"
                color={colors.lightGrey}
            size={20}
          />
        )}
      </TouchableOpacity>
      {<EmptySpace height={1} />}
    </View>
  );
};

export const styles = StyleSheet.create({
  optionsView: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
