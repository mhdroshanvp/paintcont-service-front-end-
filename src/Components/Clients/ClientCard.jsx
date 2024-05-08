import React from "react";
import homeDesignImage from "/src/assets/card.png";

function ClientCard() {
  return (
    <>
      <img src={homeDesignImage} alt="Home Design 1" className="ml-5 border h-48 object-contain rounded-[22px]"/>
    </>
  );
}

export default ClientCard;