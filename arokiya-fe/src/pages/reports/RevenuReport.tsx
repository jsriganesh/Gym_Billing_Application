import React, { useEffect, useState } from 'react'
import { BarChart } from '../../components/charts/barChart'
import { BarCharDataProps, MemberDetails } from '../../interface/common'
import { barchartDefaultValue, years } from '../../utils/constant'
import { postRequest } from '../../services/axiosService'
import { EndPoint } from '../../services/endPoint'
import AutoCompleteDropDown from '../../components/autoCompleteDropDown'
import { getNewJoinee } from '../../commonMethod/commonMethods'
import { useAppSelector } from '../../redux/store'
import MembershipCard from '../../components/membershipCard'

export const RevenuReport = () => {
    const [membersChartDetails, setMembersChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
    const [selectedYear, setSelectedYear] = React.useState<any>(years[0]);
    const { planList, membersList } = useAppSelector((state) => state.commonData);
    const [selectedBarMembersList, setSelectedBarMembersList] = React.useState<MemberDetails[]>([]);
  const [paymentChartDetails, setPaymentChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)


        const getPaymentChartDetails = () => {
            const datas = {
                fromDate: JSON.stringify(parseInt(selectedYear.value) - 1) + '-12-30T:18:30.00Z',
                toDate: selectedYear.value + '-12-30T:18:29.59Z'
            }
    
            postRequest(EndPoint.paymentChartDetails,
              datas,
              (success) => {    
                if (success.data) {
                  setPaymentChartDetails(success.data.data)
                } else {
                    setPaymentChartDetails(barchartDefaultValue)
                  // setPaymentList([])
                  // setTotalAmount(0)
                }
              },
              (error) => { console.log('error -->', error) },
            )
          }
    useEffect(() => {
        selectedYear && getPaymentChartDetails()
    }, [selectedYear])


    const renderYearView = () => {
        return (
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <div>
                    <div style={{ color: '#ffffff', fontSize: '1.2rem' }} className='lable-style'>Select year</div>
                </div>
                <div>
                    <AutoCompleteDropDown width={300} options={years} mode={'editable'} label='Year' value={selectedYear} onChange={(value) => { setSelectedYear(value) }} />
                </div>
            </div>
        )
    }

    return (
        <div style={{height:'100%'}}>
            <div style={{flexDirection:'row',display:'flex',height:'100%'}}>
                <div style={{width:'50%'}}>
                    {renderYearView()}
                    <div style={{ height: '29rem' }}>
                        <BarChart
                            showCurrency
                            chartData={paymentChartDetails} label={'Revenu Report'} backgroundColor={'rgb(61, 121, 249)'} />
                    </div>
                </div>
                {/* <div style={{overflowY:'scroll',height:'100%'}}>
                    {
                        selectedBarMembersList.length > 0 ?
                            selectedBarMembersList.map((members) => {
                                return <div style={{marginBottom:'1rem'}}><MembershipCard selectedMember={members} /></div>
                            })
                            : null
                    }
                </div> */}
            </div>
        </div>
    )
}
