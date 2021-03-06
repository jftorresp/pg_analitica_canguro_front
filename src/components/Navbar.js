import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#Navbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="/" className="navbar-brand mr-auto">
            <img className="logo" src={logo} alt="logo" />
          </a>
          <div className="collapse navbar-collapse" id="Navbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/entorno" className="nav-link link">
                  Entorno
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/nacimiento" className="nav-link link">
                  Nacimiento
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/crecimiento" className="nav-link link">
                  Crecimiento
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://twitter.com/fundcanguro?lang=es"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link link"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.facebook.com/fundacioncanguro.padres"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link link"
                >
                  {" "}
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.youtube.com/user/fundacioncanguro"
                  className="nav-link link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
