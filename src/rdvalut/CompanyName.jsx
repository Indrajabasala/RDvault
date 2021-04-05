import React, { useState, useContext, useEffect } from 'react'
import Cdata from '../assets/Data'
import Context from '../assets/Context'
import Pagination from '../assets/Pagination'
import classnames from 'classnames';
function CompanyName(props) {
    console.log('data',Context)
    const { values, setValue, setValueNull, companyName, setCompanyName, scrollComp, handleState } = useContext(Context)
    const [inputFeild, setInputField] = useState(companyName.textEdit ? companyName.textEdit : "");
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)
    const [checkeds, setChecked] = useState(false);
    const [checkBoxValue, setCheckBoxValue] = useState();
    const [checkValue, setCheckValue] = useState(false);


    useEffect(() => {
        if (values === false || scrollComp === true) {
            var elmnt = document.getElementById("header");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
        }
    }, [values, scrollComp])

    console.log("companyName", companyName.textEdit)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleNext = (pageNumber) => {
        setCurrentPage(pageNumber + 1)
    }


    const handleChange = (event) => {
        //   const { name, value } = event.target
        setInputField(event.target.value);
        setCompanyName((prevState) => ({ ...prevState, textEdit: event.target.value }))

    }

    const dark = Cdata.filter((vals, id) => {
        // console.log("**********", checkBoxValue)
        return (
            vals.company.toLowerCase().includes(inputFeild)
        )
    })

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const listData = dark ? dark : 0
    const currentPost = listData && listData.length >= 1 ? listData.slice(indexOfFirstPage, indexOfLastPage) : 0



    let pageNumber = [];
    for (let i = 1; i <= Math.ceil(listData.length / postPerPage); i++) {
        pageNumber.push(i)
    }

    const handleCheck = (e, val) => {
        // e.preventDefault();

        const checkedData = listData.map((data, i) => {

            if (data.company === e.target.name && data.checks === false) {
                data.checks = true
                setCompanyName((prevState) => ({ ...prevState, companyName: e.target.name, scrollTrue: true }))
                console.log("open")
                return data;


            } else {
                data.checks = false
                console.log("close")
                return data;

            }

        })
        setChecked(checkedData);
        // setCheckValue(true)
    }

    let chek = false;
    const check = checkeds && checkeds.map((val, id) => {

        if (val.checks === true) {
            console.log("if")
            chek = val.checks
            setValue(chek)
            var elmnt = document.getElementById("rdClaim");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
        } else {
            console.log("else")
            setValueNull(false)
            setValue(chek)
        }

    })


    console.log("scrollComp111111111111111inputFeild", scrollComp)


    return (



        < div id="company" className="row custom-m-top-40" >
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-left-section">
                    <hr className="tell-us-about-your-company-line" />
                    <h3>  Company Name</h3>
                    {
                        chek === true ? <div className="completed-text"><span>COMPLETED</span></div> : null
                    }
                </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                    <div className="tell-us-about-your-company-card-section">
                        <div className="form-group">
                            <input
                                type="text"
                                name="companyName"
                                value={inputFeild}
                                id="enter_company_name"
                                onChange={handleChange}
                            />
                        </div>
                        {
                            inputFeild.length < 1 ?
                                <p>Please enter your company name above so we can have a look if we can find it!</p>
                                :
                                <p className="custom-m-top-20">We have found <span>{listData.length}</span> companies with this name, please try again or use the name entered in the box above.</p>
                        }

                        {
                            <div className="tell-us-about-your-company-card2 row">


                                {
                                    inputFeild.length >= 1 ? inputFeild.length >= 1 && currentPost.length >= 1 ? currentPost.map((val, i) => {
                                        console.log("++++------------+++++", val.company === inputFeild.company && val.checks === true)
                                        return (
                                            <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20 col-lg-6">
                                                <div className="tell-us-about-your-company-card2-width">
                                                    <div id={val.id} className={classnames("tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label", { "label-active": val.checks === true })}>
                                                        <div className="tell-us-about-your-company-card2-top">
                                                            <span>{val.company}</span>

                                                            <div className="cust-checkbox">
                                                                <div className="custom-checkbox">
                                                                    <input
                                                                        name={val.company}
                                                                        id={val._id}
                                                                        type="checkbox"
                                                                        className="checkbox-custom"
                                                                        checked={val.checks}
                                                                        onChange={(e) => handleCheck(e, val)}

                                                                    />
                                                                    <label className="checkbox-custom-label" for={val._id}></label >
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tell-us-about-your-company-card2-bottom">
                                                            <p>{val.address}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    }) : null : null
                                }


                                {

                                    inputFeild.length >= 1 && listData.length >= 5 ? <div className="col-lg-6">



                                        <div className="column-card-2-bottom-section">
                                            <div className="pagination-section">
                                                <span><label>{currentPage}</label>/<label>{pageNumber.length}</label></span>
                                            </div>
                                            <div className="next-back-section">

                                                {
                                                    currentPage === 1 ?
                                                        <label className="disabled-btn-bg" ><img className="left-arrow" src={process.env.PUBLIC_URL + "assets/images/left-arrow.png"} /><span>BACK</span></label>
                                                        :
                                                        <label onClick={() => { paginate(currentPage - 1) }} disabled={currentPage === 1}><img className="left-arrow" src={process.env.PUBLIC_URL + "assets/images/left-arrow.png"} /><span>BACK</span></label>
                                                }
                                                <b>|</b>
                                                {
                                                    currentPage === pageNumber.length ?
                                                        < label className="disabled-btn-bg"  ><span>NEXT</span><img className="right-arrow" src={process.env.PUBLIC_URL + "assets/images/right-arrow.png"} /></label>
                                                        :

                                                        < label onClick={() => { paginate(currentPage + 1) }} disabled={pageNumber <= currentPage} ><span>NEXT</span><img className="right-arrow" src={process.env.PUBLIC_URL + "assets/images/right-arrow.png"} /></label>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                        : null

                                }
                            </div>

                        }
                    </div>
                </div>

            </div>

            {
                chek != true  ? <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                    <div className="tell-us-about-your-company-right-section">
                        <hr className="tell-us-about-your-company-line1" />
                        <div className="tell-us-about-your-company-right-section-img">
                            <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                        </div>
                        <p>We use Companies House publicly
                        available data to retrieve information
                        about your company. By using Companies House data,
                        we can tell you exactly how many R&D claims you can
                        make for your company. If we cannot find your company details
                        not to worry, you can continue to use the company name you entered above.
                        </p>
                    </div>
                </div> : null
            }


        </div >



    )
   
}

export default CompanyName
