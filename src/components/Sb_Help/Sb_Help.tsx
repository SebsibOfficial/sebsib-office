import { Col, Row } from 'react-bootstrap'
import Sb_Text from '../Sb_Text/Sb_Text'
import './Sb_Help.css'

export interface Props {
  id: string,
  title: string,
  desc1: string,
  vid?: string,
  desc2?: string
}

const YoutubeEmbed = (props:any) => (
  <div className="video-responsive">
    <iframe
      width="653"
      height="480"
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

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
          <Row className='help_img' style={{'display': props.vid != undefined ? 'initial' : 'none'}}>
            {/* <img className='mb-4' src={props.img1} alt="" /> */}
            <YoutubeEmbed embedId={props.vid}/>
          </Row>
          <Row className='mb-4' style={{'display': props.desc2 != undefined ? 'initial' : 'none'}}>
            <Col>
              <Sb_Text font={16}>
                <p dangerouslySetInnerHTML={{__html: props.desc2 ?? ''}} ></p>
              </Sb_Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}