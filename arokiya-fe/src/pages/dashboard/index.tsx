import React from 'react'
import SideMenu from '../../components/sidemenu'
import Header from '../../components/header'
import BasicCards from '../../components/basicCards'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/pagelayout'
export default function Dashboard() {
    const navigate = useNavigate();

    const sampleData = {
        image: 'member',
        value: '200',
        title: 'Member count',
        subCount: ''
    }
    return (
        <PageLayout>
            <div>
                <div className='body-sub-title'>Totay's Report</div>
                <div className='dashboard-cardsRow'>
                    <BasicCards cardDetails={sampleData} />
                    <BasicCards cardDetails={sampleData} />
                    <BasicCards cardDetails={sampleData} />
                    <BasicCards cardDetails={sampleData} />
                    <BasicCards cardDetails={sampleData} />

                </div>
            </div>
        </PageLayout>
    )
}
