import React from "react";
import homeDesignImage from "/src/assets/home-design-1.png";

function ClientCard() {
  return (
    <>
      <img src={homeDesignImage} alt="Home Design 1" className="h-48 w-auto object-contain rounded-[22px]"/>
    </>
  );
}

export default ClientCard;