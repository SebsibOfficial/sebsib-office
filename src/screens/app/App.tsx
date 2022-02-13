import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_List_Item from '../../components/Sb_List_Item/Sb_List_Item';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import './App.css';

type actionType = "REMOVE" | "SELECT-CHANGE";

function App() {
  return (
    <div className='parent-screen'>
      <Dashboard/>
    </div>
  );
}

export default App;
