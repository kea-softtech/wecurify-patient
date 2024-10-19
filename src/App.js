import './App.css';
import React, { useState, useEffect } from "react";
import Header from './common/Header';
import Footer from './common/Footer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';
const firebaseConfig = require("./firebase.config");


function App() {
  const [subDomain, setSubDomain] = useState(null)

  useEffect(()=>{
    firebaseConfig.generateToken();
    firebaseConfig.listenForMessages(firebaseConfig.messaging, (payload) => {
      toast(payload.notification.body)
    })


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      })
    }

    const host = window.location.host
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    if(arr.length > 0) setSubDomain(arr[0])
  },[])


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}
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
