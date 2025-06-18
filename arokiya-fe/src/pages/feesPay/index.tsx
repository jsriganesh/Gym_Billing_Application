import React, { useEffect, useState } from 'react';

import './index.scss'
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/pagelayout';
import { CommonButton } from '../../components/button';
import { MemberDetails, PackageListDetailsDetailsProps } from '../../interface/common';
import { getAllMembers, getAllPlanList } from '../../services/commonApiService';
import Textarea from '@mui/joy/Textarea';


import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { deleteRequest, postRequest, putRequest } from "../../services/axiosService";
import { EndPoint } from "../../services/endPoint";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updatePlanList } from "../../redux/slices/commonSlice";
import AutoCompleteDropDown from '../../components/autoCompleteDropDown';
import moment from 'moment';
import UserDetails from '../../components/userDetailsSmallCard';
import CommonDatePicker from '../../components/datepicker';
import dayjs, { Dayjs } from 'dayjs';
import { convertToISO, isFutureDate } from '../../commonMethod/commonMethods';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const FeesPay = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { planList, membersList } = useAppSelector((state) => state.commonData);

    const [editRowId, setEditRowId] = React.useState<number | null>(null);
    const [editedRow, setEditedRow] = React.useState<Partial<PackageListDetailsDetailsProps>>({});
    const [selectedPackIndex, updateSelectedPackIndex] = React.useState<number | null>(null);
    const [createNewPlan, updateCreateNewPlan] = React.useState<boolean>(false);
    const [allMembers, setAllMembers] = React.useState<any[]>(membersList.map((member) => { return { ...member, label: member.memberName, value: member.memberID } }));
    const [searchedMembers, setSearchedMembers] = React.useState<MemberDetails[]>([]);

    const [selectedMember, setSelectedMember] = React.useState<MemberDetails | null>(null);
    const [selectedPlan, setSelectedPlan] = React.useState<PackageListDetailsDetailsProps | null>(null);
    const [paidAmount, setPaidAmount] = React.useState<string>('0');
    const [comments, setcomments] = React.useState<string>('');
    
    const [totalPayableAmount, setTotalPayableAmount] = React.useState<string>('0');

    const [paymentDate, setPaymentDate] = React.useState<Dayjs | null | string>(dayjs());
    const [nextPaymentDate, setNextPaymentDate] = React.useState<Dayjs | null | string>(dayjs());

  const [collectDueAmount, updateCollectDueAmount] = React.useState('no');

    console.log('membersList ====', membersList)

    useEffect(() => {
        getAllPlanList()
        getAllMembers()
    }, [])


    useEffect(() => {

        setSearchedMembers([...membersList])
    }, [])


    useEffect(() => {

        if (selectedMember?.planDetails && selectedPlan) {
            const paymentDate = moment(selectedMember?.nextPaymentDate)
                .add(selectedPlan.planDuration, 'days')
                .toISOString();

            setNextPaymentDate(paymentDate)
            setTotalPayableAmount((selectedMember?.planDetails.dueAmount + selectedPlan?.planValue).toString())
        }
    }, [selectedMember, selectedPlan])

  const handleChangeAdvanceAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value
    // if(val === 'yes') {
        resetValues()
    // }
    updateCollectDueAmount(val);
  };


  const resetValues =()=>{
    setSelectedPlan(null)
    setTotalPayableAmount('0')
    setPaidAmount('0')
  }

    const renderSelectMemberView = () => {
        return (
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <div>
                    <div style={{ color: '#ffffff', fontSize: '1.2rem' }} className='lable-style'>Select Members</div>
                    <div style={{ color: '#ffffff', fontSize: '0.8rem' }} className='lable-style'>{`(search my mobile no,`} <br /> {` member id, name)`}</div>
                </div>
                <div>
                    <AutoCompleteDropDown applyMemberSearchFilter width={300} options={allMembers} mode={'editable'} label='Select Member' value={null} onChange={(value) => { setSelectedMember(value) }} />
                </div>
            </div>
        )
    }

    const renderSelectPlan = () => {
        const newPlanDetails = planList.map((plan) => { return { ...plan, label: plan.planName + ' / ' + plan.planValue, value: plan.planID } })

        return (
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                <div>
                    <div style={{ color: '#ffffff', fontSize: '1.2rem' }} className='lable-style'>Select New plan</div>
                    {/* <div style={{ color: '#ffffff', fontSize: '0.8rem' }} className='lable-style'>{'(search my mobile no, member id, name)'}</div> */}
                </div>
                <div>
                    <AutoCompleteDropDown width={300} options={newPlanDetails} mode={'editable'} label='Select Plan' value={selectedPlan} onChange={(value) => { setSelectedPlan(value) }} />
                </div>
            </div>
        )
    }


    const calculateBalanceDueAmount=()=>{ return collectDueAmount === 'yes' && selectedMember?.planDetails.dueAmount ?  parseInt(selectedMember?.planDetails.dueAmount.toString()) - parseInt(paidAmount) :  parseInt(totalPayableAmount) - parseInt(paidAmount)}

    const renderPaidAmount = (hideDates= false as boolean) => {
        return (
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center  ' }}>
                <div>
                    <div style={{ color: '#ffffff', fontSize: '1.2rem' }} className='lable-style'>pending  Amount</div>
                </div>
                <div>
                    <UserDetails mode={'editable'} label='Amount' value={paidAmount.toString()} onChange={(value) => setPaidAmount(value)} />
                </div>
                <div>
                    <UserDetails mode={'editable'} label='Balance Due AMount' value={calculateBalanceDueAmount().toString()} onChange={(value) => { }} />
                </div>
                {!hideDates &&<>
                <CommonDatePicker selectedDate={paymentDate} setSelectedDate={setPaymentDate} label='Payment Date' />
                <CommonDatePicker selectedDate={nextPaymentDate} setSelectedDate={setNextPaymentDate} label='Next Payment Date' />
                </>}

            </div>
        )
    }



    const renderSelectedMemberView = () => {
        return (
            <div style={{ backgroundColor: 'grey', padding: '1rem', borderRadius: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ height: 70, width: 70, borderRadius: 50, backgroundColor: 'white' }}></div>
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


    const onSubmitDueAmount = () => {
            const preparData = {
                "memberID":selectedMember?.memberID,
                "memberName":selectedMember?.memberName,
                "paidDate":paymentDate,
                "paidAmount":paidAmount,
                "planID":selectedMember?.planDetails.planID,
                "dueAmount":calculateBalanceDueAmount(),
                "paidMethod":'COH',
                "nextPaymentDate":selectedMember?.nextPaymentDate,
                "comments":comments
            }
           

            console.log('preparData=====>',preparData)
            postRequest(EndPoint.renewplan,preparData,successCallback=>{
                getAllMembers()
                alert('Payment updated')
                navigate('/members')

            },errorCallback=>{})

            console.log(preparData)
    };


    const onSubmit = () => {
        if(!selectedPlan) return
            const preparData = {
                "memberID":selectedMember?.memberID,
                "memberName":selectedMember?.memberName,
                "paidDate":paymentDate,
                "paidAmount":paidAmount,
                "planID":selectedPlan.planID,
                "dueAmount":calculateBalanceDueAmount(),
                "paidMethod":'COH',
                "nextPaymentDate":nextPaymentDate,
                "comments":comments
            }
           


            postRequest(EndPoint.renewplan,preparData,successCallback=>{
                getAllMembers()
                alert('Payment updated')
                navigate('/members')

            },errorCallback=>{})

            console.log(preparData)
    };


    const renderRadioButtonForPayDue = () => {
        return (
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center',marginTop: '2rem'  }}>
                <div>
                    <div style={{ color: '#ffffff', fontSize: '1.2rem' }} className='lable-style'>Pending Amount</div>
                </div>
                {checkIsPaidDueAmountView()}
            </div>
        )
    }



    const checkIsPaidDueAmountView = () => {
        return (
          <div style={{ marginLeft: '2rem' }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={collectDueAmount}
                onChange={handleChangeAdvanceAmount}
              >
                <FormControlLabel value="yes" control={<Radio sx={{
                  color: '#E3E3E3', // default (unselected) color
                  '&.Mui-checked': {
                    color: '#FAF754', // selected color (blue example)
                  },
                }} />} label="Yes"
                  sx={{
                    color: collectDueAmount === 'yes' ? '#FAF754' : '#E3E3E3', // label color
                    '& .MuiFormControlLabel-label': {
                      fontWeight: collectDueAmount === 'yes' ? 'bold' : 'normal',
                    },
                  }} />
                <FormControlLabel value="no" control={<Radio sx={{
                  color: '#E3E3E3', // default (unselected) color
                  '&.Mui-checked': {
                    color: '#FAF754', // selected color (blue example)
                  },
                }} />} label="No"
                  sx={{
                    color: collectDueAmount === 'yes' ? '#E3E3E3' : '#FAF754', // label color
                    '& .MuiFormControlLabel-label': {
                      fontWeight: collectDueAmount === 'yes' ? 'bold' : 'normal',
                    },
                  }} />
              </RadioGroup>
            </FormControl>
          </div>
        )
      }
    


    return (
        <PageLayout>
            <div className="category-container">
                <div className='members-top-row'>
                    <div className='body-sub-title'>Fees Payment</div>
                </div>

                <div style={{ height: "90%", marginLeft: '2rem', marginRight: '2rem' }}>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div>
                            {renderSelectMemberView()}
                            {renderRadioButtonForPayDue()}
                            {collectDueAmount ==='no' && renderSelectPlan()}
                        </div>
                        <div>
                            {selectedMember && renderSelectedMemberView()}
                        </div>
                    </div>

                    {selectedMember && selectedPlan && <div style={{ backgroundColor: "#8d8d8d", display: 'flex', flexDirection: 'column', justifySelf: 'start', marginTop: '2rem', padding: '1rem', borderRadius: 10, height: '5rem', justifyContent: 'space-evenly' }}>
                        <div className='body-sub-title'>Pending due amount:- {selectedMember?.planDetails.dueAmount}</div>
                        <div className='body-sub-title'>current plan amount:- {selectedPlan?.planValue}</div>
                        <div className='body-sub-title'>Total amount:-  {totalPayableAmount}</div>
                    </div>}

                    {selectedMember && collectDueAmount ==='yes' && <div style={{ backgroundColor: "#8d8d8d", display: 'flex', flexDirection: 'column', justifySelf: 'start', marginTop: '2rem', padding: '1rem', borderRadius: 10, height: '5rem', justifyContent: 'space-evenly' }}>
                        <div className='body-sub-title'>Pending due amount:- {selectedMember?.planDetails.dueAmount}</div>
                    </div>}

                    {selectedMember && selectedPlan && renderPaidAmount()}
                    {selectedMember && collectDueAmount ==='yes' && renderPaidAmount(true)}

                    <div className='body-sub-title' style={{marginTop:'2rem'}}>If any comments please enter {selectedMember?.planDetails.dueAmount}</div>
                    <Textarea name="Solid" placeholder="Enter any comments" variant="solid" sx={{width:400,height:100}}  onChange={(val)=>{setcomments(val.target.value)}}/>

                    {selectedMember && (selectedPlan || collectDueAmount ==='yes') && <div style={{  display:'flex',justifyContent:"center",marginTop:'2rem' }}>
                  <CommonButton label='Submit' handleClick={()=>{collectDueAmount  === 'yes'? onSubmitDueAmount() :onSubmit()}}/>
                </div>}
                </div>

                
                
            </div>
        </PageLayout>
    );
}
export default FeesPay