import {
  Link,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import Add_Modify_Member from "../Add_Member/Add_Member";
import Create_Project from "../Create_Project/Create_Project";
import Create_Survey from "../Create_Survey/Create_Survey";
import Dashboard, { Dashboard_Landing } from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Members, { Members_Landing } from "../Members/Members";
import Projects, { Projects_Landing } from "../Projects/Projects";
import Settings from "../Settings/Settings";
import View_Survey from "../View_Survey/View_Survey";
import { NotifProvider } from "../../states/NotifContext";
import "./App.css";
import axios from "axios";
import { AuthContext } from "../../states/AuthContext";
import { CriticalContext } from "../../states/CriticalContext";
import useLocalStorageState from "use-local-storage-state";
import { decodeJWT } from "../../utils/helpers";
import Landing from "../Landing/Landing";
import Pricing from "../Landing/Pricing/Pricing";
import Register from "../Landing/Register/Register";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-es";
import { useTranslation } from "react-i18next";
import NotFound from "../404/404";
import Renew from "../Landing/Register/Renew";
import Change from "../Login/Change";
import Forgot from "../Login/Forgot";
import Help from "../Help/Help";
import Blogs from "../Blog/Blogs";
import SingleBlog from "../Blog/SingleBlog";
import Survey_Choice from "../Survey_Choice/Survey_Choice";
import Create_Online_Survey from "../Create_Online_Survey/Create_Online_Survey";
import Create_Survey_V2 from "../Create_Survey_V2/Create_Survey_V2";
import Edit_Survey from "../Edit_Survey/Edit_Survey";
import Shared from "../Shared/Shared";

function App() {
  const [token, setAuthToken] = useLocalStorageState<string>("token");
  const [page, setCriticalpage] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("sebsib");
  }, [t]);

  const header = JSON.stringify({
    PLATFORM_ID: "SEBSIB_OFFICE_1",
    JWT: token as string,
  });

  const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_PRIVATE_KEY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV);

  var cipher = CryptoJS.AES.encrypt(header, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
  });

  axios.defaults.headers.common["Authorization"] = cipher as any;

  function toWhere() {
    if (token == "") return "/login";
    else if (decodeJWT(token as string).exp < new Date().getTime() / 1000) {
      setAuthToken("");
      return "/login";
    } else {
      return "/dashboard";
    }
  }

  return (
    <div className="parent-screen">
      <AuthContext.Provider value={{ token, setAuthToken }}>
        <CriticalContext.Provider value={{ page, setCriticalpage }}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Outlet />
                </div>
              }
            >
              {/* <Route index element={<div>Hello<br></br><Link to={toWhere()} state={true}>Login</Link></div>}/> */}
              <Route index element={<Landing />} />
              <Route path="pricing" element={<Pricing />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="renewal" element={<Renew />}></Route>
              <Route path="contact" element={<div>Contact</div>}></Route>
              <Route
                path="dashboard"
                element={
                  <NotifProvider>
                    <Dashboard />
                  </NotifProvider>
                }
              >
                <Route index element={<Dashboard_Landing />}></Route>
                <Route path="projects" element={<Projects />}>
                  <Route index element={<Projects_Landing />} />
                  <Route path="create-project" element={<Create_Project />} />
                  <Route path="create-survey" element={<Survey_Choice />} />
                  {/* <Route path="create-survey/:pid" element={<Create_Survey />} /> */}
                  <Route path="edit-survey/:sid" element={<Edit_Survey />} />
                  <Route path="create-new-survey/:pid" element={<Create_Survey_V2 />} />
                  <Route path="create-online-survey/:pid" element={<Create_Online_Survey />} />
                  <Route path="view-survey/:sid" element={<View_Survey />} />
                </Route>
                <Route path="members" element={<Members />}>
                  <Route index element={<Members_Landing />} />
                  <Route path="add-member" element={<Add_Modify_Member pageType="ADD" />}/>
                  <Route path="edit-member/:id" element={<Add_Modify_Member pageType="EDIT" />}/>
                </Route>
                <Route path="shared-surveys" element={<Shared />}></Route>
                <Route path="shared-surveys/view-survey/:sid" element={<View_Survey />}></Route>
                <Route path="settings" element={<Settings />}></Route>
                <Route path="help" element={<Help />}></Route>
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="changepassword" element={<Change />} />
              <Route path="forgotpassword" element={<Forgot />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<SingleBlog />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CriticalContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
