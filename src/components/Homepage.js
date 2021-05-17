import React from "react";
import banner from "../assets/banner.png";

function Homepage() {
  return (
    <div className="homepage">
      <img src={banner} alt="" className="banner" />
      <div className="container">
        <div className="row pt-5">
          <h1 className="titulo">
            <b>Propósito</b>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            nesciunt illo aliquid asperiores, libero distinctio labore iure
            corporis dolor iusto sunt fugit voluptatum ipsam voluptas est quos
            commodi eveniet voluptates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
