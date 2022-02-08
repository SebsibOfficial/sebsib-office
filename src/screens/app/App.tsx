import React from 'react';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import Sb_List_Item from '../../components/Sb_List_Item/Sb_List_Item';
import './App.css';

type actionType = "REMOVE" | "SELECT-CHANGE";

function App() {
  return (
    <div style={{width:'15em', margin:'5em'}}>
        <Sb_List_Item id='23' type='MEMBER' actionType='SELECT-CHANGE' text='First Name' 
        onAction={(id:string, actionType:actionType) => console.log("id: "+id+" action: "+actionType)}/>
    </div>
  );
}

export default App;
