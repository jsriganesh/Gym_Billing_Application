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
import {CommonButton} from '../../components/button';
import { useAppSelector } from '../../redux/store';
import { MemberDetails } from '../../interface/common';
import { getAllMembers, getAllPlanList } from '../../services/commonApiService';
// import PageLayout from '../../components/pageLayout';
// import CategoryAddAndEditModal from '../dashboard/createAndEditcategoryModal';

const Members = () => {
    const navigate = useNavigate();

      const { membersList } = useAppSelector((state) => state.commonData);
    
    console.log('membersList ====',membersList)
    

    const [allMembers,setAllMembers]=useState<MemberDetails[]| []>(membersList)

        useEffect(()=>{
            getAllPlanList()
            getAllMembers()
        },[])

        useEffect(()=>{
            // setAllMembers([...allMembers])
        },[allMembers])
    

    //useStyles();

    return (
        <PageLayout>
            <div className="category-container">
                <div className='members-top-row'>
                <div className='body-sub-title'>All members</div>
                <CommonButton handleClick={()=>navigate('/memberDetails',{state: {isCreateMember:true}})} label='Add Member'/>
                </div>
                <Datatable data={allMembers}/>

                {/* <div style={{
                    borderRadius:100,
                    backgroundColor:'pink',
                    height:100,
                    width:100,
                    bottom:0,
                    right:0
                }}></div> */}
            </div>
        </PageLayout>
    );
}
export default Members