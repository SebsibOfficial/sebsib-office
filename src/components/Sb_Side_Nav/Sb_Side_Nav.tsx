import React, { useEffect, useState } from "react";
import Sb_Side_Nav_Item from "../Sb_Side_Nav_Item/Sb_Side_Nav_Item";
import { NavData, SideNavData } from "./Sb_Side_Nav_Data";
import "./Sb_Side_Nav.css";
import Sb_User_Profile from "./Sb_User_Profile";
import Logo from "../../assets/officeLogoWhite.svg";
import { Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface Props {
  name: string,
  role?: string
}

const logo = () => {
  return (
    <div className="d-inline-flex align-items-center justify-content-center mt-4">
      <img src={Logo} alt="logo" className="logo" />
    </div>
  );
};

const Sb_Side_Nav = (props: Props) => {
  let location = useLocation();
  
  function getParentRoute () {
    let routeArray = location.pathname.split("/");
    if (routeArray.includes("members"))
      return "Members";
    else if (routeArray.includes("projects"))
      return "Projects";
    else if (routeArray.includes("settings"))
      return "Settings";
    else if (routeArray.includes("help"))
      return "Help";
    else
      return "Dashboard";    
  }

  function filerItems (IT:SideNavData, PR:any) {
    if (PR === "VISITOR" && IT.title === "Log Out") {
      return true
    }
    else if(PR !== "VISITOR") {
      return true
    }
    else {
      return false
    }
  }

  return (
    <Container fluid className="sidenav-container">
      <Col>{logo()}</Col>
      <hr className="Sb-divider" />
      <Col className=" mt-3">
        { 
          NavData
            .filter(D => filerItems(D, props.role))
            .map((data) => (
              <div
                key={data.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Sb_Side_Nav_Item navItemData={data} active = { getParentRoute() === data.title ? true : false }/>
              </div>
            ))
        }
      </Col>
      <hr className="Sb-divider btm" />
      <Sb_User_Profile username={props.name} role={props.role}/>
    </Container>
  );
}

export default Sb_Side_Nav;
