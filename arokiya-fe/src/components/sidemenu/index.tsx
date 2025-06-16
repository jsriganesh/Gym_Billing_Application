import React from 'react'

import './index.scss'
import { NavigateFunction, useNavigate } from 'react-router-dom';


interface SideMenuProps {
}


const SideMenu = ({
}: SideMenuProps) => {
  const navigate = useNavigate();

  const renderLogo = () => {
    return (
      <div className='logo-constiner'>
        <div><img alt='logo' src={require('../../assets/images/logo/logo.png')} className='logo-style' /></div>
        <div><img alt='logo-txt' src={require('../../assets/images/logo/logo_text.png')} className='logo-text' /></div>
      </div>

    )
  }


  const renderUserInfo = () => {
    return (
      <div className='user-constiner'>
        <div><img alt='profile-logo' src={require('../../assets/images/sample_user_images/user1.png')} className='logo-style' /></div>
        <div>
          <div><label className='profile-name'>{'Abdhul Rahim'}</label></div>
          <div><label className='email-name'>{'abdhulrahim123gmail.com'}</label></div>
        </div>
      </div>

    )
  }

  return (
    <div className='sidemenu'>
      {renderLogo()}
      {renderUserInfo()}
      <div className='underline' />

      <div>
        <div className='side-menu__list' onClick={() => { console.log('1') }}>
          <div ><img className='side-menu__list--icon' alt='Dashboard' src={require('../../assets/images/sidemenu/dashboard.png')} /></div>
          <div className='side-menu__list--text' onClick={() => navigate('/dashboard')}>{'Dashboard'}</div>
        </div>

        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Members' src={require('../../assets/images/sidemenu/members.png')} /></div>
          <div className='side-menu__list--text' onClick={() => navigate('/members')}>{'Members'}</div>
        </div>

        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Plan' src={require('../../assets/images/sidemenu/members.png')} /></div>
          <div className='side-menu__list--text' onClick={() => navigate('/planlist')}>{'Plan List'}</div>
        </div>

        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Report' src={require('../../assets/images/sidemenu/report.png')} /></div>
          <div className='side-menu__list--text'>{'Report'}</div>
        </div>
        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Activity' src={require('../../assets/images/sidemenu/activity.png')} /></div>
          <div className='side-menu__list--text'>{'Activity'}</div>
        </div>
        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Services' src={require('../../assets/images/sidemenu/services.png')} /></div>
          <div className='side-menu__list--text'>{'Services'}</div>
        </div>
        <div className='side-menu__list'>
          <div ><img className='side-menu__list--icon' alt='Dashboard' src={require('../../assets/images/sidemenu/dashboard.png')} /></div>
          <div className='side-menu__list--text'>{'Dashboard'}</div>
        </div>
      </div>

    </div>
  )
}

export default SideMenu