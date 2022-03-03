import { Outlet, Route, Routes, useOutletContext } from 'react-router-dom';
import Add_Modify_Member from '../Add_Member/Add_Member';
import Create_Project from '../Create_Project/Create_Project';
import Create_Survey from '../Create_Survey/Create_Survey';
import Dashboard, { Dashboard_Landing } from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Members, { Members_Landing } from '../Members/Members';
import Projects, { Projects_Landing } from '../Projects/Projects';
import Settings from '../Settings/Settings';
import View_Survey from '../View_Survey/View_Survey';
import './App.css';

function App() {
  return (
    <div className='parent-screen'>
      {/* REMEBER TO USE useNavigate('/location',{ state: data}) TO PASS SOME STATE TO THE NEXT SCREEN */}
      {/* ALSO USE useLocation() to get the state passed */}
      {/* >>Protection from URL routing */}
      <Routes>
        <Route path='/' element={<div><Outlet/></div>}>
          <Route index element={<div>Hello</div>}/>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Dashboard_Landing/>}></Route>
            <Route path="projects" element={<Projects />}>
              <Route index element = {<Projects_Landing/>}/>
              <Route path='create-project' element = {<Create_Project/>}/>
              <Route path='create-survey/:pid' element = {<Create_Survey/>}/>
              <Route path='view-survey/:pid' element = {<View_Survey/>}/>
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
    </div>
  );
}

export default App;
