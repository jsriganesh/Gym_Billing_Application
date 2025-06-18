// SearchBar.tsx

import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { PaymentHistoryDetails } from '../../interface/common';
import dayjs from 'dayjs';

interface props{
  data :PaymentHistoryDetails
}

const PaymentHistoryCard=({data}:props)=> {
    return (
        <div style={{flexDirection:'row',display:'flex',backgroundColor:'#464545',borderRadius:5,justifyContent:'space-between',padding:'1rem',color:'white',marginBottom:'1rem'}}>
                  <div style={{width:'18%'}}>
                    <div style={{fontSize:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>{'Payment ID:'}</div>
                    <div className=''>{data.paymentID}</div>
                  </div>
                  <div style={{width:'18%'}}>
                    <div style={{fontSize:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>{'Paid Date'}</div>
                    <div className=''>{dayjs(data.paidDate).format('DD-MM-YYYY')}</div>
                  </div>
                  <div style={{width:'18%'}}>
                    <div style={{fontSize:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>{'Paid Amount'}</div>
                    <div className=''>{data.paidAmount}</div>
                  </div>
                  <div style={{width:'18%'}}>
                    <div style={{fontSize:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>{'Payment type:'}</div>
                    <div className=''>{data.paidMethod}</div>
                  </div>
                  <div style={{width:'28%'}}>
                    <div style={{fontSize:'1rem',fontWeight:'bold',marginBottom:'0.5rem'}}>{'Comments:'}</div>
                    <div className=''>{data.comments || '-'}</div>
                  </div>
                </div>
    );
}

export default PaymentHistoryCard