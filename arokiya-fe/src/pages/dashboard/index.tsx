import React, { useEffect } from 'react'
import BasicCards from '../../components/basicCards'
import './index.scss'
import PageLayout from '../../components/pagelayout'
import { getAllPlanList } from '../../services/commonApiService'
export default function Dashboard() {

    const sampleData = {
        image: 'member',
        value: '200',
        title: 'Member count',
        subCount: ''
    }

    useEffect(()=>{
        getAllPlanList()
    },[])

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
