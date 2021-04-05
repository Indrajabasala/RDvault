import React, { useState, useContext, useEffect } from 'react'
import Context from '../assets/Context'
import classnames from 'classnames';
function GrantSubsideis() {
    const [scrollSub, setScrollSub] = useState(false);
    const { values, subsidiValues, companyName, rdExpenseValues, setRdExpenseValues, setCompanyName, scrollComp, setScrollComp, scrollCalend, setScrollCalend, setSubsidiValues } = useContext(Context)
    const [grantValTrue, setGrantValTrue] = useState(companyName.substidyYes ? companyName.substidyYes : false);
    const [grantValFalse, setGrantValFalse] = useState(companyName.substidyNo ? companyName.substidyNo : false);


    useEffect(() => {
        if (values && subsidiValues === false) {
            setGrantValTrue(false)
            setGrantValFalse(false)
        }
    }, [values && subsidiValues === false])

    useEffect(() => {
        if (scrollSub === true) {
            var elmnt = document.getElementById("rdexpense");
            elmnt.scrollIntoView(
                { behavior: 'smooth' });
        }

    }, [scrollSub])

    const handleNo = () => {
        if (grantValTrue === true && values && subsidiValues === true || grantValTrue === false && values && subsidiValues === true) {
            setGrantValFalse(true)
            setGrantValTrue(false)
            setRdExpenseValues(true)
            setScrollSub(true);
            // var elmnt = document.getElementById("rdexpense");
            // elmnt.scrollIntoView(
            //     { behavior: 'smooth' });
            setCompanyName((prevState) => ({ ...prevState, substidyNo: true }))
        } else {
            setGrantValTrue(false)
            setGrantValFalse(false)
        }

    }
    const handleYes = () => {
        if (values && subsidiValues === true && grantValFalse === true || values && subsidiValues === true && grantValFalse === false) {
            setGrantValTrue(true)
            setGrantValFalse(false)
            setRdExpenseValues(true)
            setScrollSub(true);
            // var elmnt = document.getElementById("rdexpense");
            // elmnt.scrollIntoView(
            //     { behavior: 'smooth' });
            setCompanyName((prevState) => ({ ...prevState, substidyYes: true }))
        } else {
            setGrantValTrue(false)
            setGrantValFalse(false)
        }

    }

    useEffect(() => {
        if (values && rdExpenseValues === true && values && subsidiValues === true) {

            if (scrollComp === true) {
                var elmnt = document.getElementById("company");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' });
                setScrollCalend(false)

            } else if (scrollCalend === true) {
                var elmnt = document.getElementById("rdClaim");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' });
                setScrollComp(false);
            }
            else {
                var elmnt = document.getElementById("rdexpense");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' });
            }

        }
    }, [grantValFalse, grantValTrue])
    console.log("subsit", grantValFalse, grantValTrue)
    return (
        <div id="grantSubsidy" className={values && subsidiValues === true ? " " : "opacity"}>
            <div className="grands_subsidies_section row custom-m-top-40">
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                    <div className="tell-us-about-your-company-left-section">
                        <hr className="tell-us-about-your-company-line" />
                        <h3> Grants & Subsidies</h3>
                        {
                            values && subsidiValues === true && grantValTrue === true || values && subsidiValues === true && grantValFalse === true ?
                                <div className="completed-text"><span>COMPLETED</span></div>
                                : null
                        }

                    </div>
                </div>
                <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                    <div className="tell-us-about-your-company-center-section">
                        <div className="tell-us-about-your-company-card-section">

                            <p className="custom-m-top-20">Has your company been in receipt of one or more Grants/Subsidies in this period?</p>
                            <div className="tell-us-about-your-company-card2">
                                <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20">
                                    <div className="tell-us-about-your-company-card2-width">
                                        <div className={classnames("tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label", { "label-active": values && subsidiValues != false ? grantValFalse : false })}>
                                            <div className="tell-us-about-your-company-card2-top">
                                                <span>NO</span>
                                                <div className="cust-checkbox">
                                                    <div className="custom-checkbox">
                                                        <input name="noti_6"
                                                            className="checkbox-custom"
                                                            id="noti_8" value="3"
                                                            type="checkbox"
                                                            checked={values && subsidiValues != false ? grantValFalse : false}
                                                            onChange={handleNo}
                                                        />
                                                        <label className="checkbox-custom-label" for="noti_8"></label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="tell-us-about-your-company-card2-width">
                                        <div className={classnames("tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label", { "label-active": values && subsidiValues != false ? grantValTrue : false })}>
                                            <div className="tell-us-about-your-company-card2-top">
                                                <span>Yes</span>
                                                <div className="cust-checkbox">
                                                    <div className="custom-checkbox">
                                                        <input
                                                            name="noti_6"
                                                            className="checkbox-custom"
                                                            id="noti_9" value="3"
                                                            type="checkbox"
                                                            checked={values && subsidiValues != false ? grantValTrue : false}
                                                            onChange={handleYes}
                                                        />
                                                        <label className="checkbox-custom-label" for="noti_9"></label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {
                    values && subsidiValues === true && grantValFalse != true && grantValTrue != true ? <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                        <div className="tell-us-about-your-company-right-section">
                            <hr className="tell-us-about-your-company-line1" />
                            <div className="tell-us-about-your-company-right-section-img">
                                <img src="assets/images/bulb-icon.png" />
                            </div>
                            <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above.
                         </p>

                        </div>
                    </div> : null
                }

            </div>
        </div>
    )
}

export default GrantSubsideis
