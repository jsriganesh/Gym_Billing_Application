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

export const MembersJoinReport = () => {
    const [membersChartDetails, setMembersChartDetails] = useState<BarCharDataProps>(barchartDefaultValue)
    const [selectedYear, setSelectedYear] = React.useState<any>(years[0]);
    const { planList, membersList } = useAppSelector((state) => state.commonData);
    const [selectedBarMembersList, setSelectedBarMembersList] = React.useState<MemberDetails[]>([]);

    const getMembersChartDetails = () => {
        console.log('selectedYear ===>', selectedYear)

        const datas = {
            fromDate: JSON.stringify(parseInt(selectedYear.value) - 1) + '-12-30T:18:30.00Z',
            toDate: selectedYear.value + '-12-30T:18:29.59Z'
        }

        console.log('datas ===>', datas)

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
    useEffect(() => {
        selectedYear && getMembersChartDetails()
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
                    <div style={{ height: '18rem' }}>
                        <BarChart
                            onClickBar={(month, count) => {
                                const findIndex = barchartDefaultValue.labels.findIndex((val) => val === month)
                                setSelectedBarMembersList(getNewJoinee(membersList, false, findIndex) as MemberDetails[])
                                console.log('-->>>,',getNewJoinee(membersList, false, findIndex))
                            }}
                            chartData={membersChartDetails} label={'Monthly Members Join'} backgroundColor={'rgb(249, 224, 61)'} />
                    </div>
                </div>
                <div style={{overflowY:'scroll',height:'100%'}}>
                    {
                        selectedBarMembersList.length > 0 ?
                            selectedBarMembersList.map((members) => {
                                return <div style={{marginBottom:'1rem'}}><MembershipCard selectedMember={members} /></div>
                            })
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
