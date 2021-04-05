import React, { useState, useContext, useEffect } from 'react'
import Context from '../assets/Context'
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import classnames from 'classnames';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
// import CompanyName from './CompanyName';
const Dates = [{
    id: 1,
    startDate: new Date("2020-11-28"),
    endDate: new Date("2021-02-14"),
    check: false,
    name:"first"
}, {
    id: 2,
    startDate: new Date("2020-11-28"),
    endDate: new Date("2020-02-12"),
    check: false,
    name:"second"
}, {
    id: 3,
    startDate: new Date("2020-11-28"),
    endDate: new Date("2021-04-05"),
    check: false,
    name:"third"
}
]


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function RdClaimPeriod() {
    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const { values, subsidiValues, setSubsidiValues,
        selectedDate, setSelectedDate,
        selectedFormDate, setSelectedFormDate, companyName
    } = useContext(Context)
    const [dateState, setDateState] = useState(false)
    const [dateValue, setDateValue] = useState(false)
    const [inputStart, setInputStart] = useState('')
    const [complete, setComplete] = useState(false)
    const [inputDateError, setInputDateError] = useState(false)
    const [dateErrorEnd, setDateErrorEnd] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [dateRange, setdateRange] = useState({
        startDate: selectedFormDate.startDate != null ? selectedFormDate.startDate : null,
        endDate: selectedFormDate.endDate != null ? selectedFormDate.endDate : null,
        focusedInput: START_DATE,
    });
    const [formState, setFormState] = useState({
        startDate: selectedFormDate.startDate != "" ? moment(selectedFormDate.startDate).format('L') : '',
        endDate: selectedFormDate.endDate != "" ? moment(selectedFormDate.endDate).format('L') : '',
    });

    const { startDate, endDate } = dateRange;

    const [focusedInput, setFocusedInput] = useState('startDate');
    const isDateIsValid = (dateString) => moment(dateString, 'DD / MM / YYYY', true).isValid();


    useEffect(() => {
        if (values === true && subsidiValues === true && formState.endDate != null) {
            var elmnt = document.getElementById("grantSubsidy");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
            // setSubsidiValues(true)
        }

    }, [formState.endDate && subsidiValues === true])

    useEffect(() => {
        if (dateError) {
            return (
                dateError
            )
        }
    }, [dateError, complete])


    const handleChange = (e, val) => {
        setInputDateError(false);
        setDateError(false);
        setFormState({
            startDate: '',
            endDate: '',
        })
        setdateRange({
            startDate: null,
            endDate: null,
            focusedInput: START_DATE,
        })
        setComplete(false);
        const dateCheck = Dates.map((data, id) => {
            if (data.name === e.target.name && data.check === false) {
                data.check = true
                setDateValue(data)
                setSelectedDate({ startDate: data.startDate, endDate: data.endDate })
                setComplete(true);
                return data
            } else {
                data.check = false
                setComplete(false);
                setSubsidiValues(false)
                return data;
            }
        })
        setDateState(dateCheck)
    }
    console.log("selectedFormDate", selectedDate, "LLLLLLLLLLLLLLLLLLL", moment(selectedFormDate.startDate).format('L'))
    let chek = false;
    const SubCond = endDate !== null ? endDate._isValid : false;
    const checkss = dateState && dateState.map((vals, id) => {
        if (vals.check === true || SubCond === true) {
            chek = vals.check
            setSubsidiValues(true)
            if (values === true && chek === true) {
                var elmnt = document.getElementById("grantSubsidy");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' }
                );
            }
        }
        else if (vals.check === false && chek === false) {
            chek = vals.check
            // setSubsidiValues(false)
        }
    })

    const handleStartDate = (e) => {
        const { name, value } = e.target

        var element = value;
        if (/\D\/$/.test(element)) element = element.substr(0, element.length - 3);
        var values = element.split('/').map(function (v) {
            return v.replace(/\D/g, '')
        });

        var output = values.map(function (v, i) {
            return v.length === 2 && i < 2 ? v + ' / ' : v;
        });
        const valset = output.join('').substr(0, 14)


        if (name === START_DATE && isDateIsValid(value)) {
            setInputDateError(false)
            setDateError(false);
            if (formState.startDate) {
                if (moment(formState.startDate, 'DD / MM / YYYY').diff(moment(value, 'DD / MM / YYYY')) >= 0) {
                    setDateError(false);
                } else {
                    setDateError(true);
                }
            }
            setdateRange((prevState) => ({ ...prevState, startDate: moment(value, 'DD / MM / YYYY') }));
            setSelectedFormDate((prevState) => ({ ...prevState, startDate: moment(value, 'DD / MM / YYYY') }))
        } else if (name === START_DATE && !isDateIsValid(value)) {
            setInputDateError(true)
            setDateError(false);
            setdateRange((prevState) => ({ ...prevState, startDate: '' }));
        }
        if (name === END_DATE && isDateIsValid(value)) {
            setInputDateError(false)
            if (formState.endDate) {
                if (moment(value, 'DD / MM / YYYY').diff(moment(formState.startDate, 'DD / MM / YYYY')) >= 0) {
                    setDateError(false);
                } else {
                    setDateError(true);
                }
            }
            setdateRange((prevState) => ({ ...prevState, endDate: moment(value, 'DD / MM / YYYY') }));
            setSelectedFormDate((prevState) => ({ ...prevState, endDate: moment(value, 'DD / MM / YYYY') }))
            setComplete(true);
        } else if (name === END_DATE && !isDateIsValid(value)) {
            setInputDateError(true)
            setDateError(false);
            setdateRange((prevState) => ({ ...prevState, endDate: '' }));
            setSubsidiValues(true)
        }
        setFormState((prevState) => ({ ...prevState, [name]: valset }));


    }
    useEffect(() => {
        if (values === false) {
            setFormState({
                startDate: '',
                endDate: '',
            })
            setdateRange({
                startDate: null,
                endDate: null,
                focusedInput: START_DATE,
            })
        }
    }, [values === false])

    const handleOnDateChange = ({ startDate, endDate }) => {
        formState.startDate = startDate ? moment(startDate._d).format("DD / MM / YYYY") : '';
        formState.endDate = endDate ? moment(endDate._d).format("DD / MM / YYYY") : '';
        setFormState(formState);
        if (endDate) {
            setComplete(true)
           
            setSubsidiValues(true)
        }
        setdateRange((prevState) => ({ ...prevState, startDate, endDate }));
        setSelectedFormDate((prevState) => ({ ...prevState, startDate: startDate, endDate: endDate }))
        if (moment(endDate, 'DD / MM / YYYY').diff(moment(startDate, 'DD / MM / YYYY')) >= 0) {
            setDateError(false);
        } else {
            setDateError(true);
        }


    }


    console.log("=========================", dateError)

    return (
        <div className={values === true ? " " : "opacity"}  >

            <div id="rdClaim" className=" row custom-m-top-40">
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                    <div className="tell-us-about-your-company-left-section">
                        <hr className="tell-us-about-your-company-line" />
                        <h3> Your R&D Claim Period</h3>
                        {
                            chek === true || complete === true && values != false ? <div className="completed-text"><span>COMPLETED</span></div> : null
                        }

                    </div>
                </div>
                <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                    <div className="tell-us-about-your-company-center-section">
                        <div className="tell-us-about-your-company-card-section">

                            <p>Please select the claim period you would like to
                            estimate your R&D claim for?
                            </p>

                            {
                                Dates && Dates.length >= 1 ? Dates.map((val, id) => {
                                    return (

                                        <div className={classnames("custom-checbox-1 tell-us-about-your-company-card-section-label", { "label-active": val.check && values })}>
                                            <span>Period {val.id}: {val.startDate.getDate()} {months[val.startDate.getMonth()]} {val.startDate.getFullYear()} To {val.endDate.getDate()} {months[val.endDate.getMonth()]} {val.endDate.getFullYear()}</span>
                                            <div className="cust-checkbox">
                                                <div className="custom-checkbox">
                                                    <input name={val.name}
                                                        className="checkbox-custom "
                                                        id={val.id}
                                                        type="checkbox"
                                                        checked={values === false ? false : val.check}
                                                        // disabled={dateValue.check === true ? !val.check : val.check}
                                                        onChange={(e) => { handleChange(e, val) }}
                                                    />
                                                    <label className="checkbox-custom-label" for={val.id}></label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }

                            <div className={chek === true ? "opacity" : " "}>
                                <p>Or manually enter claim period.</p>
                                <div className={`calendar-label-input-section ${dateError || inputDateError ? 'errorDateBorder' : ''}`}>
                                    <div className="calendar-label-input form-group">
                                        <label>Claim Period Start Date:</label>
                                        <div className="calendar-input-section">
                                            <input type="text"
                                                className="inp"
                                                id="s_id"
                                                name="startDate"
                                                value={formState.startDate}
                                                placeholder="DD/MM/YY"
                                                onChange={handleStartDate}
                                            />

                                            <span className="text-danger">{inputDateError === true ? "Invalid StartDate " : ""}</span>

                                        </div>
                                    </div>
                                    <div className="calendar-label-input form-group">
                                        <label>Claim Period End Date:</label>
                                        <div className="calendar-input-section">
                                            <input type="text"
                                                className="inp"
                                                id="e_id"
                                                name="endDate"
                                                value={formState.endDate}
                                                placeholder="DD/MM/YY"
                                                onChange={handleStartDate}
                                            />
                                            <span className="text-danger">{inputDateError === true ? "Invalid EndDate" : ""}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" text-center  text-danger"> {dateError === true ? "Given End Date Sooner than Start Date" : ""}</div>
                                <br />
                                <div id="exTab1" >
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#claim-start" role="tab" data-toggle="tab">Claim Period Start Date</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#claim-end" role="tab" data-toggle="tab">Claim Period End Date</a>
                                        </li>
                                    </ul>

                                    <DayPickerRangeController
                                        key={Math.random()}
                                        autoFocus
                                        daySize={40}
                                        className="Datezp8"
                                        horizontalMonthPadding={1}
                                        autoFocusEndDate={true}
                                        numberOfMonths={2}

                                        startDate={startDate}
                                        endDate={endDate}
                                        onDatesChange={handleOnDateChange}
                                        focusedInput={dateRange.focusedInput}
                                        onFocusChange={(focusedInput) => {
                                            setdateRange((prevState) => ({
                                                ...prevState,
                                                focusedInput: !focusedInput ? START_DATE : focusedInput,
                                            }));
                                        }}

                                    />

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                {
                    values === true && chek != true ? <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                        <div className="tell-us-about-your-company-right-section">
                            <hr className="tell-us-about-your-company-line1" />
                            <div className="tell-us-about-your-company-right-section-img">
                                <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                            </div>
                            <p>
                                We use Companies House publicly available data to retrieve information about your company. 
                                By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. 
                                If we cannot find your company details not to worry, you can continue to use the company name you entered above.
                           </p>


                        </div>
                    </div> : null
                }

            </div>
        </div>
    )
}

export default RdClaimPeriod
