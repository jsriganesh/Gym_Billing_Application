import React, { useEffect } from 'react';
import { IconButton, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Grid, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';

import './members.scss'
import PageLayout from '../../components/pagelayout';
import UserDetails from '../../components/userDetailsSmallCard';
import TabContainer from '../../components/tab';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CommonDatePicker from '../../components/datepicker';
import AutoCompleteDropDown from '../../components/autoCompleteDropDown';
import { bloodGroupList, genderList } from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getRequest, postRequest, putRequest } from '../../services/axiosService';
import { EndPoint } from '../../services/endPoint';
import { updateMemberList } from '../../redux/slices/commonSlice';
import { CommonButton } from '../../components/button';
import moment from 'moment';
import PaymentHistoryCard from '../../components/paymentHistoryCard';
import { PaymentHistoryDetails } from '../../interface/common';
import WebcamCapture from '../../components/webcamCapture';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface MemberDetailsProps {
  memberName: string;
  mobileNumber: string;
  bloodGroup: any;
  emailId: string;
  dateOfBirth: string;
  dateOfJoin: string;
  memberId: string;
  address: string;
  gender: any;
  lastPaymentDate: string;
  pendingDueAmount?: string
  profileImage:string
}


interface PaymentDetailsProps {
  plan: any;
  // collectAdvance:string,
  advanceAmount: string
  paidAmount: string
}


const defaultPaymentDetails: PaymentDetailsProps = {
  plan: {},
  // collectAdvance:'',
  advanceAmount: '',
  paidAmount: ''
}

