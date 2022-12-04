import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sb_Help from '../../components/Sb_Help/Sb_Help';
import './Help.css'
import ex from '../../assets/dashen.jpg';
import { Col, Form, Row } from 'react-bootstrap';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import helpData from './help_data';
import { useAuth } from '../../states/AuthContext';
import { decodeJWT } from '../../utils/helpers';

export default function Help () {
  let location = useLocation();
  let navigate = useNavigate();
  // Prevents routing from the URL

  const {token, setAuthToken} = useAuth();

  useEffect(() => {
    if (!location.state){
        return navigate("/404");
    }
  },[location.state]);
  
  const [searchHelp, setSearchHelp] = useState("");
  const [activeId, setActiveId] = useState("hlp_1");

  function scrollTo(to: string) {
    const section = document.querySelector("#"+to);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    scrollTo(activeId);
  },[activeId])

  

  return (
    <div>
      <Row>
        <Col md="3">
          <Form.Group className="mb-3" controlId="SearchHelp" style={{'width':'70%'}}>
						<Form.Label><Sb_Text font={12}>What do you need help on?</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Search" value={searchHelp} onChange={(e) => setSearchHelp(e.target.value)}/>
					</Form.Group>
          <div className='help_menu_cont'>
            {
              helpData.filter((help) => help.title.toLowerCase().includes(searchHelp.toLowerCase()) || help.title.toUpperCase().includes(searchHelp.toUpperCase()))
              .map((help, index) => (
                <Row key={index} className={`help_menu ${activeId == help.id ? ' help_active' : ''}`}>
                  <Col style={{'cursor':'pointer'}} onClick={() => {setActiveId(help.id)}}>
                    <p>{help.title}</p>
                  </Col>
                </Row>
              ))
            }
          </div>
        </Col>
        <Col md="1" style={{'borderLeft':'2px solid var(--secondary)'}}></Col>
        <Col>
          {
            helpData.map((help, index) => (
              help.id == 'hlp_13' && decodeJWT(token as string).pkgId == '623d73a051e8bcb894b3f7df' ? 'Upgrade your Package to have access to Sebsib Shelf' :
              <Sb_Help key={index} id={help.id} title={help.title} desc1={help.desc1}  img1={help.img1} desc2={help.desc2}  img2={help.img2}/>
            ))
          }
        </Col>
      </Row>
    </div>
  )
}