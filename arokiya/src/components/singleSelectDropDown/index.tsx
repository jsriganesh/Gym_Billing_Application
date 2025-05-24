import { Alert, StyleSheet, Text, View } from 'react-native'
import React ,{useEffect, useState}from 'react'
import { Text10PXBold, Text12PXBold } from '../styledComponents/labels'
import { labels } from '../../utils/labels'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { colors } from '../../utils/colors'
import { DropDownProps } from '../../interface/common'

interface SigleSelectDropDownProps {
    label?:string,
    selectedData:(data:any)=> void
    options?:DropDownProps[]
    value:any
  }

const SigleSelectDropDown= ({label,selectedData,options,value}: SigleSelectDropDownProps) => {
    const [selected, setSelected] = useState<string>('');
    const [dropDownOptions,setDropDownOption]=useState<DropDownProps[]>(options? options:[])

    useEffect(()=>{
      console.log('findSelectedData ==================*********> )))) >',selected,dropDownOptions)

        const findSelectedData = dropDownOptions.find(obj=>obj.value.toString() === selected.toString())
        console.log('findSelectedData ==================*********>',findSelectedData,selected,dropDownOptions)
        selectedData(findSelectedData)
    },[selected])
  return (
    <View style={styles.container}>
     {label && <Text12PXBold style={{marginTop:5,color:colors.themeColor}}>{label}</Text12PXBold>}
    <SelectList
        // defaultOption={value}
        setSelected={(val:string) => setSelected(val)} 
        data={dropDownOptions} 
        save="value"
        inputStyles={
          {
            fontSize:12
          }
        }
        boxStyles={{
          height:40,
        
          borderRadius:5,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.themeColor
          }}
    />
    </View>
  )
}

export default SigleSelectDropDown

const styles = StyleSheet.create({
    container:{}
})