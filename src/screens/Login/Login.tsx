import { faIdBadge, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Row } from 'react-bootstrap';
import logo from '../../assets/officeLogoBlack.svg';
import Sb_Card from '../../components/Sb_Card/Sb_Card';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import './Login.css';

export default function Login() {
	var plc = true;
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
										<div className='error-notif'>
											<FontAwesomeIcon icon={faTimesCircle} style={{'fontSize':14, 'marginRight':'0.3rem'}}/> 
											<Sb_Text font={12} color="--lightGrey">Incorrect Email or Password</Sb_Text>
										</div>
										<Form>
											<Form.Group className="mb-3" controlId="LoginEmail">
												<Form.Label><Sb_Text font={12}>Email</Sb_Text></Form.Label>
												<Form.Control size="sm" type="email" placeholder="Enter email"/>
											</Form.Group>

											<Form.Group className="mb-3" controlId="LoginPassword">
												<Form.Label><Sb_Text font={12}>Password</Sb_Text></Form.Label>
												<Form.Control size="sm" type="password" placeholder="Password"/>
											</Form.Group>

											<Button size="sm" ><Sb_Text font={12} color="--lightGrey">Log In</Sb_Text></Button>
										</Form>
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