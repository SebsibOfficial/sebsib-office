import { Col, Row, Table } from "react-bootstrap";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import './View_Survey.css';

type Props = { projectId: string}

export default function View_Survey (props:Props) {
  return (
    <Col className="veiw-survey">
      <Row className="mb-3">
        <Col>
          <Sb_Text font={32} weight={600}>{props.projectId}</Sb_Text>
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