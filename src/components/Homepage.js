import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import etapas from "../assets/etapas.png";
import tasks from "../assets/tasks.png";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faTwitter,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

function Homepage() {
  return (
    <div className="homepage">
      <img src={banner} alt="" className="banner" />
      <div className="container">
        <div className="row pt-5">
          <p className="home-content">
            Analítica Canguro es una plataforma de Visual Analytics que manipula
            datos longitudinales de la Fundación Canguro de Colombia desde 1993
            a 2020. El enfoque principal de esta herramienta es estudiar
            muestras de bebés con y sin Retardo del Crecimiento Intrauterino
            (RCIU) con el fin de analizar diferentes variables en diferentes
            etapas de crecimiento para poder determinar el impacto de estas
            sobre el desarrollo del bebé, ncontrar fallas en los procedimientos
            dentro del Programa Canguro y confirmar o negar hipótesis que puedan
            surgir dentro de los experto médicos y doctores.
          </p>
        </div>
        <div className="row pt-2">
          <p className="home-content">
            La herramienta divide el análisis en tres etapas principales que
            describen acontecimientos antes, durante y después del nacimiento
            del bebé. Cada etapa cuenta con variables distintas y
            visualizaciones adaptadas a cada análisis. Las etapas y el flujo de
            información dentro de la herramienta es la siguiente:
          </p>
        </div>
        <div className="row">
          <img src={etapas} alt="etapas herramienta" />
        </div>
        <div className="row pt-2">
          <p className="home-content">
            En cada etapa se pueden analizar distintas variables dentro de las
            muestras sugeridas. De igual manera, la herramienta ofrece la opción
            de filtrado de variables, de tal manera que se puedan consultar
            datos aplicando variables definidas por el usuario que puedan ser de
            interés y que posiblemente afecten el desempeño y resultados en las
            distintas etapas.
          </p>
        </div>
        <div className="row">
          <img src={tasks} alt="tareas visualizacion" />
        </div>
        <div className="row pt-2 pb-4">
          <p className="home-content">
            La herramienta permite realizar tareas de exploración, análisis,
            filtrado y selección de datos tratando de ser lo más flexible
            posible para que el usuario pueda jugar con las variables de su
            interés y poder encontrar diferentes hallazgos que contribuyan a la
            fundación. Los datos e imágenes usadas pertenencen a la Fundación
            Canguro, la herramienta de analítica es para uso exclusivo de los
            analistas, doctores e interesados de la fundación.
          </p>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <a href="/" className="navbar-brand mr-auto">
                <img className="logo" src={logo} alt="logo" />
              </a>
            </div>
            <div className="col-4 text-center">
              <ul>
                <li>
                  <Link to="/entorno" className="foot-link">
                    Entorno
                  </Link>
                </li>
                <li>
                  <Link to="/nacimiento" className="foot-link">
                    Nacimiento
                  </Link>
                </li>
                <li>
                  <Link to="/crecimiento" className="foot-link">
                    Crecimiento
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-4 text-end">
              <a
                href="https://twitter.com/fundcanguro?lang=es"
                target="_blank"
                className="foot-social"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.facebook.com/fundacioncanguro.padres"
                target="_blank"
                className="foot-social"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.youtube.com/user/fundacioncanguro"
                target="_blank"
                className="foot-social"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          <div className="row line">
            <hr />
          </div>
          <div className="row">
            <div className="col-6 copy">
              Todos los derechos reservados Analítica Canguro 2021{" "}
              <FontAwesomeIcon icon={faCopyright} />
            </div>
            <div className="col-6 copy text-end">
              <a
                href="https://fundacioncanguro.co/"
                target="_blank"
                className="copy-link"
                rel="noreferrer"
              >
                Fundación Canguro Colombia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
