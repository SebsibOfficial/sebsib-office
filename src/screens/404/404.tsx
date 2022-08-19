import React from "react";
import animationData from "../../assets/notFound.json";
import Lottie from "react-lottie";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { validRoutes } from "../../utils/helpers";

export default function NotFound() {
  let navBack = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  };

  function goBack() {
    let route = location.pathname;
    let routeArray = route.split("/");
    routeArray.forEach((rt) =>
      rt.length == 24 || rt.match("[0-9]") ? (rt = "*") : null
    );
    for (let index = 0; index < routeArray.length; index++) {
      const element = routeArray[index];
      if (element.length == 24 || element.match("[0-9]"))
        routeArray[index] = "*";
    }
    var filteredRoutes = routeArray.join("/");
    let prevRoute = filteredRoutes.slice(0, filteredRoutes.lastIndexOf("/"));
    if (validRoutes.includes(prevRoute)) {
      navBack(prevRoute, { state: true });
    } else {
      navBack(prevRoute.slice(0, prevRoute.lastIndexOf("/")), { state: true });
    }
  }

  return (
    <div style={{height: "100vh"}}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        style={{ fontSize: "2.5em", color: "var(--primary)" }}
        className="ms-3 mt-3"
        onClick={() => {goBack()}}
      />
      <div className="text-center">
        <Lottie options={defaultOptions} height={600} width={600} />
        <Sb_Text font={48} weight={600}>
          Page Not Found
        </Sb_Text>
      </div>
    </div>
  );
}
