import { faCheckCircle, faIdBadge, faKey, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_Card from '../../components/Sb_Card/Sb_Card';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { login, ResetPass, ResponseInterface } from '../../utils/api';
import { AuthContext, useAuth } from '../../states/AuthContext';
import './Login.css';
import Sb_Loader from '../../components/Sb_Loader';
import { start } from 'repl';

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

export default function Forgot() {
	let location = useLocation();
  let navigate = useNavigate();

	const {token, setAuthToken} = useAuth();

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
		if (token != "") {
      return navigate("/", {state: true});
    }
  },[location.state]);
  
	/*############# STATES ############### */
	const [shortOrgId, setShortOrgId] = useState("");
	const [email, setEmail] = useState("");
	const [errNotice, setErrnotice] = useState(null);
	const [btnloading, setBtnLoading] = useState(false);
  const [success, setSuccess] = useState(false);
	const state = useLocation() as StateInterface;

	/*------------- METHODS -------------- */
	function changehandler () {
		setBtnLoading(true);
		ResetPass({email: email, shortOrgId: shortOrgId}).then(result => {
      if (result.code == 200) {
        setSuccess(true);
        setEmail(""); setShortOrgId("")
        setBtnLoading(false);
      } else {console.log(result.data); setBtnLoading(false)}
    })
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
									<FontAwesomeIcon icon={faKey} style={{ 'fontSize': '2em', 'marginRight': '1rem', 'color': 'var(--primary)' }} />
									<Sb_Text font={32} weight={500}>Reset Password</Sb_Text>
								</Col>
						</Row>
            <Alert variant={success ? `success` :`light`}>
              {success ?
              (<div className='d-flex'>
                <FontAwesomeIcon icon={faCheckCircle} style={{'color':'var(--primary)','marginRight':'0.5em'}}/>
                <Sb_Text>Reset email sent to your address</Sb_Text>
              </div>) : 
              <Sb_Text>Enter your organization ID and your email, then check your email for access.</Sb_Text>}
            </Alert>
						<Row>
							<Col className='login-form-container'>
								<Sb_Card className='w-100 p-4'>
									<div className='login-forms'>
										<div className='error-notif' style={{'display': errNotice != null ? 'flex' : 'none'}}>
											<FontAwesomeIcon icon={faTimesCircle} style={{'fontSize':14, 'marginRight':'0.3rem'}}/> 
											<Sb_Text font={12} color="--lightGrey">{errNotice}</Sb_Text>
										</div>
										<div>
											<Form.Group className="mb-3" controlId="LoginEmail">
												<Form.Label><Sb_Text font={12}>Organization ID</Sb_Text></Form.Label>
												<Form.Control size="sm" type="text" placeholder="Organization ID" 
												autoComplete='new-password' value={shortOrgId} onChange={(e) => setShortOrgId(e.target.value)}/>
											</Form.Group>

											<Form.Group className="mb-3" controlId="LoginPassword">
												<Form.Label><Sb_Text font={12}>Email</Sb_Text></Form.Label>
												<Form.Control size="sm" type="email" placeholder="Email Address" 
												autoComplete='new-password' value={email} 
												onKeyDown ={(e) => e.key == 'Enter' ? changehandler() : null}
												onChange={(e) => setEmail(e.target.value)}/>
											</Form.Group>
											{/* LOL autoComplete="off doesn't work anymore, this is a work around" */}
											<input type="text" autoComplete='on' style={{'display':'none'}} /> 
											<Button size="sm" onClick={() => changehandler()} disabled = {btnloading}>
												{ btnloading ? <Sb_Loader/> : <Sb_Text font={12} color="--lightGrey">Reset</Sb_Text>}												
											</Button>
										</div>
									</div>
								</Sb_Card>
							</Col>
						</Row>
						<div className='version-tag'><Sb_Text font={12}>Version 1.0</Sb_Text></div>
					</Col>
			</Row>
		</div>
	)
}