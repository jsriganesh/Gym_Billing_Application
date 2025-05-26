import React from 'react'
import SideMenu from '../../components/sidemenu'

export default function Dashboard() {
    return (
        <div className="App">
            <div className='Navigation-container'>
                <div className='sidemenu-container'><SideMenu/></div>
                <div className='body-container'>{''}</div>
            </div>
            
            <div className='application-footer'>

            </div>
        </div>

    )
}
