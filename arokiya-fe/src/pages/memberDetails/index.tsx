import React, { useEffect } from 'react';
import { IconButton, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom';

import './members.scss'
import PageLayout from '../../components/pagelayout';
import UserDetails from '../../components/userDetailsSmallCard';
import TabContainer from '../../components/tab';
// import { DatePicker } from '@material-ui/pickers';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CommonDatePicker from '../../components/datepicker';
import AutoCompleteDropDown from '../../components/autoCompleteDropDown';
import { bloodGroupList, genderList } from '../../utils/constant';
import { useAppSelector } from '../../redux/store';


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
  bloodGroup: string;
  emailId: string;
  dateOfBirth: string;
  dateOfJoin: string;
  memberId: string;
  address: string;
  gender: string;
  lastPaymentDate: string;
}


interface PaymentDetailsProps {
  plan: any;
  // collectAdvance:string,
  advanceAmount: string
  paidAmount:string
}


const defaultPaymentDetails: PaymentDetailsProps = {
  plan: {},
  // collectAdvance:'',
  advanceAmount: '',
  paidAmount:''
}

const defaultUserDetails: MemberDetailsProps = {
  memberName: '',
  mobileNumber: '',
  bloodGroup: '',
  emailId: '',
  dateOfBirth: '',
  dateOfJoin: '',
  memberId: '',
  address: '',
  gender: '',

  lastPaymentDate: '',
}

const MemberDetails = () => {
  const location = useLocation();
  const { isCreateMember } = location.state || {};

  const [collectAdvance, updateCollectAdvance] = React.useState('no');

  const [paymentDetails, setPaymentDetails] = React.useState<PaymentDetailsProps>(defaultPaymentDetails);

  const [memberDetails, setMemberDetails] = React.useState<MemberDetailsProps>(defaultUserDetails);
  const [selectedTab, upsateSelecetedTab] = React.useState(0);

  const handleChange = (newValue: number) => {
    console.log('handleChange =', newValue)
    upsateSelecetedTab(newValue);
  };

  const viewMode = isCreateMember ? 'editable' : 'view'
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
        <Typography color="text.secondary" fontSize={14}>
          No Image
        </Typography>

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
    // updateMemberDetails[key]= value
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
  const [dob, setDOB] = React.useState<Dayjs | null>(dayjs());
  const [doj, setDOJ] = React.useState<Dayjs | null>(dayjs());
  const [lpd, setLPD] = React.useState<Dayjs | null>(dayjs()); // lastPaymentDate
  const { planList } = useAppSelector((state) => state.commonData);

// console.log('planList ====',planList)

//   const onSubmit= () => {

//     if (planDetails) {
//         const preparData = {
//             "memberName": data.name,
//             "mobileNo": data.mobileNo,
//             "emailId": data.email,
//             "dateOfJoin": data.doj,
//             "dateOfBirth": data.dob,
//             "lastpaymentDate": new Date(),
//             "address": data.address,
//             "profileImage": "",
//             "planDetails": {
//                 "planID": planDetails.planDetails?.planID,
//                 "planName": planDetails.planDetails?.planName,
//                 "duration": planDetails.planDetails?.planDuration, // days
//                 "planValue": planDetails.planDetails?.planValue,
//                 "paidAmount": data.paidAmount,
//                 "dueAmount": dueAmount
//             },
//             "gender": data.gender

//         }


//         postRequest(EndPoint.membersList,preparData,successCallback=>{
//             const list = [...membersList]
//             list.unshift(successCallback)
//             dispatch(updateMemberList(list))
//             Alert.alert('member created ')
//             navigation.goBack()
//         },errorCallback=>{})

//         console.log(preparData)
//     }
// };




  return (
    <PageLayout>
      <div className="category-container">
        <div className='members-top-row'>
          <div className='body-sub-title'>Member Details</div>
        </div>
        <div style={{ height: '90%', width: "100%", }}>
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
              <CommonDatePicker selectedDate={doj} setSelectedDate={setDOJ} label='Date of join' />
              <CommonDatePicker selectedDate={lpd} setSelectedDate={setLPD} label='Last payment date' />
            </div>
          </div>


          <div style={{ height: '1px', backgroundColor: '##FFFFFF', opacity: 0.1, marginTop: '1rem', }} />
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', paddingLeft: 120,}}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
              {/* <div className='body-sub-title'>Select plan</div> */}
              <AutoCompleteDropDown options={genderList} mode={viewMode} label='Select plan' value={paymentDetails.plan} onChange={(value) => onChangePaymentDetails('plan', value)} />
            </div>
          <div style={{width:1,backgroundColor:'#888888',marginLeft:'1rem',marginRight:'2rem'}}/>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
              <div className='body-sub-title'>choose yes, if we collect <br />advance amount</div>
              {advanceAmountView()}
              {collectAdvance === 'yes' && <UserDetails inputType='number' mode={viewMode} label='Advance Amount' value={paymentDetails.advanceAmount} onChange={(value) => onChangePaymentDetails('advanceAmount', value)} />}
            
              <UserDetails mode={viewMode} label='Paid Amount' value={paymentDetails.paidAmount} onChange={(value) => onChangePaymentDetails('paidAmount', value)} />

            </div>
          </div>

          {
            !isCreateMember &&
            <>
              <TabContainer handleChange={handleChange} selectedTab={selectedTab} tabList={[
                { label: 'Service', iconPosition: 'end' },
                { label: 'Diet', iconPosition: 'end' },
                { label: 'Payment', iconPosition: 'end' },
                { label: 'Workout', iconPosition: 'end' },
              ]} />

              <CustomTabPanel value={selectedTab} index={0}>
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={1}>
                Item Two
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={2}>
                Item Three
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={3}>
                Item Three
              </CustomTabPanel>
            </>
          }
        </div>

      </div>
    </PageLayout>
  );
}
export default MemberDetails