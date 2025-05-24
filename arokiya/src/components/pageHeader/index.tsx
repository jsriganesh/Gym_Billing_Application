import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import { Text10PXSemiBold, Text14PXBold, Text18PXBold } from "../styledComponents/labels";
import { labels } from "../../utils/labels";
import Icons from 'react-native-vector-icons/Ionicons'
import EditIcon from 'react-native-vector-icons/FontAwesome5'
import SubmitIcon from 'react-native-vector-icons/Feather'


import { useNavigation } from "@react-navigation/native";
interface PageHeaderProps {
  label?: string
  showEditIcon?:boolean
  showSubmitIcon?:boolean
  showAddIcon?:boolean
  onClickEditIcon?:()=>void 
  onClickSubmitIcon?:()=>void 
  onClickAddIcon?:()=>void 
  
}
const PageHeader = ({ label,showEditIcon,showSubmitIcon,showAddIcon,onClickEditIcon,onClickSubmitIcon,onClickAddIcon }: PageHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <Icons onPress={()=>navigation.goBack()} name={'arrow-back'} size={25} color={colors.yellow} />
      </View>
      <View style={{ flex: 0.7, alignItems: 'center' }}>
        <Text18PXBold style={{color:colors.yellow}}>{label ? label : ""}</Text18PXBold>
      </View>
      <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
       {showEditIcon && <EditIcon onPress={()=>onClickEditIcon && onClickEditIcon()} name={'pen'} size={20} color={colors.yellow}/>}
       {showSubmitIcon && <SubmitIcon onPress={()=>onClickSubmitIcon && onClickSubmitIcon()} name={'check'} size={25} color={colors.yellow}/>}
       {showAddIcon && <Icons onPress={()=>onClickAddIcon && onClickAddIcon()} name={'add-outline'} size={25} color={colors.yellow}/>}
      </View>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.green,
    width: "100%",
    paddingHorizontal: 10
  },
});
