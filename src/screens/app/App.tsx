import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_List_Item from '../../components/Sb_List_Item/Sb_List_Item';
import './App.css';

type actionType = "REMOVE" | "SELECT-CHANGE";

function App() {
  return (
    <div className='login-parent-screen'>
      <div className='d-flex login-screen'>
        <Row>
          <Col>
            <img src={logo} alt="Logo" />
          </Col>
        </Row>
        <Row>
          
        </Row>
      </div>
    </div>
  );
}

export default App;
