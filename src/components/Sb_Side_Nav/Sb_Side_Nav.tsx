import React, { useEffect, useState } from "react";
import Sb_Side_Nav_Item from "../Sb_Side_Nav_Item/Sb_Side_Nav_Item";
import { NavData } from "./Sb_Side_Nav_Data";
import "./Sb_Side_Nav.css";
import Sb_User_Profile from "./Sb_User_Profile";
import Logo from "../../assets/S_Logo_B.svg";
import { Col, Container } from "react-bootstrap";

const logo = () => {
  return (
    <div className="d-inline-flex align-items-center ">
      <div className="circleBg  ">
        <img src={Logo} alt="logo" className="logo" />
      </div>
    </div>
  );
};

const Sb_Side_Nav = (props: any) => {
  return (
    <Container fluid className="sidenav-container">
      <Col className=" pt-2">{logo()}</Col>
      <hr className="Sb-divider" />
      <Col className=" mt-3">
        {
          NavData.map((data) => (
              <div
                key={data.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Sb_Side_Nav_Item navItemData={data} activeId={data.id} />
              </div>
            ))
        }
      </Col>
      <hr className="Sb-divider btm" />
      <Sb_User_Profile username={props.mainBuffer.name} />
    </Container>
  );
}

export default Sb_Side_Nav;
