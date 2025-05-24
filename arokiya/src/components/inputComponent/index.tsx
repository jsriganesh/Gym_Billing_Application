import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useState } from 'react'
import { colors } from '../../utils/colors'
import { Text12PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
import MembersListCard from "../../components/memberListCard";
import PageHeader from "../../components/pageHeader";
// import { PrimaryButton } from '../../components/buttons'
import { TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Controller, Control } from 'react-hook-form';
import { ErrorMessage } from "../commonComponents";


interface CommonInputProps{
    label?:string,onChange?:(text:string)=> void
    onFocus?:()=>void

    name: string;
    control: Control<any>; // Adjust the type to match your form data
    rules?: object;
    secureTextEntry?: boolean;
}

const CommonInput = ({label,onChange,onFocus, name, control, rules = {}}:CommonInputProps) => {
    const theme = {
        ...useTheme(),
        colors: {
            ...useTheme().colors,
            primary: colors.themeColor, // Change this to your desired color

        },
    };

    return (

        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
            style={[{fontSize:12,height:40}]}
            outlineStyle={[{ borderColor: colors.themeColor },error && {borderColor:colors.red,borderWidth:1}]}
            mode="outlined"
            label={label}
              onBlur={onBlur}
              onFocus={()=>onFocus && onFocus()}
              onChangeText={onChange}
              value={value}
              theme={theme}
            />
            {error && <ErrorMessage message={error.message || 'This field is required'}/> }
          </>
        )}
      />


                    // <TextInput  <Text12PXSemiBold style={styles.errorText}>{error.message || 'This field is required'}</Text12PXSemiBold>
                        
                    //     onFocus={()=>onFocus && onFocus()}
                    //     style={{fontSize:12,height:40}}
                    //     outlineStyle={{ borderColor: colors.themeColor }}
                    //     mode="outlined"
                    //     label={label}
                    //     value={value}
                    //     onChangeText={text => onChange(text)}
                    //     theme={theme}
                    // />

    )
}

export default CommonInput

export const styles = StyleSheet.create({

})