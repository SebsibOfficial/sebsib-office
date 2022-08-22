import { Link } from "react-router-dom";
import { useAuth } from "../../../states/AuthContext";
import { decodeJWT } from "../../../utils/helpers";
import Logo from "../../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCog,
  faGripVertical,
  faHamburger,
  faThLarge,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const { token, setAuthToken } = useAuth();
  function toWhere() {
    if (token == "") return "/login";
    else if (decodeJWT(token as string).exp < new Date().getTime() / 1000) {
      setAuthToken("");
      return "/login";
    } else {
      return "/dashboard";
    }
  }
  function scrollTo(to: string) {
    const section = document.querySelector(to);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function menubar(cmd: boolean) {
    cmd
      ? document
          .getElementsByClassName("menu-bar")[0]
          .classList.add("show-menu-bar")
      : document
          .getElementsByClassName("menu-bar")[0]
          .classList.remove("show-menu-bar");
  }

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <nav>
      <div className="logo_land">
        <Link to={"/"} onClick={() => scrollTo("#start")}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="options">
        <div className="list_cont">
          <Link to={"/"}>
            <div className={"list_item "+t("css_sub_text")}>{t("nav_items.about_us")}</div>
          </Link>
          <div className="list_item netela">፣</div>
          <Link to={"/pricing"}>
            <div className={"list_item "+t("css_sub_text")}>{t("nav_items.pricing")}</div>
          </Link>
          <div className="list_item netela">፣</div>
          <Link to={"/"} state={true} onClick={() => scrollTo("#contact-us")}>
            <div className={"list_item "+t("css_sub_text")}>{t("nav_items.contact_us")}</div>
          </Link>
          <div className="list_item netela">፣</div>
          <Link to={toWhere()} state={true}>
            <div className={"list_item "+t("css_sub_text")}>{t("nav_items.login")}</div>
          </Link>
          <div className="list_item netela">፣</div>
          <Link to={"/register"}>
            <div className={"list_item "+t("css_sub_text")} id="reg_but">
              {t("nav_items.register")}
            </div>
          </Link>
        </div>
        <div className="lang">
          <span
            id="amh"
            onClick={() => changeLanguage("am")}
            style={{ opacity: i18n.language == "am" ? "1" : "0.3" }}
          >
            አም
          </span>
          <span
            id="eng"
            onClick={() => changeLanguage("en")}
            style={{ opacity: i18n.language == "en" ? "1" : "0.3" }}
          >
            EN
          </span>
        </div>
      </div>
      <div className="menu">
        <FontAwesomeIcon icon={faGripVertical} onClick={() => menubar(true)} />
      </div>
      <div className="menu-bar">
        <div className="list_item netela" style={{ marginBottom: "1em" }}>
          <FontAwesomeIcon icon={faTimes} onClick={() => menubar(false)} />
        </div>
        <Link to={"/"} onClick={() => menubar(false)}>
          <div className="list_item">{t("nav_items.about_us")}</div>
        </Link>
        <div className="list_item netela">፣</div>
        <Link to={"/pricing"} onClick={() => menubar(false)}>
          <div className="list_item">{t("nav_items.pricing")}</div>
        </Link>
        <div className="list_item netela">፣</div>
        <Link
          to={"/"}
          state={true}
          onClick={() => {
            menubar(false);
            scrollTo("#contact-us");
          }}
        >
          <div className="list_item">{t("nav_items.contact_us")}</div>
        </Link>
        <div className="list_item netela">፣</div>
        <Link to={toWhere()} onClick={() => menubar(false)} state={true}>
          <div className="list_item">{t("nav_items.login")}</div>
        </Link>
        <div className="lang">
          <span
            id="amh"
            onClick={() => changeLanguage("am")}
            style={{ opacity: i18n.language == "am" ? "1" : "0.3" }}
          >
            አም
          </span>
          <span
            id="eng"
            onClick={() => changeLanguage("en")}
            style={{ opacity: i18n.language == "en" ? "1" : "0.3" }}
          >
            EN
          </span>
        </div>
        <Link to={"/register"} onClick={() => menubar(false)}>
          <div className="list_item" id="reg_but">
            {t("nav_items.register")}
          </div>
        </Link>
      </div>
    </nav>
  );
}
