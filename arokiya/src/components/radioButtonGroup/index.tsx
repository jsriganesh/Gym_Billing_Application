import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useEffect } from 'react'
import { colors } from '../../utils/colors'
import { Text12PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import DashboardHeader from "../../components/searchHeader";
// import { PrimaryButton } from '../../components/buttons'
import { RadioButton } from 'react-native-paper';
import { RadioButtonProps } from "../../interface/common";


interface RadioButtonGroupProps{
    list:RadioButtonProps[]
    labelColor?:string
    activeColor?:string
    checked:string
    setChecked:(valuse:string)=>void
}

const RadioButtonGroup = ({list,labelColor,activeColor,checked,setChecked}:RadioButtonGroupProps) => {
    
    
    const [selected, setSelected]  = React.useState(checked);

    useEffect(()=>{setChecked && setChecked(selected)},[selected])
    return (
        <View>
            <RadioButton.Group
                onValueChange={value => setSelected(value)}
                value={selected}
            >
                <View style={styles.constainser}>
                    {
                        list&& list.length>0 ?
                        list.map((opt,index)=>{
                            return <View key={index} style={styles.radioButton}>
                            <RadioButton value={opt.value} color={activeColor ? activeColor:colors.white} />
                            <Text12PXSemiBold style={{ color: labelColor ? labelColor:colors.white }}>{opt.label}</Text12PXSemiBold>
                        </View>
                        })
                        :null
                    }
                    
                </View>
            </RadioButton.Group>
        </View>
    )
}

export default RadioButtonGroup

export const styles = StyleSheet.create({
constainser:{
    flexDirection: 'row', alignItems: 'center' 
},
radioButton:{
    flexDirection: 'row', alignItems: 'center',marginRight:16
}
})