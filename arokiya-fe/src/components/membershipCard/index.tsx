import React from 'react'
import { isFutureDate } from '../../commonMethod/commonMethods'
import moment from 'moment'
import { MemberDetails } from '../../interface/common'


interface MembershipCardProps {
    selectedMember:MemberDetails
}
const MembershipCard=({selectedMember}:MembershipCardProps)=> {

  return (
    <div style={{ backgroundColor: 'grey', padding: '1rem', borderRadius: 10 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
            selectedMember?.profileImage ? 
            <img src={selectedMember.profileImage} alt="Base64 Image" style={{height:70,width:70,borderRadius: 50,}} />

            :
            <div style={{ height: 70, width: 70, borderRadius: 50, backgroundColor: 'white',fontSize:'0.5rem',justifyContent:"center",alignItems:'center',display:'flex' }}>{'No Image'}</div>
        }
        <div style={{ color: 'white', marginLeft: '1rem', width: '28rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`Name:${selectedMember?.memberName}`}</div>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`ID:${selectedMember?.memberID}`}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`Mobile No:${selectedMember?.mobileNo}`}</div>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`Blood Group:${selectedMember?.bloodGroup}`}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`Email:${selectedMember?.emailId || '-'}`}</div>
                <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>{`Due:${selectedMember?.planDetails.dueAmount}`}</div>
            </div>
        </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#ffffff' }}>
        <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>
            <div>{'Date Of Join'}</div>
            <div>{selectedMember?.dateOfJoin ? moment(selectedMember?.dateOfJoin).format('DD-MM-YYYY') : '-'}</div>
        </div>
        <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>
            <div>{'Last Payment Date'}</div>
            <div>{selectedMember?.lastpaymentDate ? moment(selectedMember?.lastpaymentDate).format('DD-MM-YYYY') : '-'}</div>
        </div>
        <div style={{ marginBottom: '0.9rem', fontWeight: 'bolder' }}>
            <div>{'Next Payment Date'}</div>
            <div style={!isFutureDate(selectedMember?.nextPaymentDate as string) ? {color:'red'}:{}}>{selectedMember?.nextPaymentDate ? moment(selectedMember?.nextPaymentDate).format('DD-MM-YYYY') : '-'}</div>
        </div>
    </div>

</div>
  )
}


export default MembershipCard