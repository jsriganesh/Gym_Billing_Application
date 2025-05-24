import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { Text12PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
// import { PrimaryButton } from '../../components/buttons'

const LoginPage = () => {
  return (
    <View style={styles.constainer}>
      
      <Text>{"tests"}</Text>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
    constainer:{
        flex: 1
    },
    logoContainer:{
        height:220,
        width:220,

        paddingTop:80,
        paddingLeft:40,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:colors.themeColor,
        borderBottomRightRadius:180,
    },
    logoStyle:{height:80,width:80,marginVertical:16,alignSelf:"center"}
})