import React, { useEffect, useState } from "react";
import Sb_Side_Nav_Item from "../Sb_Side_Nav_Item/Sb_Side_Nav_Item";
import { NavData } from "./Sb_Side_Nav_Data";
import "./Sb_Side_Nav.css";
import Sb_User_Profile from "./Sb_User_Profile";
import Logo from "../../assets/officeLogoWhite.svg";
import { Col, Container } from "react-bootstrap";

interface Props {
  name: string
}

const logo = () => {
  return (
    <div className="d-inline-flex align-items-center justify-content-center mt-4">
      <img src={Logo} alt="logo" className="logo" />
    </div>
  );
};

const Sb_Side_Nav = (props: Props) => {
  return (
    <Container fluid className="sidenav-container">
      <Col>{logo()}</Col>
      <hr className="Sb-divider" />
      <Col className=" mt-3">
        {
          NavData.map((data) => (
              <div
                key={data.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Sb_Side_Nav_Item navItemData={data} />
              </div>
            ))
        }
      </Col>
      <hr className="Sb-divider btm" />
      <Sb_User_Profile username={props.name} />
    </Container>
  );
}

export default Sb_Side_Nav;
