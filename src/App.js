import './App.css';
import React, { useState, useEffect } from "react";
import Header from './common/Header';
import Footer from './common/Footer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
const firebaseConfig = require("./firebase.config");


function App() {
  const [subDomain, setSubDomain] = useState(null)
  useEffect(()=>{
    const host = window.location.host
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    if(arr.length > 0) setSubDomain(arr[0])
  
  },[])
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Header></Header>
          <MainContainer></MainContainer>
          <Footer></Footer>
        </Router>
      </RecoilRoot>
    </div>
  );
}
export default App;
