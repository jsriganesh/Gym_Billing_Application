import React from 'react';
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

  const [collectAdvance, updateCollectAdvance] = React.useState('yes');


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
              <UserDetails mode={viewMode} label='Blood Group' value={memberDetails.bloodGroup} onChange={(value) => onChangeMemberdetails('bloodGroup', value)} />
              <UserDetails mode={viewMode} label='Gender' value={memberDetails.gender} onChange={(value) => onChangeMemberdetails('gender', value)} />

              {/* <DatePicker
  mask="mm"
  value={new Date()}
  onChange={console.log}
  renderInput={(props:any) => (
    <TextField {...props} helperText="invalid mask" />
  )}
/> */}


<CommonDatePicker selectedDate={dob} setSelectedDate={setDOB} label='Date of birth' />
<CommonDatePicker selectedDate={doj} setSelectedDate={setDOJ} label='Date of join' />
<CommonDatePicker selectedDate={lpd} setSelectedDate={setLPD} label='Last payment date' />
              {/* <Box sx={{ p: 1.5 }}>
                <Grid container spacing={2}>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format='DD-MM-YYYY'
                      label="Select Date"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      // renderInput={(params:any) => <TextField {...params} />}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          sx: {
                            width: 195,
                            // backgroundColor: '#464545',       // match dark bg
                            color: '#B0B0B0',                 // text color
                            '& .MuiInputBase-input': {
                              color: '#B0B0B0',              // input text
                              // backgroundColor: '#464545',
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                // borderColor: 'red',      // border
                                // backgroundColor: '#464545',
                              },
                              '&:hover fieldset': {
                                borderColor: '#D0D0D0',      // subtle hover
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#D0D0D0',      // subtle focus
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#888888',              // label color
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#00bcd4',              // focused label color
                            },
                            '& .MuiSvgIcon-root': {
                              color: '#888888',              // calendar icon
                            },

                            '& .MuiPickersOutlinedInput-root': {
                              // border:'1px solid red'
                              color: 'white',
                              backgroundColor: '#464545',


                            },
                            '& .MuiPickersOutlinedInput-notchedOutline': {
                              borderColor: '#888888 !important'
                            },
                            // '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            //   borderColor: '#D0D0D0',
                            // },

                            // '& .MuiPickersInputBase-root-MuiPickersOutlinedInput-root

                            // '& .MuiPickersOutlinedInput-root':{
                            //   color
                            // },

                            // 🔸 Border (Notched Outline)
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#888888', // your desired border color
                            },
                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#D0D0D0',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'red !important',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'red', // or your preferred color
                            },

                            // Focus border override (removes MUI blue)
                            // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            //   borderColor: '#B0B0B0', // <-- your custom focus color
                            // },


                            // // 🔸 Label
                            // '& .MuiInputLabel-root': {
                            //   color: '#B0B0B0',
                            // },
                            // '& .MuiInputLabel-root.Mui-focused': {
                            //   color: '#B0B0B0',
                            // },
                          },
                        },
                      }}

                    // slotProps={{
                    //   textField: {
                    //     variant: 'outlined',
                    //     sx: {
                    //       width: 170,

                    //       // 🔸 Input Text
                    // '& .MuiInputBase-input': {
                    //   color: '#B0B0B0', // your desired text color
                    // },

                    // // 🔸 Label
                    // '& .MuiInputLabel-root': {
                    //   color: '#B0B0B0',
                    // },
                    // '& .MuiInputLabel-root.Mui-focused': {
                    //   color: '#B0B0B0',
                    // },

                    //       // 🔸 Border (Notched Outline)
                    //       '& .MuiOutlinedInput-notchedOutline': {
                    //         borderColor: '#B0B0B0', // your desired border color
                    //       },
                    //       '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    //         borderColor: '#D0D0D0',
                    //       },
                    //       '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    //         borderColor: '#D0D0D0',
                    //       },

                    // // 🔸 Calendar Icon
                    // '& .MuiSvgIcon-root': {
                    //   color: '#B0B0B0',
                    // },
                    //     },
                    //   },
                    // }}

                    />
                  </LocalizationProvider>
                </Grid>
              </Box> */}
              {/* <UserDetails mode={viewMode} label='Date of birth' value={memberDetails.dateOfBirth} onChange={(value) => onChangeMemberdetails('dateOfBirth',value)}  /> */}
              {/* <UserDetails mode={viewMode} label='Date of join' value={memberDetails.dateOfJoin} onChange={(value) => onChangeMemberdetails('dateOfJoin', value)} />
              <UserDetails mode={viewMode} label='Last payment date' value={memberDetails.lastPaymentDate} onChange={(value) => onChangeMemberdetails('lastPaymentDate', value)} /> */}

              {/* <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} />
              <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} />
              <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} />
              <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} />
              <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} />
              <UserDetails mode={viewMode} label='Member Name' value='Sriganesh' onChange={() => { }} /> */}

            </div>
          </div>


          <div style={{ height:'1px',backgroundColor:'##FFFFFF',opacity:0.1,marginTop: '1rem',}}/>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '1rem', paddingLeft: 120 }}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginRight: '7rem' }}>
              <div className='body-sub-title'>Select plan</div>
              <UserDetails mode={viewMode} label='Member Name' value={memberDetails.memberName} onChange={(value) => onChangeMemberdetails('memberName', value)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
              <div className='body-sub-title'>choose yes, if we collect <br />advance amount</div>
              {advanceAmountView()}
            </div>


            {/* <UserDetails mode={viewMode} label='Member Name' value={memberDetails.memberName} onChange={(value) => onChangeMemberdetails('memberName',value)} />
              <UserDetails mode={viewMode} label='Mobile No' value={memberDetails.mobileNumber} onChange={(value) => onChangeMemberdetails('mobileNumber',value)} />
              <UserDetails mode={viewMode} label='Email ID' value={memberDetails.emailId} onChange={(value) => onChangeMemberdetails('emailId',value)} />
              <UserDetails mode={viewMode} label='Address' value={memberDetails.address} onChange={(value) => onChangeMemberdetails('address',value)}  />
              <UserDetails mode={viewMode} label='Blood Group' value={memberDetails.bloodGroup} onChange={(value) => onChangeMemberdetails('bloodGroup',value)}  />
              <UserDetails mode={viewMode} label='Gender' value={memberDetails.gender} onChange={(value) => onChangeMemberdetails('gender',value)} />
              <UserDetails mode={viewMode} label='Date of birth' value={memberDetails.dateOfBirth} onChange={(value) => onChangeMemberdetails('dateOfBirth',value)}  />
              <UserDetails mode={viewMode} label='Date of join' value={memberDetails.dateOfJoin} onChange={(value) => onChangeMemberdetails('dateOfJoin',value)} />
              <UserDetails mode={viewMode} label='Last payment date' value={memberDetails.lastPaymentDate} onChange={(value) => onChangeMemberdetails('lastPaymentDate',value)} /> */}
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