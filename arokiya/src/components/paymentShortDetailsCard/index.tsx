import React from 'react';
import {View} from 'react-native';
import {colors} from '../../utils/colors';
import {
  Text10PXBold,
  Text10PXSemiBold,
  Text12PXBold,
  Text14PXBold,
  Text16PXBold,
  Text16PXSemiBold,
} from '../styledComponents/labels';
import BillIcon from 'react-native-vector-icons/FontAwesome';
import {PaymentHistoryDetails} from '../../interface/common';
import moment from 'moment';

interface PaymentShortDetailsCardProps {
  paymentDetails: PaymentHistoryDetails;
}

const PaymentShortDetailsCard = ({
  paymentDetails,
}: PaymentShortDetailsCardProps) => {
  return (
    <View
      style={{
        marginBottom: 5,
        backgroundColor: colors.green,
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              backgroundColor: colors.lightGrey,
            }}></View>
          <View style={{marginLeft: 10}}>
            <Text10PXBold style={{color: colors.lightGrey}}>
              {'Member Name'}
            </Text10PXBold>
            <Text14PXBold style={{color: colors.yellow}}>
              {paymentDetails.memberName}
            </Text14PXBold>
          </View>
        </View>

        <Text10PXSemiBold style={{color: colors.white, marginTop: 5}}>
          {moment(paymentDetails.paidDate).format('DD MMM YYYY')}
        </Text10PXSemiBold>
      </View>
      <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <Text16PXSemiBold>
          <BillIcon name="rupee" size={15} />
          {paymentDetails.paidAmount}
        </Text16PXSemiBold>

        <View style={{marginTop: 5}}>
          <Text10PXBold style={{color: colors.white}}>
            {'Payment Type '}
            <Text12PXBold style={{color: colors.white}}>{paymentDetails.paidMethod}</Text12PXBold>
          </Text10PXBold>
        </View>
      </View>
    </View>
  );
};

export default PaymentShortDetailsCard;
