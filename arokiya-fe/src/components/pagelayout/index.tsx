import React from 'react'
import SideMenu from '../../components/sidemenu'
import Header from '../../components/header'
import './index.scss'

const PageLayout=(props:any)=> {
    return (
        <div className="App">
            <div className='Navigation-container'>
                <div className='sidemenu-container'><SideMenu /></div>
                <div className='body-container'>
                    <Header/>
                    <div className='dashboard-container'>
                        {props.children}
                    </div>
                </div>
            </div>
            
            <div className='application-footer'>

            </div>
        </div>

    )
}

export default  PageLayout