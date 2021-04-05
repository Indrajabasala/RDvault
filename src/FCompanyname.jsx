import React,{useState} from 'react';
import {Data} from './Array'
import ReactDOM from 'react-dom';

function Companyname({executeScroll}) {
    const[filterState,setFilterState]=useState([]);
    const[countStatus,setCountStatus]=useState(false);
    const[page, setPage] = useState(1);
    const[range, setRange] =useState(7);
    const myRef = React.createRef();
   

    const handleChange=(e)=> {
      if(e.target.value === ""){
        setFilterState([]);
        setCountStatus(false)
      }else{
        let value = e.target.value;
        let filtered=Data.filter(x => x.comapnyName.includes(value));
        setFilterState(filtered || []);
        setCountStatus(true)
      }
    }

return(
  <div >
  
<div className="row custom-m-top-40">
  <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
    <div className="tell-us-about-your-company-left-section">
      <hr className="tell-us-about-your-company-line"/>  
<h3>  Company Name</h3>
</div>
</div>
<div className="col-md-3 col-xl-6 col-lg-6 col-sm-6 col-12">
<div className="tell-us-about-your-company-center-section">
  <div className="tell-us-about-your-company-card-section">
    <div className="tell-us-about-your-company-card-section-label">
     
      {/* <input type='text' onChange={handleChange}/> */}
      <input type="text" id="myInput" onChange={handleChange}  placeholder="Search for company .." title="Type in a name"/>

     
      <div className="cust-checkbox">
        <div className="custom-checkbox">
          <input name="noti_6" className="checkbox-custom" id="noti_2" value="2"  type="checkbox" />
          <label className="checkbox-custom-label" for="noti_2">I’d like  this name</label>
        </div>
      </div>
    </div>
    {!countStatus ?  
    <p>Please enter your company name above so we can have a
          look if we can find it!</p> :
    <p className="custom-m-top-20">We found <span>{filterState ? filterState.length : 0}</span> companies with this name, please try
      again or use the name entered in the box above.</p> }
      <div className="tell-us-about-your-company-card2">
      <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20">
    
     

{filterState && filterState.map((each, i) => {
    return(
          <div className="tell-us-about-your-company-card2-width">
        <div className="tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label">
          <div className="tell-us-about-your-company-card2-top">
          <span>{each.comapnyName}</span> 
          <div className="cust-checkbox">
            <div className="custom-checkbox">
              <input name="noti_6" className="checkbox-custom" id={each.comapnyName+i} value="3"  onClick={()=>executeScroll()} type="checkbox" />
              <label className="checkbox-custom-label" for={each.comapnyName+i}></label>
            </div>
          </div>
        </div>
        <div className="tell-us-about-your-company-card2-bottom">
          <p>{each.discription}</p>
        </div>
        
        </div>
      </div>
     )
})}
         <br/> <br/><br/> <br/>
        <div className="column-card-2-bottom-section">
        <div className="pagination-section">
          <span><label>1</label>/<label>7</label></span>
        </div>
           
        <div className="next-back-section">
      
          <label className="disabled-btn-bg"><img className="left-arrow" src="assets/images/left-arrow.png"/> 
         
          <span> BACK </span> </label>
          <label> <span>NEXT</span>  <img className="right-arrow" src="assets/images/right-arrow.png"/></label>
          
        </div>
        </div>
      </div>
      </div>
    </div>
 
</div>
</div>
</div>
</div>

)
}


export default  Companyname