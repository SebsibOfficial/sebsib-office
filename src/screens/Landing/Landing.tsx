import "./Landing.css";
import ILU1 from "../../assets/ill1.svg";
import LandingData from "./landing_content";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    <div>
      <Nav />
      <section id="start">
        <div className="content">
          <div className="headline" id="first_page_headline">
            <div className="header-text" id="first_page_header_text">
              {t("first_page_header")}
            </div>
          </div>
          <div className="subtext" id="first_page_subtext">
            {t("first_page_subtext")}
          </div>
        </div>
        <div className="illust" id="first_page_illust">
          <img src={ILU1} />
        </div>
      </section>
      {LandingData.map((data) => (
        <section>
          <div className="content">
            <div className="headline" id="first_page_headline">
              <div className="header-text" id="first_page_header_text">
                {t(data.headline)}
              </div>
            </div>
            <div className="subtext" id="first_page_subtext">
              {t(data.subtext)}
            </div>
          </div>
          <div className="illust">
            <img src={data.illustration} />
          </div>
        </section>
      ))}
      <footer id="contact-us">
        <div className="contact_foot">
          <h1>{t('nav_items.contact_us')}</h1>
          <h6>+251920642556</h6>
          <h6>info@sebib.com</h6>
          <h6>yoseph@sebib.com</h6>
          <h6>kirubel@sebib.com</h6>
          <h6>yohannes@sebib.com</h6>
        </div>
      </footer>
    </div>
  );
}
