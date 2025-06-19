import React, { useEffect,useState } from 'react'
import BasicCards from '../../components/basicCards'
import './index.scss'
import PageLayout from '../../components/pagelayout'
import { getAllMembers, getAllPlanList } from '../../services/commonApiService'
import { useAppSelector } from '../../redux/store'
import { converNumberToRupee, getFeesPendingMembers, getNewJoinee, getTodayDateRange } from '../../commonMethod/commonMethods'
import { BarChart } from '../../components/charts/barChart'
import { getRequest, postRequest } from '../../services/axiosService'
import { EndPoint } from '../../services/endPoint'
import { BarCharDataProps, PieCharDataProps } from '../../interface/common'
import { barchartDefaultValue } from '../../utils/constant'
import { PieChart } from '../../components/charts/pieChart'
import moment from 'moment'
export default function Dashboard() {
  const { planList, membersList } = useAppSelector((state) => state.commonData);
  const [paymentChartDetails, setPaymentChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
  const [membersChartDetails, setMembersChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
  const [membersPaymentChartDetails, setMembersPaymentChartDetails] = useState<PieCharDataProps>([])

  const [todaySalse, setTodaySalse] = useState<number>(0)
  const [thisMonthgSalse, setThisMonthSalse] = useState<number>(0)

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
            value: converNumberToRupee(todaySalse),
            title: 'Todays Salse',
            subCount: ''
        },
        {
            image: 'salse',
            value: converNumberToRupee(thisMonthgSalse),
            title: 'This Month Salse',
            subCount: ''
        }
    ]


    const getPaymentChartDetails = () => {
        const datas = {
          fromDate: '2024-12-30T:18:30.00Z',
          toDate: '2025-12-30T:18:29.59Z'
        }
        postRequest(EndPoint.paymentChartDetails,
          datas,
          (success) => {    
            if (success.data) {
              setPaymentChartDetails(success.data.data)
            } else {
              // setPaymentList([])
              // setTotalAmount(0)
            }
          },
          (error) => { console.log('error -->', error) },
        )
      }
      const getMembersPaymentChartDetails = () => {
        getRequest(EndPoint.membersPaymentChartDetails,
          (success) => {
            if (success.data) {
              setMembersPaymentChartDetails(success.data)
            } else {
            }
          },
          (error) => { console.log('error ', error) },
        )
    
      }
    
      const getMembersChartDetails = () => {
        const datas = {
            fromDate: '2024-12-30T:18:30.00Z',
            toDate: '2025-12-30T:18:29.59Z'
          }
    
    
        postRequest(EndPoint.membersChartDetails,
          datas,
          (success) => {
            if (success.data) {
              setMembersChartDetails(success.data)
    
            } else {
            }
          },
          (error) => { console.log('error -->', error) },
        )
    
      }
    
    
    //   const getTodaySalseReport = () => {

    //     const datas = getTodayDateRange()
    //     postRequest(EndPoint.paymentChartDetails,
    //       datas,
    //       (success) => {    
    //         console.log('success success -->', success)
    //         if (success.data) {
                
    //         //   setPaymentChartDetails(success.data.data)
    //         } else {
    //           // setPaymentList([])
    //           // setTotalAmount(0)
    //         }
    //       },
    //       (error) => { console.log('error -->', error) },
    //     )
    //   }
    
    const getTodaySalseReport = () => {

        const fromDate =  new Date()
        const clonedDate = new Date(fromDate.getTime()); // Clone using getTime()
        clonedDate.setDate(clonedDate.getDate() - 1);
        const datas =  {
            fromDate:moment(clonedDate).format('YYYY-MM-DD')+'T:18:30.00Z',
            toDate:moment(fromDate).format('YYYY-MM-DD')+'T:18:29.59Z'
        }

        // console.log('datas *******',datas)

        postRequest(EndPoint.paymentHistoryFilter,
            datas,
            (success) => {
                console.log('datas *******',success)

                if (success.paymentDetails.length > 0) {
                    // setTotalAmount(success.totalAmount)
                    setTodaySalse(success.totalAmount)
                } else {
                    // setPaymentList([])
                    // setTotalAmount(0)
                    setTodaySalse(0)
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }


    const getThisMonthSalseReport = () => {
        const today = new Date();
        const fromDate =  new Date(today.getFullYear(), today.getMonth(), 1);
        const clonedDate = new Date(fromDate.getTime()); // Clone using getTime()
        clonedDate.setDate(clonedDate.getDate() - 1);
        const datas =  {
            fromDate:moment(clonedDate).format('YYYY-MM-DD')+'T:18:30.00Z',
            toDate:moment(new Date(today)).format('YYYY-MM-DD')+'T:18:29.59Z'
        }

        // console.log('datas *******',datas)

        postRequest(EndPoint.paymentHistoryFilter,
            datas,
            (success) => {
                console.log('datas *******',success)

                if (success.paymentDetails.length > 0) {
                    // setTotalAmount(success.totalAmount)
                    setThisMonthSalse(success.totalAmount)
                } else {
                    // setPaymentList([])
                    // setTotalAmount(0)
                    setThisMonthSalse(0)
                }
            },
            (error) => { console.log('error -->', error) },
        )
    }


    useEffect(() => {
        getAllPlanList()
        getAllMembers()
        getPaymentChartDetails()
        getMembersChartDetails()
        getMembersPaymentChartDetails()   
        getTodaySalseReport()   
        getThisMonthSalseReport()  
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
                <div>
                    <div style={{width:'50%'}}>
                        <BarChart showCurrency chartData={paymentChartDetails} label={'Monthly salse'} backgroundColor={'rgb(61, 121, 249)'}/>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'row',marginTop:'2rem'}}>
                    <div style={{width:'50%'}}>
                        <BarChart chartData={membersChartDetails} label={'Monthly Members Join'} backgroundColor={'rgb(249, 224, 61)'}/>
                    </div>
                    <div style={{width:'25%',marginLeft:'10rem'}}>
                    <PieChart chartData = {membersPaymentChartDetails}/>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
