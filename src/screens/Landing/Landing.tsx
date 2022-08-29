import "./Landing.css";
import ILU1 from "../../assets/ill1.svg";
import LandingData from "./landing_content";
import COIN from "../../assets/COIN.svg";
import EASY from "../../assets/EASY.svg";
import LOCAL from "../../assets/LOCAL.svg";
import SHEILD from "../../assets/SHEILD.svg";
import TIME from "../../assets/TIME.svg";
import LogoW from "../../assets/logo_3.png";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClipboardList, faIdBadge, faLayerGroup, faLongArrowAltRight, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
  let location = useLocation();

  function scrollTo(to: string) {
    const section = document.querySelector(to);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const { t } = useTranslation();

  useEffect(() => {
    if (location.state) scrollTo("#contact-us");
  }, []);
  return (
    <div style={{'overflowX': 'hidden'}}>
      <Nav />
      <section id="first">
        <div className="headline">
          <p id="p_1">Quality Data</p>
          <p id="p_2">For All</p>
        </div>
        
          <div id="download_app">
          <Link to="/register" style={{'color':'var(--secondary)', 'textDecoration':'none'}}>
            <FontAwesomeIcon icon={faGooglePlay as IconProp} style={{'marginRight':'0.5rem'}}/>
            Download App
            </Link>
          </div>
      </section>
      <section id="second">
        <div className="main">
          <div id="head_logo">
            <img src={LogoW} alt=""/>
          </div>
          <div id="title">
            <p>WHO ARE WE?</p>
          </div>
          <div id="intro">
          Sebsib is your all in one data collection suite to help gather data efficiently and in an affordable way.
           By using our website and mobile application you can easily start to collect anywhere and in any condition. 
           If you are a professional researcher or student trying to collect data with paper questionnaires or 
           if you are an organization going to the harshest remote sites to gather important 
          information with expensive foreign tools, Sebsib is here with an alternative to help you in your journey.
          </div>
        </div>
      </section>
      <section id="third">
        <div id="title">
          <p>HOW SEBSIB WORKS</p>
        </div>
        <div className="steps">
          <div className="step">
            <FontAwesomeIcon icon={faIdBadge} className="ficon"/>
            <p className="sub_title">REGISTER</p>
            <p className="desc">First go to the register page,
             and enter your details and organization name ( which might be just you ).
              Also select the package that best suites you
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faUsers} className="ficon"/>
            <p className="sub_title">ADD MEMBERS</p>
            <p className="desc">After that go to the members section and create the enumerators 
            that can collect the data. You can just create one if it is just you.
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faClipboardList} className="ficon"/>
            <p className="sub_title">DESIGN</p>
            <p className="desc">Then design you survey question on your liking. The platform supports various input types
             and has complex skipping patterns for your conditional questions
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faLayerGroup} className="ficon"/>
            <p className="sub_title">COLLECT</p>
            <p className="desc">Finally the fun begins, Download the app and enter your enumerator credentials. After your in download the 
            survey and gather responses as much as you like and send it to the website
            </p>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faTable} className="ficon"/>
            <p className="sub_title">VIEW</p>
            <p className="desc">Now that your data is gathered you can view it on the website or download it in an 
            excel format to do additional analysis
            </p>
          </div>
        </div>
      </section>
      <section id="fourth">
      <div id="title">
          <p style={{'color':'var(--secondary)', 'textDecorationLine':'inherit'}}>WHY SEBSIB?</p>
        </div>
        <div className="reasons">
          <div className="reason">
            <div className="pic_cont">
              <img src={EASY}/>
            </div>
            <p className="sub_title">SIMPLE</p>
            <p className="desc">Simplify your data collection with a brief training session and a straightforward approach
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={SHEILD} style={{'transform':'scale(1.5)'}}/>
            </div>
            <p className="sub_title">SECURE</p>
            <p className="desc">Through Sebsib, all information, data, and survey submissions are completely secure.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={COIN}/>
            </div>
            <p className="sub_title">CHEAP</p>
            <p className="desc">No more need for foriegn currency as Sebsib provides high quality service with unbelievable pricing plans using Ethiopian Birr.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={LOCAL} style={{'transform':'scale(1.5)'}}/>
            </div>
            <p className="sub_title">LOCAL</p>
            <p className="desc">Tailored to perfection for Ethiopians, Sebsib comes with multiple dialects integrated into it, in addition to its ability to work without internet access.
            </p>
          </div>
          <div className="reason">
            <div className="pic_cont">
              <img src={TIME}/>
            </div>
            <p className="sub_title">AVAILABLE</p>
            <p className="desc">We are always available to provide training on how to use Sebsib and answer all of your inquiries.
            </p>
          </div>
        </div>
      </section>
      <section id="fifth">
        <p>LIKE IT SO FAR? THEN GET STARTED</p>
        <div className="arrow">
          <Link to="/register" style={{'color':'var(--secondary)'}}><FontAwesomeIcon icon={faLongArrowAltRight}/></Link>
        </div>
      </section>
      <footer id="contact-us">
        <h1>{t("nav_items.contact_us")}</h1>
        <div className="contact_info">
          <div className="contact_phones">
            <h6>+251920642556</h6>
            <h6>+251973506446</h6> 
            <h6>+251920747084</h6>
          </div>
          <div className="contact_emails">
            <h6>info@sebib.com</h6>
            <h6>yoseph@sebib.com</h6>
            <h6>kirubel@sebib.com</h6>
            <h6>yohannes@sebib.com</h6>
          </div>
        </div>
        <a href="http://t.me/Blac_Milq" target="_blank">
          <h6>Illustrations by Milq is Blaq</h6>
        </a>
      </footer>
    </div>
  );
}
