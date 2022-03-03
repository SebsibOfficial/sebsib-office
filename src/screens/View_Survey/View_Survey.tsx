import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import './View_Survey.css';

export default function View_Survey () {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  return (
    <Col className="veiw-survey">
      <Row className="mb-3">
        <Col>
          <Sb_Text font={32} weight={600}>{params.pid}</Sb_Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td colSpan={3}>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Col>
  )
}