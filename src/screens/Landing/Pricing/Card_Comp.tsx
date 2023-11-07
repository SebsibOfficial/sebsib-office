import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface CardI {
  pkgName: string,
  cardColor: "white" | "black" | "purple" | "yellow",
  projectCount: string,
  surveyCount: string,
  memberCount: string,
  featureOne?: string,
  featureTwo?: string,
  featureThree?: string,
  dayCount: string,
  price: string,
  priceAnnual: string,
  descTitle: string,
  desc: string
}

interface Props {
  data: CardI,
  annual: boolean
}

export function Card_Comp(props: Props) {
  return (<>
  <div className="cards_prices" style={{'marginTop':'4em'}}>
    <div className={`price_card ${props.data.cardColor}`}>
      <span className="cut_out"></span>
      <div className="card_content">
        <div className="card_title mb-3">{props.data.pkgName}</div>
        <ul className="card_list">
          <li className="card_list_item">{props.data.projectCount}</li>
          <li className="card_list_item">{props.data.surveyCount}</li>
          <li className="card_list_item">{props.data.memberCount}</li>
          {
            props.data.featureOne != undefined ? 
            <li className="card_list_item">{props.data.featureOne}</li>
            : null
          }
          {
            props.data.featureTwo != undefined ? 
            <li className="card_list_item">{props.data.featureTwo}</li>
            : null
          }
          {
            props.data.featureThree != undefined ? 
            <li className="card_list_item">{props.data.featureThree}</li>
            : null
          }
          <li className="card_list_item">{props.data.dayCount}</li>
        </ul>
        <div className="card_title">{ props.data.pkgName == "Free Trail" ? "FREE" : "CONTACT US"}</div>
      </div>
    </div>
    <div className="card_desc">
      <Row>
        <Col>
          <p className="title_card_dec">{props.data.descTitle}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{props.data.desc}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/register">
            <Button variant="primary">Get Offer</Button>
          </Link>
        </Col>
      </Row>
    </div>
  </div>
  </>)
}