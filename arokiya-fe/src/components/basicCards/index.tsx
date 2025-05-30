import React from 'react'
import '../basicCards/index.scss'


interface BasicCardsProps {
  cardDetails:{
    image: string;
    value: string;
    title: string;
    subCount: string;
}
}

const BasicCards =({cardDetails}:BasicCardsProps)=>{
  return (
    <div className='basic-details-card'>
        <div style={{fontSize:'0.8rem',color:'#FFFFFF'}}>{cardDetails.title}</div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'1.5rem',marginLeft:'1rem'}}>
            <img alt='member' src={require('../../assets/images/dashboard/membership.png')} style={{height:'2rem',width:'2rem'}}/>
            <div style={{fontSize:'1.2rem',color:'#FFFFFF',marginLeft:'0.5rem'}}>{cardDetails.value}</div>
        </div>
    </div>
  )
}


export default BasicCards