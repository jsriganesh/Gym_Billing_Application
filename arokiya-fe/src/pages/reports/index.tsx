import React, { useEffect, useState } from 'react';


// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//       backgroundColor: 'black',
//       color: 'white',
//     },
//   });


import Datatable from '../../components/datatable';
import './members.scss'
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/pagelayout';
import { CommonButton } from '../../components/button';
import { useAppSelector } from '../../redux/store';
import { MemberDetails } from '../../interface/common';
import { getAllMembers, getAllPlanList } from '../../services/commonApiService';
import TabContainer from '../../components/tab';
import { Box } from '@mui/material';
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


    //useStyles();
    const handleChange = (newValue: number) => {
        console.log('handleChange =', newValue)
        upsateSelecetedTab(newValue);
      };
    
    
    return (
        <PageLayout>
            <div className="category-container">
                <div className='members-top-row'>
                    <div className='body-sub-title'>Over ALL Report</div>
                </div>
                <div style={{ height: '90%', width: "100%", overflowY: 'scroll' }}>
                <>
              <TabContainer handleChange={handleChange} selectedTab={selectedTab} tabList={[
                { label: 'Members Join Report', iconPosition: 'end' },
                { label: 'Revenu Report', iconPosition: 'end' },
                { label: 'Payment Report', iconPosition: 'end' },
              ]} />


              <CustomTabPanel value={selectedTab} index={0}>
                <div>
                  <img alt='logo' src={require('../../assets/images/comingsoon.jpg')} style={{ borderRadius: 100 }} />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={1}>
                
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
                </div>

            </div>
        </PageLayout>
    );
}
export default Reports