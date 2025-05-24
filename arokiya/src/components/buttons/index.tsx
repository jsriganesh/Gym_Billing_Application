import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Text14PXBold } from '../styledComponents/labels'
import { colors } from '../../utils/colors'

interface CommonButtonProps{
    label:string,
    onClick?:()=> void
}
const CommonButton = ({label,onClick}:CommonButtonProps) => {
  return (
    <TouchableOpacity style={styles.commonButtonContainer} onPress={()=> onClick && onClick()}>
        <Text14PXBold style={{color:colors.white}}>{label}</Text14PXBold>
    </TouchableOpacity>
  )
}

export default CommonButton

const styles = StyleSheet.create({
    commonButtonContainer:{
        justifyContent:"center",
        alignItems:'center',
        alignSelf:'center',
        paddingVertical:5,
        paddingHorizontal:20,
        backgroundColor:colors.green,
        borderRadius:5,
        marginVertical:5
    }
})