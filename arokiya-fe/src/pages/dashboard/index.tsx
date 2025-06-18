import React, { useEffect,useState } from 'react'
import BasicCards from '../../components/basicCards'
import './index.scss'
import PageLayout from '../../components/pagelayout'
import { getAllMembers, getAllPlanList } from '../../services/commonApiService'
import { useAppSelector } from '../../redux/store'
import { getFeesPendingMembers, getNewJoinee } from '../../commonMethod/commonMethods'
export default function Dashboard() {
  const { planList, membersList } = useAppSelector((state) => state.commonData);


    // const [cards,setCardDetails] = useState([])
    const cards = [
        {
            image: 'member',
            value: membersList.length,
            title: 'Member count',
            subCount: ''
        },
        {
            image: 'newJoin',
            value: getNewJoinee(membersList,true) as number,
            title: 'New member count',
            subCount: ''
        },
        {
            image: 'pending',
            value: getFeesPendingMembers(membersList,true) as number,
            title: 'Fees pending',
            subCount: ''
        },
        {
            image: 'salse',
            value: '200',
            title: 'Todays Salse',
            subCount: ''
        },
        {
            image: 'salse',
            value: '200',
            title: 'This Month Salse',
            subCount: ''
        }
    ]


    useEffect(() => {
        getAllPlanList()
        getAllMembers()
    }, [])

    return (
        <PageLayout>
            <div>
                {/* <div className='body-sub-title'>Totay's Report</div> */}
                <div className='dashboard-cardsRow'>
                    {
                        cards.map((data) => <BasicCards cardDetails={data} />)
                    }



                </div>
            </div>
        </PageLayout>
    )
}
