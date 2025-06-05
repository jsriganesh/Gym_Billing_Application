import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//       backgroundColor: 'black',
//       color: 'white',
//     },
//   });


import Datatable from '../../components/datatable';
import SideMenu from '../../components/sidemenu';
import Header from '../../components/header';
import './members.scss'
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/pagelayout';
// import PageLayout from '../../components/pageLayout';
// import CategoryAddAndEditModal from '../dashboard/createAndEditcategoryModal';

const Members = () => {
    const navigate = useNavigate();

    const classes = {
        minWidth: 650,
        backgroundColor: 'black',
        color: 'white',
    }

    //useStyles();
    const data = [
        { id: 1, column1: 'Data 1', column2: 'Data 2', column3: 'Data 3' },
        { id: 2, column1: 'Data 4', column2: 'Data 5', column3: 'Data 6' },
        // Add more data objects as needed
    ];

    return (
        <PageLayout>
            <div className="category-container">
                <h5 className='body-sub-title'>All members</h5>
                <Datatable />
            </div>
        </PageLayout>
    );
}
export default Members