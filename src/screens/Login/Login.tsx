import { faIdBadge, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_Card from '../../components/Sb_Card/Sb_Card';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { login, ResponseInterface } from '../../utils/api';
import { AuthContext } from '../../states/AuthContext';
import './Login.css';
import Sb_Loader from '../../components/Sb_Loader';

export default function Login() {
	let location = useLocation();
  let navigate = useNavigate();
  const Auth = useContext(AuthContext);

	// Prevents routing to login page once logged in
	useEffect(() => {
		if (Auth.token != '')
			return navigate("/");
	}, [Auth.token])

  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
	/*############# STATES ############### */
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errNotice, setErrnotice] = useState(null);
	const [btnloading, setBtnLoading] = useState(false);

	/*------------- METHODS -------------- */
	function loginHandler () {
		setBtnLoading(true);
		// Get Data here
		login(username, password)
		.then((result:any) => {
			if (result.code == 200) {
				// Set token to state
				Auth.setAuthToken(result.data.token as string);
				// Navigate
				navigate('/dashboard', { state:true });
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
						<img src={logo} alt="Logo" />
				</Col>
			</Row>
			<Row style={{ 'justifyContent': 'center', 'minHeight': '80vh', 'alignContent': 'center' }}>
				<Col className='login-container' md="3">
						<Row>
								<Col className='login-tag'>
									<FontAwesomeIcon icon={faIdBadge} style={{ 'fontSize': '2em', 'marginRight': '1rem', 'color': 'var(--primary)' }} />
									<Sb_Text font={32} weight={500}>Log In</Sb_Text>
								</Col>
						</Row>
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
												autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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