import { faCheckCircle, faIdBadge, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_Card from '../../components/Sb_Card/Sb_Card';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { ChangePass, login, ResponseInterface } from '../../utils/api';
import { AuthContext, useAuth } from '../../states/AuthContext';
import './Login.css';
import Sb_Loader from '../../components/Sb_Loader';
import { translateIds } from '../../utils/helpers';

interface StateInterface {
	hash: string,
	key: string,
	pathname: string,
	search: string,
	state: {
		state: boolean,
		from: string
	}
  }

export default function Change() {
	let location = useLocation();
  let navigate = useNavigate();

	const {token, setAuthToken} = useAuth();

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
	/*############# STATES ############### */
	const [Npass, setNpass] = useState("");
  const [Cpass, setCpass] = useState("");
	const [errNotice, setErrnotice] = useState<string | null>(null);
	const [btnloading, setBtnLoading] = useState(false);
  const [success, setSuccess] = useState(false);
	const state = useLocation() as StateInterface;
  const [role, setRole] = useState<"VIEWER" | "OTHER">("OTHER");

	/*------------- METHODS -------------- */
	function changehandler () {
		
    if (Npass != Cpass){ setErrnotice("Input Mismatch"); return null; }

    if (Npass.length < 8) { setErrnotice("Password too short"); return null; }
    
    setBtnLoading(true);  
    
    ChangePass({initialpass: null, newpass: Npass, confirmpass: Cpass}).then(result => {
      if (result.code == 200) {
        setSuccess(true);
        setBtnLoading(false);
        setRole(translateIds("ID", result.data.roleId) === "VIEWER" ? "VIEWER" : "OTHER")
      } else {
        setErrnotice(result.data.message);
        console.log(result.data)
      }
    }).catch((err) => {
      console.log(err);
      setBtnLoading(false);
    })
	}

  function continueHandler () {
    if (success) {
      navigate( role === "OTHER" ? '/dashboard' : "/dashboard/shared-surveys", { state:true })
    }
  }

	return (
		<div className='login-screen'>
			<Row>
				<Col>
					<Link to={'/'}><img src={logo} alt="Logo" /></Link>
				</Col>
			</Row>
			<Row style={{ 'justifyContent': 'center', 'minHeight': '80vh', 'alignContent': 'center' }}>
				<Col className='login-container' md="3">
						<Row>
								<Col className={state.state.from !== 'main' ? 'login-tag' : 'mb-2'}>
									<FontAwesomeIcon icon={faLock} style={{ 'fontSize': '2em', 'marginRight': '1rem', 'color': 'var(--primary)' }} />
									<Sb_Text font={32} weight={500}>Set Password</Sb_Text>
								</Col>
						</Row>
            <Alert variant='light'>
            {success ?
              (<div className='d-flex'>
                <FontAwesomeIcon icon={faCheckCircle} style={{'color':'var(--primary)','marginRight':'0.5em'}}/>
                <Sb_Text>Password Changed Successfully</Sb_Text>
              </div>) : 
									<Sb_Text>Welcome to Sebsib, before we start you need to change your password. For security reasons obviously.</Sb_Text>}
								</Alert>
						<Row>
							<Col className='login-form-container'>
								
                      {
                        success ? 
                        null
                        :
                        <>
                        <Sb_Card className='w-100 p-4'>
                          <div className='login-forms'>
                          <div className='error-notif' style={{'display': errNotice != null ? 'flex' : 'none'}}>
                            <FontAwesomeIcon icon={faTimesCircle} style={{'fontSize':14, 'marginRight':'0.3rem'}}/> 
                            <Sb_Text font={12} color="--lightGrey">{errNotice}</Sb_Text>
                          </div>
                          <div>
                          <Form.Group className="mb-3" controlId="LoginEmail">
                            <Form.Label><Sb_Text font={12}>Enter New Password</Sb_Text></Form.Label>
                            <Form.Control size="sm" type="password" placeholder="Password" 
                            autoComplete='new-password' value={Npass} onChange={(e) => setNpass(e.target.value)}/>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="LoginPassword">
                            <Form.Label><Sb_Text font={12}>Confirm New Password</Sb_Text></Form.Label>
                            <Form.Control size="sm" type="password" placeholder="Password" 
                            autoComplete='new-password' value={Cpass} 
                            onKeyDown ={(e) => e.key == 'Enter' ? changehandler() : null}
                            onChange={(e) => setCpass(e.target.value)}/>
                          </Form.Group>
                          {/* LOL autoComplete="off doesn't work anymore, this is a work around" */}
                          <input type="text" autoComplete='on' style={{'display':'none'}} /> 
                          <Button size="sm" onClick={() => changehandler()} disabled = {btnloading}>
                            { btnloading ? <Sb_Loader/> : <Sb_Text font={12} color="--lightGrey">Continue</Sb_Text>}												
                          </Button>
                          </div>
                          </div>
                        </Sb_Card>
                        </>
                      }
										
                {
                  success ?
                  <Button size="sm" onClick={() => continueHandler()} disabled = {btnloading}>
                  { btnloading ? <Sb_Loader/> : <Sb_Text font={12} color="--lightGrey">Continue</Sb_Text>}												
                  </Button>
                  :
                  null
                }
							</Col>
						</Row>
						<div className='version-tag'><Sb_Text font={12}>Version 1.0</Sb_Text></div>
					</Col>
			</Row>
		</div>
	)
}