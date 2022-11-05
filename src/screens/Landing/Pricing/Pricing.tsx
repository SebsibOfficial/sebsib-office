import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../Landing.css";
import "./Pricing.css";
import Nav from "../Nav/Nav";
import { Button, Col, Row } from "react-bootstrap";
import {Card_Comp, CardI }from "./Card_Comp";
import data from "./priceData";

export default function Pricing() {
  function scrollTo(to: string) {
    const section = document.querySelector(to);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  useEffect(() => {
    scrollTo("#price-top");
  }, []);

  const { t } = useTranslation();
  const [priceType, setPriceType] = useState<"ANNUAL" | "ONE_MONTH">("ONE_MONTH")
  return (
    <div>
      <Nav />
      <section className="price_section" id="price-top">
        <div className="title">
          <div id="title" style={{'color':'var(--secondary)','textAlign':'center'}}>
            <p>PACKAGES</p>
          </div>
          <div className="toggle_price">
            <span id="mth" className={priceType == 'ONE_MONTH' ? 'active_toggle_mth' : ''}
            style={{'cursor':'pointer'}}
            onClick={() => setPriceType("ONE_MONTH")}>
              {t("pricing.monthly")}
            </span>
            <span id="yr" className={priceType == 'ANNUAL' ? 'active_toggle_yr' : ''} style={{'cursor':'pointer'}} 
            onClick={() => setPriceType("ANNUAL")}>
              {t("pricing.yearly")}
            </span>
          </div>
        </div>
        {
          data.map((item:CardI) => (
            <Card_Comp data={item} annual = {priceType == "ANNUAL"}/>
          ))
        }
      </section>
    </div>
  );
}
