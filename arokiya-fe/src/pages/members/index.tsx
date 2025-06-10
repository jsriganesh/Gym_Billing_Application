import React from 'react';


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
import CommonButton from '../../components/button';
// import PageLayout from '../../components/pageLayout';
// import CategoryAddAndEditModal from '../dashboard/createAndEditcategoryModal';

const Members = () => {
    const navigate = useNavigate();

    //useStyles();

    return (
        <PageLayout>
            <div className="category-container">
                <div className='members-top-row'>
                <div className='body-sub-title'>All members</div>
                <CommonButton handleClick={()=>navigate('/memberDetails',{state: {isCreateMember:true}})} label='Add Member'/>
                </div>
                <Datatable />

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