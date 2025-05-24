import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenName } from '../utils/screenNames';

import LoginPage from '../pages/login';
import MembersList from '../pages/members';
import AddNewMember from '../pages/addMembers';
import AddPackages from '../pages/addPackages';
import MemberDetailsScreen from '../pages/memberDetails';
import RenewPlanDetailsScreen from '../pages/renewPlanDetails';
import ProfileMenuScreen from '../pages/profileMenu';
import PaymentDetails from '../pages/paymentDetails';
import DietPlan from '../pages/dietPlan';
import OverAllReport from '../pages/overAllReport';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false,animation:'fade'}} >
            <Stack.Screen name={ScreenName.profileMenuScreen} component={ProfileMenuScreen} />
            <Stack.Screen name={ScreenName.membersListPage} component={MembersList} />
            <Stack.Screen name={ScreenName.paymentDetails} component={PaymentDetails} />
            <Stack.Screen name={ScreenName.addNewMember} component={AddNewMember} />
            <Stack.Screen name={ScreenName.memberDetailsScreen} component={MemberDetailsScreen} />
            <Stack.Screen name={ScreenName.renewPlanDetailsScreen} component={RenewPlanDetailsScreen} />
            <Stack.Screen name={ScreenName.addPackages} component={AddPackages} />
            <Stack.Screen name={ScreenName.dietPlan} component={DietPlan} />
            <Stack.Screen name={ScreenName.overAllReport} component={OverAllReport} />

            
            {/* <Stack.Screen name={ScreenName.enterMobileNoPage} component={EnterMobileNoPage} />
            <Stack.Screen name={ScreenName.customerDashboard} component={CustomerDashboard} />
            <Stack.Screen name={ScreenName.bookService} component={BookService} />
            <Stack.Screen name={ScreenName.bookingHistory} component={BookingHistory} /> */}
             {/*<Stack.Screen name={ScreenName.whatsNewScreen} component={WhatsNewScreen} />
            <Stack.Screen name={ScreenName.myAccountScreen} component={MyAccount} />
            <Stack.Screen name={ScreenName.itemFullDetailsScreen} component={ItemFullDetailsScreen} 
           options={{
            animation: 'slide_from_bottom',
          }}
            /> */}
            
          </Stack.Navigator>
          </NavigationContainer>
  )
}

export default RootNavigation