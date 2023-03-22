import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Visitor () {
  let navigate = useNavigate()
  const [SurveyList, SetSurveyList] = useState<any[]>([
    {
      _id: "62ff42e8f58a9fcf1eebe506",
      name: "Survey 3"
    },
    {
      _id: "ID1",
      name: "Intense Survey 2"
    },
    {
      _id: "ID2",
      name: "Intense Survey 3"
    }
  ])

  return (
    <Col>
      <Row>
        {
          SurveyList.map((S) => (
            <Col style={{'cursor':'pointer'}} onClick={() => navigate('/dashboard/shared-surveys/view-survey/'+S._id, { state: true })} md="3">
              <div className="survey_type" style={{'minHeight':'180px'}}>
                <FontAwesomeIcon icon={faFileInvoice} style={{'fontSize':'3em','marginBottom':'0.25em','color':'white'}}/><br></br>
                <Sb_Text font={20} weight={900} align="center" color="--lightGrey">{S.name}</Sb_Text>
              </div>
            </Col>
          ))
        }
      </Row>
    </Col>
  )
}