import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { GetSurveyListForViewer } from "../../utils/api";
import { useAuth } from "../../states/AuthContext";
import { decodeJWT } from "../../utils/helpers";
import Sb_Loader from "../../components/Sb_Loader";

export default function Visitor () {
  let navigate = useNavigate()
  const {token, setAuthToken} = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [SurveyList, SetSurveyList] = useState<any[]>([])

  useEffect(() => {
    GetSurveyListForViewer(decodeJWT(token as string)._id).then(result => {
      if (result.code == 200) {
        SetSurveyList(result.data)
        setPageLoading(false)
      } 
      else
        console.log(result.data);
    }).catch((error) => console.log(error))
  },[])

  return (
    <>
    {
      pageLoading ? <Sb_Loader full/> :
      <Col>
        <Row>
          {
            SurveyList.map((S, index) => (
              <Col key={index} style={{'cursor':'pointer'}} onClick={() => navigate('/dashboard/shared-surveys/view-survey/'+S._id, { state: {name: S.name} })} md="3">
                <div className="survey_type" style={{'minHeight':'180px', 'marginBottom':'1em'}}>
                  <FontAwesomeIcon icon={faFileInvoice} style={{'fontSize':'3em','marginBottom':'0.25em','color':'white'}}/><br></br>
                  <Sb_Text font={20} weight={900} align="center" color="--lightGrey">{S.name}</Sb_Text>
                </div>
              </Col>
            ))
          }
        </Row>
      </Col>
    }
    </>
  )
}