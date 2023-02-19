import { faFileInvoice, faGlobe, faLongArrowAltRight, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Row } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert"
import Sb_Text from "../../components/Sb_Text/Sb_Text"
import "./Survey_Choice.css"

interface StateInterface {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {name: string, id: string},
}

export default function Survey_Choice () {
  let navigate = useNavigate();
  const state = useLocation() as StateInterface;
  return (
    <Col>
      <Sb_Alert>There different kinds of survey of survey you can run, for now we have Standard (Regular on the feild data collection) and Online (Where a link is shared to the participants). Choose the one best for you.
        </Sb_Alert>
      <Row>
        <Col style={{'cursor':'pointer'}} onClick={() => navigate('/dashboard/projects/create-survey/'+state.state.id, { state:{name: state.state.name} })}>
          <div className="survey_type">
            <FontAwesomeIcon icon={faFileInvoice} style={{'fontSize':'4em','marginBottom':'0.25em','color':'white'}}/><br></br>
            <Sb_Text font={24} weight={900} color="--lightGrey">Standard Survey</Sb_Text>
            <p className="survey_type_disc">Standard surveys are done using enumerators and the sebsib collect app. Use this if the collection you are doing requires data collectors  </p>
          </div>
          <div className="survey_type_btn">
            Create
            <FontAwesomeIcon icon={faLongArrowAltRight} style={{'color':'var(--primary)', 'marginLeft':'0.5em', 'fontSize':'1.2em'}}/>
          </div>
        </Col>
        <Col style={{'cursor':'pointer'}} onClick={() => navigate('/dashboard/projects/create-online-survey/'+state.state.id, { state:{name: state.state.name} })}>
          <div className="survey_type">
            <FontAwesomeIcon icon={faGlobe} style={{'fontSize':'4em','marginBottom':'0.25em','color':'white'}}/><br></br>
            <Sb_Text font={24} weight={900} color="--lightGrey">Online Survey</Sb_Text>
            <p className="survey_type_disc">Online surveys are filled out by people who share the survey link, much like Google Forms. Use this if you want to collect data from other people on the internet    </p>
          </div>
          <div className="survey_type_btn">
            Create
            <FontAwesomeIcon icon={faLongArrowAltRight} style={{'color':'var(--primary)', 'marginLeft':'0.5em', 'fontSize':'1.2em'}}/>
          </div>
        </Col>
        <Col style={{'cursor':'not-allowed', 'opacity':'0.5'}} onClick={() => null}>
          <div className="survey_type">
            <FontAwesomeIcon icon={faMoneyBillWave} style={{'fontSize':'4em','marginBottom':'0.25em','color':'white'}}/><br></br>
            <Sb_Text font={24} weight={900} color="--lightGrey">Incentivized Survey</Sb_Text>
            <p className="survey_type_disc">Incentivized Survey are online surveys where the respondents get monetary reward for filling out your survey. Also target a specfic demography to send the surveys  </p>
          </div>
          <div className="survey_type_btn">
            Create
            <FontAwesomeIcon icon={faLongArrowAltRight} style={{'color':'var(--primary)', 'marginLeft':'0.5em', 'fontSize':'1.2em'}}/>
          </div>
        </Col>
      </Row>
    </Col>
  )
}