import { StyleSheet, View } from "react-native"
import { Text12PXSemiBold } from "../styledComponents/labels"
import { colors } from "../../utils/colors"



interface ErrorMessageProps {message?:string}
export const ErrorMessage=({message}:ErrorMessageProps)=>{
  return <Text12PXSemiBold style={styles.errorText}>{message || 'This field is required'}</Text12PXSemiBold>
}

interface EmptySpace {height?:number | null}
export const EmptySpace = ({height}:EmptySpace) => <View style={{ height:height|| 5, backgroundColor: colors.lightGrey }} />


const styles = StyleSheet.create({
    errorText:{
            color: 'red',
            marginTop: 5,
    }
})