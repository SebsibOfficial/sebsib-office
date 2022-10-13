import { faIdBadge, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_Card from '../../components/Sb_Card/Sb_Card';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { login, ResponseInterface } from '../../utils/api';
import { AuthContext, useAuth } from '../../states/AuthContext';
import './Login.css';
import Sb_Loader from '../../components/Sb_Loader';

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

export default function Login() {
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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errNotice, setErrnotice] = useState(null);
	const [btnloading, setBtnLoading] = useState(false);
	const state = useLocation() as StateInterface;

	/*------------- METHODS -------------- */
	function loginHandler () {
		setBtnLoading(true);
		// Get Data here
		login(username, password)
		.then((result:any) => {
			if (result.code == 200) {
				// Set token to state
				var ac = localStorage.getItem('access_count');
				localStorage.getItem('access_count') != null ? 
				localStorage.setItem('access_count', (parseInt(ac as string) + 1).toString()) : 
				localStorage.setItem('access_count', '1');
				setAuthToken(result.data.token as string);				
				// Navigate
				setTimeout(() => navigate('/dashboard', { state:true }), 50);				
			} else {
				setErrnotice(result.data.message);
			}
			setBtnLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setBtnLoading(false);
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
									<FontAwesomeIcon icon={faIdBadge} style={{ 'fontSize': '2em', 'marginRight': '1rem', 'color': 'var(--primary)' }} />
									<Sb_Text font={32} weight={500}>Log In</Sb_Text>
								</Col>
						</Row>
						{
							state.state.from === 'main' && 
								<Alert variant='success'>
									<Sb_Text>Successfully Logged Out</Sb_Text>
								</Alert>
						}
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
												<Form.Label><Sb_Text font={12}>Email</Sb_Text></Form.Label>
												<Form.Control size="sm" type="email" placeholder="Enter email" 
												autoComplete='new-password' value={username} onChange={(e) => setUsername(e.target.value)}/>
											</Form.Group>

											<Form.Group className="mb-3" controlId="LoginPassword">
												<Form.Label><Sb_Text font={12}>Password</Sb_Text></Form.Label>
												<Form.Control size="sm" type="password" placeholder="Password" 
												autoComplete='new-password' value={password} 
												onKeyDown ={(e) => e.key == 'Enter' ? loginHandler() : null}
												onChange={(e) => setPassword(e.target.value)}/>
                        <Sb_Text font={12} weight={300}>
                          <div style={{'cursor':'pointer', 'color':'var(--primary)'}} onClick={() => navigate('/forgotpassword', { state:true })}>
                            Forgot Password?
                          </div>
                        </Sb_Text>
											</Form.Group>
											{/* LOL autoComplete="off doesn't work anymore, this is a work around" */}
											<input type="text" autoComplete='on' style={{'display':'none'}} /> 
											<Button size="sm" onClick={() => loginHandler()} disabled = {btnloading}>
												{ btnloading ? <Sb_Loader/> : <Sb_Text font={12} color="--lightGrey">Log In</Sb_Text>}												
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