import React from 'react'
import SideMenu from '../../components/sidemenu'
import Header from '../../components/header'
import BasicCards from '../../components/basicCards'
import './index.scss'
import { useNavigate } from 'react-router-dom'

const PageLayout=(props:any)=> {
    const navigate = useNavigate();

    const sampleData = {
        image:'member',
        value:'200',
        title:'Member count',
        subCount:''
    }
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