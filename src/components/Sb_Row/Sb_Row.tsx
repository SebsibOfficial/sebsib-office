import { Button, Col, Row } from 'react-bootstrap';
import Sb_Container from '../Sb_Container/Sb_Container';
import Sb_Text from '../Sb_Text/Sb_Text';
import './Sb_Row.css';

interface Props {
  id:string,
  project?:string,
  survey?:string,
  date?:string,
  enumrator?:string,
  header?:boolean,
  color:"DARK" | "PURPLE",
  onView?: (id:string) => void
}

export default function Sb_Row (props:Props) {
  var {header = false, onView = () => null} = props;
  if (header){
    return (
      <Row className='g-0 mb-2'>
        <Col>
          <Sb_Container color={props.color} className='justify-content-center p-2'>
            <Sb_Text weight={500}>Project Name</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text weight={500}>Survey Name</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text weight={500}>Enumrator</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text weight={500}>Date</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <>
              { !header && <Sb_Text font={12} color='--secondary'><a style={{'cursor':'pointer'}} onClick={() => onView(props.id)}>View</a></Sb_Text>}
              {header && <div style={{'visibility':'hidden', 'fontSize':12}}>View</div>}
            </>
          </Sb_Container>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row className='g-0 mb-2'>
        <Col>
          <Sb_Container color={props.color} className='justify-content-center p-2'>
            <Sb_Text>{props.project}</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text>{props.survey}</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text>{props.enumrator}</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color={props.color} thin className='justify-content-center p-2'>
            <Sb_Text>{props.date}</Sb_Text>
          </Sb_Container>
        </Col>
        <Col>
          <Sb_Container color="DARK" thin className='justify-content-center p-2'>
            <>
              { !header && <Sb_Text font={12} color='--secondary'><a style={{'cursor':'pointer'}} onClick={() => onView(props.id)}>View</a></Sb_Text>}
              {header && <div style={{'visibility':'hidden', 'fontSize':12}}>View</div>}
            </>
          </Sb_Container>
        </Col>
      </Row>
    )
  }
}