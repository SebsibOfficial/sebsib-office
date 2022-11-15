import { Col, Row } from 'react-bootstrap'
import Sb_Text from '../Sb_Text/Sb_Text'
import './Sb_Help.css'

export interface Props {
  id: string,
  title: string,
  desc1: string,
  img1?: string,
  desc2?: string,
  img2?: string
}

export default function Sb_Help (props:Props) {
  return (
    <>
      <Row id={props.id}>
        <Col>
          <Row className='help_title'>
            <Sb_Text font={32} weight={500}>{props.title}</Sb_Text>
          </Row>
          <Row className='help_desc mb-4'>
            <Col>
              <Sb_Text font={16}>
                <p dangerouslySetInnerHTML={{__html: props.desc1}} ></p>
              </Sb_Text>
            </Col>
          </Row>
          <Row className='help_img' style={{'display': props.img1 != undefined ? 'initial' : 'none'}}>
            <img className='mb-4' src={props.img1} alt="" />
          </Row>
          <Row className='mb-4' style={{'display': props.desc2 != undefined ? 'initial' : 'none'}}>
            <Col>
              <Sb_Text font={16}>
                <p dangerouslySetInnerHTML={{__html: props.desc2 ?? ''}} ></p>
              </Sb_Text>
            </Col>
          </Row>
          <Row className='help_img' style={{'display': props.img2 != undefined ? 'initial' : 'none'}}>
            <img src={props.img2} alt="" />
          </Row>
        </Col>
      </Row>
    </>
  )
}