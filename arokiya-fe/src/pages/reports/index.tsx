import React, { useEffect, useState } from 'react';
import './index.scss'


// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//       backgroundColor: 'black',
//       color: 'white',
//     },
//   });


import Datatable from '../../components/datatable';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/pagelayout';
import { CommonButton } from '../../components/button';
import { useAppSelector } from '../../redux/store';
import { MemberDetails } from '../../interface/common';
import { getAllMembers, getAllPlanList } from '../../services/commonApiService';
import TabContainer from '../../components/tab';
import { Box } from '@mui/material';
import WebcamCapture from '../../components/webcamCapture';
import { MembersJoinReport } from './membersJoinReport';
import { PaymentReport } from './paymentReports';
import { RevenuReport } from './RevenuReport';
// import PageLayout from '../../components/pageLayout';
// import CategoryAddAndEditModal from '../dashboard/createAndEditcategoryModal';

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
const Reports = () => {
    const navigate = useNavigate();

    const { membersList } = useAppSelector((state) => state.commonData);
  const [selectedTab, upsateSelecetedTab] = React.useState(0);

  useEffect(()=>{
getAllMembers()
  },[])

    //useStyles();
    const handleChange = (newValue: number) => {
        console.log('handleChange =', newValue)
        upsateSelecetedTab(newValue);
      };
    
    
    return (
        <PageLayout>
            <div className="category-container over-all-report">
                <div className='members-top-row'>
                    <div className='body-sub-title'>Over All Report</div>
                </div>
                <div style={{ height: '90%', width: "100%", }}>

              <TabContainer  handleChange={handleChange} selectedTab={selectedTab} tabList={[
                { label: 'Members Join Report', iconPosition: 'end' },
                { label: 'Revenu Report', iconPosition: 'end' },
                { label: 'Payment Report', iconPosition: 'end' },
              ]} />

              <CustomTabPanel value={selectedTab} index={0} >
                <div style={{height:'100%'}}>
                <MembersJoinReport/>
                </div>
              </CustomTabPanel>
            
              <CustomTabPanel value={selectedTab} index={1}>
              <div style={{height:'100%'}}>
                <RevenuReport/>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={2}>
              <div style={{height:'100%'}}>
                <PaymentReport/>
                </div>
              </CustomTabPanel>
              </div>
            </div>
        </PageLayout>
    );
}
export default Reports