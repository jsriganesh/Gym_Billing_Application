import React from 'react'
import '../basicCards/index.scss'


interface BasicCardsProps {
  cardDetails:{
    image: string;
    value: string | number;
    title: string;
    subCount: string;
}
}

const BasicCards =({cardDetails}:BasicCardsProps)=>{
  return (
    <div className='basic-details-card'>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:'1rem',color:'#FFFFFF',fontWeight:'bold'}}>{cardDetails.title}</div>
          <img alt='member' src={require( cardDetails.image==='pending' ? '../../assets/images/dashboard/pending.png' :
            cardDetails.image==='salse' ? '../../assets/images/dashboard/salse.png' : 
            cardDetails.image==='newJoin' ? '../../assets/images/dashboard/newJoin.png' : 
            '../../assets/images/dashboard/membership.png')} style={{height:'3rem',width:'3rem'}}/>
        </div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <div style={{fontSize:'1.5rem',color:'#FFFFFF',}}>{cardDetails.value}</div>
        </div>
    </div>
  )
}


export default BasicCards