import { Link, Outlet, Route, Routes, useOutletContext } from 'react-router-dom';
import Add_Modify_Member from '../Add_Member/Add_Member';
import Create_Project from '../Create_Project/Create_Project';
import Create_Survey from '../Create_Survey/Create_Survey';
import Dashboard, { Dashboard_Landing } from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Members, { Members_Landing } from '../Members/Members';
import Projects, { Projects_Landing } from '../Projects/Projects';
import Settings from '../Settings/Settings';
import View_Survey from '../View_Survey/View_Survey';
import { NotifProvider } from '../../states/NotifContext';
import './App.css';
import axios from 'axios';
import {AuthContext} from '../../states/AuthContext';
import { useContext, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { decodeJWT } from '../../utils/helpers';

function App() {
  const [token, setAuthToken] = useLocalStorageState<string>('token', );  
  axios.defaults.headers.common['auth-token'] = token as string;

  function toWhere () {
    if (token == "")
      return "/login";
    else if (decodeJWT(token as string).exp < new Date().getTime() / 1000) {
      setAuthToken(""); return "/login";
    }
    else {
      return "/dashboard";
    }
  }

  return (
    <div className='parent-screen'>
      <AuthContext.Provider value={{token, setAuthToken}}>
      <Routes>
        <Route path='/' element={<div><Outlet/></div>}>
          {/* WHAT YOU DID HERE DOES NOT LOOK SAFE....WATCH OUT */}
          <Route index element={<div>Hello<br></br>
          {/* <Link to={
            token == "" || decodeJWT(token as string).exp < new Date().getTime() / 1000 ?  "/login" : "/dashboard"
            } state={true}>Login</Link></div>}/> */}
          <Link to={toWhere()} state={true}>Login</Link></div>}/>
            <Route path="dashboard" element={<NotifProvider><Dashboard /></NotifProvider>}>
              <Route index element={<Dashboard_Landing/>}></Route>
              <Route path="projects" element={<Projects />}>
                <Route index element = {<Projects_Landing/>}/>
                <Route path='create-project' element = {<Create_Project/>}/>
                <Route path='create-survey/:pid' element = {<Create_Survey/>}/>
                <Route path='view-survey/:sid' element = {<View_Survey/>}/>
              </Route>
              <Route path="members" element={<Members />}>
                <Route index element = {<Members_Landing/>}/>
                <Route path='add-member' element = {<Add_Modify_Member pageType='ADD'/>}/>
                <Route path='edit-member/:id' element = {<Add_Modify_Member pageType='EDIT'/>}/>
              </Route>
              <Route path="settings" element={<Settings />}></Route>
            </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>404 innit</p></main>}/>
        </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
