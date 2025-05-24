import { View, StyleSheet} from "react-native";
import React from 'react'
import { colors } from '../../utils/colors'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
interface Props {}
const MembersListSkeletonCard: React.FC<Props> = ({ }) => {
    return (
        <View style={memberListCardstyles.body}>
            <SkeletonPlaceholder borderRadius={4} highlightColor={colors.lightGrey}>
                <SkeletonPlaceholder.Item >
                    <SkeletonPlaceholder.Item flexDirection="row" >
                        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                        <SkeletonPlaceholder.Item marginLeft={20} flex={1}>
                            <SkeletonPlaceholder.Item width={120} height={10} />
                            <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
                            <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
                        </SkeletonPlaceholder.Item>


                        <SkeletonPlaceholder.Item marginLeft={20} flex={1}>
                            <SkeletonPlaceholder.Item width={120} height={10} />
                        </SkeletonPlaceholder.Item>


                    </SkeletonPlaceholder.Item>

                    <SkeletonPlaceholder.Item
                        marginTop={20}
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {[...Array(5)].map((_, index) => (
                            <SkeletonPlaceholder.Item key={index} width={40} height={40} />
                        ))}
                    </SkeletonPlaceholder.Item>

                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>


    )
}

export default MembersListSkeletonCard

export const memberListCardstyles = StyleSheet.create({
    body: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 8,
        // height:300,
    },
    basicDetails: {
        flexDirection: 'row'
    },
    profile: {
        flex: 0.17
    },
    profileNoImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: '#D9D9D9'
    },
    details: {
        flex: 0.83
    }


})