const defaultUserDetails: MemberDetailsProps = {
  memberName: '',
  mobileNumber: '',
  bloodGroup: {},
  emailId: '',
  dateOfBirth: '',
  dateOfJoin: '',
  memberId: '',
  address: '',
  gender: {},
  profileImage:'',

  lastPaymentDate: '',
}

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MemberDetails = () => {
  const location = useLocation();
  const { isCreateMember, isEditMember, editMemberDetails } = location.state || {};

  console.log('editMemberDetails =====>', editMemberDetails)
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  const navigate = useNavigate();

  const [collectAdvance, updateCollectAdvance] = React.useState('no');

  const [paymentDetails, setPaymentDetails] = React.useState<PaymentDetailsProps>(defaultPaymentDetails);

  const [memberDetails, setMemberDetails] = React.useState<MemberDetailsProps>(defaultUserDetails);
  const [selectedTab, upsateSelecetedTab] = React.useState(0);

  const [dob, setDOB] = React.useState<Dayjs | null | string>(dayjs());
  const [doj, setDOJ] = React.useState<Dayjs | null | string>(dayjs());
  const [lpd, setLPD] = React.useState<Dayjs | null | string>(dayjs(new Date()).toDate().toISOString()); // lastPaymentDate
  const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistoryDetails[]>([]); // lastPaymentDate
  const { planList, membersList } = useAppSelector((state) => state.commonData);

  const [profileImage, setProfileImage] = React.useState('');
  const [showImageUploadModal, setShowImageUploadModal] = React.useState(false);


  useEffect(() => {
    if (editMemberDetails) {
      setMemberDetails({
        memberName: editMemberDetails.memberName,
        mobileNumber: editMemberDetails.mobileNo,
        bloodGroup: { value: editMemberDetails.bloodGroup, label: editMemberDetails.bloodGroup },
        emailId: editMemberDetails.emailId,
        dateOfBirth: editMemberDetails.dateOfBirth,
        dateOfJoin: editMemberDetails.dateOfJoin,
        memberId: editMemberDetails.memberID,
        address: editMemberDetails.address,
        gender: { value: editMemberDetails.gender, label: editMemberDetails.gender },
        pendingDueAmount: editMemberDetails.planDetails.dueAmount,
        profileImage:editMemberDetails.profileImage,
        lastPaymentDate: editMemberDetails.lastpaymentDate,
      })
      setDOB((editMemberDetails.dateOfBirth))
      setDOJ(editMemberDetails.dateOfJoin)
      setLPD(editMemberDetails.lastpaymentDate)
      getPaymentHistory(editMemberDetails.memberID)
      setProfileImage(editMemberDetails.profileImage)
    }


  }, [])

  const handleChange = (newValue: number) => {
    console.log('handleChange =', newValue)
    upsateSelecetedTab(newValue);
  };

  const viewMode = (isCreateMember || isEditMember) ? 'editable' : 'view'
  // const viewMode = 'editable'

  const renderProfileImage = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: '#d3d3d3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div onClick={()=>setShowImageUploadModal(true)}>
        {
          profileImage ? 
          <img src={profileImage} alt="Base64 Image" style={{height:120,width:120}} />

          :
          <Typography color="text.secondary" fontSize={14}>
          No Image
        </Typography>}

        <IconButton
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            backgroundColor: '#ffffff',
            boxShadow: 1,
            p: 0.5,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        </div>
      </Box>
    )
  }

  // type MemberDetailsProps = typeof defaultUserDetails;

  const onChangeMemberdetails = (key: string, value: string) => {
    let updateMemberDetails = { ...memberDetails }
    // updateMemberDetails[key]= value
    updateMemberDetails = { ...updateMemberDetails, [key]: value }
    setMemberDetails(updateMemberDetails)
  }

  const onChangePaymentDetails = (key: string, value: string) => {
    let updatePaymentDetails = { ...paymentDetails }
    updatePaymentDetails = { ...updatePaymentDetails, [key]: value }
    setPaymentDetails(updatePaymentDetails)
  }


  useEffect(() => {
    collectAdvance === 'no' && onChangePaymentDetails('advanceAmount', '')
  }, [collectAdvance])

  const advanceAmountView = () => {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={collectAdvance}
            onChange={handleChangeAdvanceAmount}
          >
            <FormControlLabel value="yes" control={<Radio sx={{
              color: '#E3E3E3', // default (unselected) color
              '&.Mui-checked': {
                color: '#FAF754', // selected color (blue example)
              },
            }} />} label="Yes"
              sx={{
                color: collectAdvance === 'yes' ? '#FAF754' : '#E3E3E3', // label color
                '& .MuiFormControlLabel-label': {
                  fontWeight: collectAdvance === 'yes' ? 'bold' : 'normal',
                },
              }} />
            <FormControlLabel value="no" control={<Radio sx={{
              color: '#E3E3E3', // default (unselected) color
              '&.Mui-checked': {
                color: '#FAF754', // selected color (blue example)
              },
            }} />} label="No"
              sx={{
                color: collectAdvance === 'yes' ? '#E3E3E3' : '#FAF754', // label color
                '& .MuiFormControlLabel-label': {
                  fontWeight: collectAdvance === 'yes' ? 'bold' : 'normal',
                },
              }} />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
  const handleChangeAdvanceAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCollectAdvance((event.target as HTMLInputElement).value);
  };
  console.log('planList ====', planList)

  // const updateMemberDietPlan = () => {
  //     if (memberDetails) {

  //         const updateData = { ...memberDetails }

  //         putRequest(
  //             EndPoint.membersList + editMemberDetails._id,
  //             updateData,
  //             success => {
  //                 // setDietPlans([...selectedPlan])
  //                 // Alert.alert('updated success fully')
  //                 // const list = [...membersList]
  //                 // const findIndex = membersList.findIndex(member => success.memberID === member.memberID)
  //                 // if (findIndex >= 0) {
  //                 //     list.splice(findIndex, 1, success)
  //                 //     memberDetails = success
  //                 //     dispatch(updateMemberList(list))
  //                 // }
  //             },
  //             error => {
  //                 console.log('error -->', error);
  //             },
  //         );
  //     }
  // }


  const onSubmit = () => {
    let preparData = {
      "memberName": memberDetails.memberName,
      "mobileNo": memberDetails.mobileNumber,
      "emailId": memberDetails.emailId,
      "dateOfJoin": doj,
      "dateOfBirth": dob,
      "lastpaymentDate": lpd,
      "address": memberDetails.address,
      "profileImage": profileImage? profileImage:'',
      "advanceAmount": paymentDetails.advanceAmount ? paymentDetails.advanceAmount : 0,
      "planDetails": {
        "planID": paymentDetails.plan?.planID,
        "planName": paymentDetails.plan?.planName,
        "duration": paymentDetails.plan?.planDuration, // days
        "planValue": paymentDetails.plan?.planValue,
        "paidAmount": paymentDetails.paidAmount,
        "dueAmount": calculateBalanceAmount()
      },
      "gender": memberDetails.gender.value,
      "bloodGroup": memberDetails.bloodGroup.value,
    }


    if (editMemberDetails && editMemberDetails?._id) {
      let newPreparData = { ...preparData, '_id': editMemberDetails._id, 'advanceAmount': editMemberDetails.advanceAmount, 'planDetails': editMemberDetails.planDetails }

      console.log('success ====>', newPreparData)

      putRequest(
        EndPoint.membersList + editMemberDetails._id,
        newPreparData,
        success => {
          console.log('success ====>', success)
          // setDietPlans([...selectedPlan])
          const list = [...membersList]
          const findIndex = membersList.findIndex(member => success.memberID === member.memberID)
          if (findIndex >= 0) {
            list.splice(findIndex, 1, success)
            // memberDetails = success
            dispatch(updateMemberList(list))
          }
          alert('updated success fully')
        },
        error => {
          console.log('error -->', error);
        },
      );
    } else {
      console.log('preparData =====>', preparData)
      postRequest(EndPoint.membersList, preparData, successCallback => {
        const list = [...membersList]
        list.unshift(successCallback)
        dispatch(updateMemberList(list))
        alert('member created ')
        // navigation
        navigate('/members')
        // navigate('/members')
      }, errorCallback => { })
    }



    console.log(preparData)
    // }
  };


  const getPaymentHistory = (memberID: string) => {
    getRequest(EndPoint.paymentHistory + 'by-member-id/' + memberID,
      (success) => {
        console.log('success ===> getPaymentHistory', success)
        if (success.length > 0) {
          setPaymentHistory(success)
          // store.dispatch(updatePlanList(success));
        } else {
          setPaymentHistory([])
          // store.dispatch(updatePlanList([]));
        }
      },
      (error) => { console.log('error -->', error) },
    )
  }


  const newPlanDetails = planList.map((plan) => { return { ...plan, label: plan.planName + ' / ' + plan.planValue, value: plan.planID } })


  const calculateBalanceAmount = () => {
    console.log(paymentDetails)
    const planAmount = parseInt(paymentDetails.plan.planValue)
    const advance = paymentDetails.advanceAmount ? parseInt(paymentDetails.advanceAmount) : 0
    const paidAmount = parseInt(paymentDetails.paidAmount)

    const due = (planAmount + advance) - paidAmount
    return due
  }

  return (
    <PageLayout>
      <div className="category-container">
        <div className='members-top-row'>
          <div className='body-sub-title'>Member Details</div>
        </div>
        <div style={{ height: '90%', width: "100%", overflowY: 'scroll' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

            {renderProfileImage()}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '85%' }}>

              <UserDetails mode={viewMode} label='Member Name' value={memberDetails.memberName} onChange={(value) => onChangeMemberdetails('memberName', value)} />
              <UserDetails mode={viewMode} label='Mobile No' value={memberDetails.mobileNumber} onChange={(value) => onChangeMemberdetails('mobileNumber', value)} />
              <UserDetails mode={viewMode} label='Email ID' value={memberDetails.emailId} onChange={(value) => onChangeMemberdetails('emailId', value)} />
              <UserDetails mode={viewMode} label='Address' value={memberDetails.address} onChange={(value) => onChangeMemberdetails('address', value)} />
              {/* <UserDetails mode={viewMode} label='Blood Group' value={memberDetails.bloodGroup} onChange={(value) => onChangeMemberdetails('bloodGroup', value)} /> */}
              <AutoCompleteDropDown options={bloodGroupList} mode={viewMode} label='Blood Group' value={memberDetails.bloodGroup} onChange={(value) => onChangeMemberdetails('bloodGroup', value)} />
              <AutoCompleteDropDown options={genderList} mode={viewMode} label='Gender' value={memberDetails.gender} onChange={(value) => onChangeMemberdetails('gender', value)} />

              <CommonDatePicker selectedDate={dob} setSelectedDate={setDOB} label='Date of birth' />
              {!isEditMember ? <CommonDatePicker selectedDate={doj} setSelectedDate={setDOJ} label='Date of join' /> :
                <UserDetails mode={viewMode} label='Date of join' value={moment(memberDetails.dateOfJoin).format('DD-MM-YYYY')} onChange={() => { }} />
              }
              {/* <CommonDatePicker selectedDate={memberDetails.lastPaymentDate} setSelectedDate={()=>{}} label='last payment date' /> */}
              {
                isEditMember &&
                <>
                  <UserDetails mode={viewMode} label='Last payment date' value={moment(memberDetails.lastPaymentDate).format('DD-MM-YYYY')} onChange={() => { }} />
                  <UserDetails mode={viewMode} label='Next payment date' value={moment(editMemberDetails.nextPaymentDate).format('DD-MM-YYYY')} onChange={() => { }} />
                  <UserDetails mode={viewMode} label='Pending Amount' value={memberDetails.pendingDueAmount ? memberDetails.pendingDueAmount : '0'} onChange={() => { }} />
                </>
              }

            </div>
          </div>


          <div style={{ height: '1px', backgroundColor: '##FFFFFF', opacity: 0.1, marginTop: '1rem', }} />
          {!isEditMember &&
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', paddingLeft: 120, }}>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <AutoCompleteDropDown options={newPlanDetails} mode={viewMode} label='Select plan' value={paymentDetails.plan} onChange={(value) => onChangePaymentDetails('plan', value)} />
              </div>
              <div style={{ width: 1, backgroundColor: '#888888', marginLeft: '1rem', marginRight: '2rem' }} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <div className='body-sub-title'>choose yes, if we collect <br />advance amount</div>
                {advanceAmountView()}
                {collectAdvance === 'yes' && <UserDetails inputType='number' mode={viewMode} label='Advance Amount' value={paymentDetails.advanceAmount} onChange={(value) => onChangePaymentDetails('advanceAmount', value)} />}

                <UserDetails mode={viewMode} label='Paid Amount' value={paymentDetails.paidAmount} onChange={(value) => onChangePaymentDetails('paidAmount', value)} />

              </div>
            </div>}
          {
            paymentDetails.plan && paymentDetails.paidAmount && !isEditMember &&
            <div style={{ backgroundColor: '#8d8d8d', padding: '1rem', borderRadius: 10, margin: '2rem 6rem' }}>
              <div className='body-sub-title'>Balance amount is {calculateBalanceAmount()}</div>
            </div>
          }



          <div style={{
            display: 'flex', justifyContent: "center", marginTop: '2rem'
          }}>
            <CommonButton label='Submit' handleClick={() => { onSubmit() }} />
          </div>
          {
            !isCreateMember &&
            <>
              <TabContainer handleChange={handleChange} selectedTab={selectedTab} tabList={[
                { label: 'Diet', iconPosition: 'end' },
                { label: 'Payment', iconPosition: 'end' },
                { label: 'Workout', iconPosition: 'end' },
                { label: 'Service', iconPosition: 'end' },
              ]} />


              <CustomTabPanel value={selectedTab} index={0}>
                <div>
                  <img alt='logo' src={require('../../assets/images/comingsoon.jpg')} style={{ borderRadius: 100 }} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={1}>
                {
                  paymentHistory.map((payment) => <PaymentHistoryCard data={payment} />
                  )
                }

              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={2}>
                <div>
                  <img alt='logo' src={require('../../assets/images/comingsoon.jpg')} style={{ borderRadius: 100 }} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={3}>
                <div>
                  <img alt='logo' src={require('../../assets/images/comingsoon.jpg')} style={{ borderRadius: 100 }} />
                </div>

              </CustomTabPanel>
            </>
          }
        </div>


       {showImageUploadModal && <Modal
          keepMounted
          open={showImageUploadModal}
          onClose={()=>{}}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={modalstyle}>
          <WebcamCapture getProfileImage={(image:string)=>{setShowImageUploadModal(false); setProfileImage(image)}}/>
            {/* <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Modal>}

      </div>
    </PageLayout>
  );
}
export default MemberDetails