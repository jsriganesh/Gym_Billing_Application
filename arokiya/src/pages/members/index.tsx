import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { Text12PXSemiBold, Text18PXBold, Text24PXBold } from '../../components/styledComponents/labels'
import Footer from '../../components/footer'
import SearchHeader from "../../components/searchHeader";
import MembersListCard from "../../components/memberListCard";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Route, useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../utils/screenNames";
import { getRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { updateMemberList, updatePlanList } from "../../redux/slices/commonSlice";
import { GeneralProps, MemberDetails } from "../../interface/common";
import MembersListSkeletonCard from "../../components/memberListCard/membersSkeleton";
// import { PrimaryButton } from '../../components/buttons'



interface Props extends GeneralProps {
    // userDetails: UserDetailsProps;
    route: Route<string, object | undefined>;
  }
  
const MembersList: React.FC<Props>  =  (props) => {
    const dispatch = useAppDispatch();
    // const navigation = useNavigation();

    const { membersList } = useAppSelector((state) => state.commonData);


    const [showMembersList,setMembersList]=useState<MemberDetails[]>([])
    const [searchText,setSearchText]=useState<string>('')
    const [showLoading,setShowLoading]=useState<boolean>(false)

    useEffect(()=>{
        setMembersList(membersList)
    },[membersList])

    useEffect(()=>{
        if(!searchText) {return setMembersList(membersList) }

        // parseInt(member.mobileNo) === parseInt(searchText) :

        console.log('===',membersList)
        const searchMembers = membersList.filter(member => member.memberName.toLowerCase().includes(searchText.toLowerCase()) || member.mobileNo == searchText)
        
        setMembersList(searchMembers)
    },[searchText])

    const getPacageList = () => {
        setShowLoading(true)
        getRequest(EndPoint.plan,
            (success) => {
                setShowLoading(false)

                if (success.length > 0) {
                    dispatch(updatePlanList(success))
                } else {
                    dispatch(updatePlanList([]))
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }

    const getMemberList = () => {
        getRequest(EndPoint.membersList,
            (success) => {

                console.log('success -->', JSON.stringify(success))
                if (success.length > 0) {
                    dispatch(updateMemberList(success))
                } else {
                    dispatch(updateMemberList([]))
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }


    useEffect(() => {
        getPacageList()
        getMemberList()

    }, [])

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.black} />
                <SearchHeader 
                setSearchQuery={setSearchText}
                searchQuery={searchText}
                membersCount={membersList.length} onClickAdd={() => props.navigation.navigate(ScreenName.addNewMember as never)} />
                <ScrollView>
                    <View style={styles.contants}>
                        {
                             showLoading && [...Array(5)].map((_, index) => (
                                <MembersListSkeletonCard />
                            ))
                             }
                        {
                            !showLoading && showMembersList.length > 0 ?
                            showMembersList.map((details, index) => {
                                    return <MembersListCard key={index} memberDetails={details} index={index} {...props}/>
                                })
                                : null
                        }


                    </View>
                </ScrollView>
            </View>


            {/* <Footer /> */}

        </View>
    )
}

export default MembersList

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between'
    },

    container: {
        flex: 1
    },
    contants: {
        flex: 1,
        paddingHorizontal: 16,
        marginVertical: 16
    },
    tabContainer: {
        // width:'100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})