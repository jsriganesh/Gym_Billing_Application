import React from 'react'
import SideMenu from '../../components/sidemenu'
import Header from '../../components/header'
import BasicCards from '../../components/basicCards'
import './index.scss'
export default function Dashboard() {
    const sampleData = {
        image:'member',
        value:'200',
        title:'Member count',
        subCount:''
    }
    return (
        <div className="App">
            <div className='Navigation-container'>
                <div className='sidemenu-container'><SideMenu/></div>
                <div className='body-container'>
                    <Header/>
                    <div className='dashboard-container'>
                        <div>
                            <h5 className='dashboard-sub-title'>Totay's Report</h5>
                            <div className='dashboard-cardsRow'>
                            <BasicCards cardDetails={sampleData}/>
                            <BasicCards cardDetails={sampleData}/>
                            <BasicCards cardDetails={sampleData}/>
                            <BasicCards cardDetails={sampleData}/>
                            <BasicCards cardDetails={sampleData}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='application-footer'>

            </div>
        </div>

    )
}
