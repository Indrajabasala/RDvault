import React from "react"
import './App.css';
import { Route, Switch } from "react-router-dom";
import {Router} from 'react-router-dom'
import Header from '../src/assets/Header'
import Body from './rdvalut/RDvalutmain'
import Context from './assets/Context'
import Footer from './assets/Footer'
// import YourRDClaimAndEstimate from './rdvalut/YourRDClaimAndEstimate'
function App() {
  const [values, setValue] = React.useState(false);
  const [subsidiValues, setSubsidiValues] = React.useState(false);
  const [rdExpenseValues, setRdExpenseValues] = React.useState(false);
  const [valueNull, setValueNull] = React.useState(false);
  const [companyName, setCompanyName] = React.useState({
    companyName: "",
    textEdit: "",
    substidyYes: "",
    substidyNo: "",
    scrollTrue: false
  });
  const [scrollComp, setScrollComp] = React.useState(false);
  const [scrollCalend, setScrollCalend] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState({
    startDate: "",
    endDate: ""
  });
  const [selectedFormDate, setSelectedFormDate] = React.useState({
    startDate: "",
    endDate: ""
  });
  const [handleState, setHandleState] = React.useState("")


  return (
    <div >
      {/* <Router>
      <Route> */}

        <Context.Provider value={{
          values, setValue,
          subsidiValues, setSubsidiValues,
          rdExpenseValues, setRdExpenseValues,
          valueNull, setValueNull,
          companyName, setCompanyName,
          selectedDate, setSelectedDate,
          selectedFormDate, setSelectedFormDate,
          handleState, setHandleState,
          scrollComp, setScrollComp,
          scrollCalend, setScrollCalend
        }}>
          <Header />
        
                <Body />
                </Context.Provider> 


    </div>
  );
}

export default App;
