import React, { useState, useContext } from 'react'
// import Cdata from "../../components/Cdata"
import Context from '../assets/Context'
import Pagination from '../assets/Pagination'
import CompanyName from './CompanyName'
import RdClaimPeriod from './RdClaimPeriod'
import GrantSubsideis from './Grantsubsideis'
import RdExpenses from './RdExpenses'
function Body(props) {
    const { values, setValue } = useContext(Context)


    console.log("values", values)



    return (
        <div>

            <section class="tell-us-about-your-company">
                <div className="container-fluid">
                    <div className="tell-us-about-your-company-section">
                        <CompanyName />
                        <RdClaimPeriod />
                        <GrantSubsideis />
                        <RdExpenses />
                    </div>
                </div>
            </section >

        </div >
    )
}

export default Body
