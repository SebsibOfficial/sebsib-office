import { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";
import Sb_Container from "../../components/Sb_Container/Sb_Container";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext } from "../../states/NotifContext";
import { EditSettings } from "../../utils/api";
import { decodeJWT } from "../../utils/helpers";

class SaveSettingsPayload {
  constructor (on: string, em: string, op: string, np: string, l: string) {
    this.name = on;
    this.email = em;
    this.Opassword = op;
    this.Npassword = np;
    this.lang = l;
  }
  name: string;
  email: string;
  Opassword: string;
  Npassword: string;
  lang: string;
}

export default function Settings () {
  let location = useLocation();
  let navigate = useNavigate();
  const {token, setAuthToken} = useAuth();
  const Notif = useContext(NotifContext);

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  

  /*############# STATES ############### */
  const [orgName, setOrgName] = useState(decodeJWT(token as string).org_name);
  const [email, setEmail] = useState(decodeJWT(token as string).email ?? "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [lang, setLang] = useState("ENGLISH");
  const [btnLoading, setBtnLoading] = useState(false);

  /*------------- METHODS -------------- */
  async function saveChanges () {
    setBtnLoading(true);
    var payload = new SaveSettingsPayload(orgName, email, oldPass, newPass, lang);
    var res = await EditSettings(decodeJWT(token as string).org, payload);
    if (res.code == 200) {
      setAuthToken(res.data.token);
      Notif?.setNotification({type: "OK", message: "Settings Updated", id:1});
      setBtnLoading(false);
    } else {
      console.log(res.data);
      Notif?.setNotification({code: res.code, type: "ERROR", message: res.data.message, id:1});
      setBtnLoading(false);
    }
  }

  return (
    <Col md="5">
      <Sb_Alert>Enter the organization details and settings you want to change, then click <b>Save Changes</b> to save you changes</Sb_Alert>
      <Sb_Text font={16} weight={500}>Credentials</Sb_Text>
      <Sb_Container className="p-3 mt-2 mb-2">
        <div style={{'width':'70%'}}>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Organization Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Your Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
						<Form.Label><Sb_Text font={16}>Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Old Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="password" placeholder="Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>New Password</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Password" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
					</Form.Group>
        </div>
      </Sb_Container>
      <Sb_Text font={16} weight={500}>General Settings</Sb_Text>
      <Sb_Container className="p-3 mt-2 mb-3">
        <div style={{'width':'70%'}}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Select"><Sb_Text font={16}>Language</Sb_Text></Form.Label>
            <Form.Select size="sm" id="Select" onChange={(e) => setLang(e.target.value)} value={lang} disabled={true}>
              <option value={"ENGLISH"}>English</option>
              <option value={"AMHARIC"}>አማርኛ</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Sb_Container>
      <Button size="sm" style={{'float':'right'}} onClick={() => saveChanges()}>
        <Sb_Text font={12} color="--lightGrey">Save Changes</Sb_Text>
      </Button>
    </Col>
  )
}