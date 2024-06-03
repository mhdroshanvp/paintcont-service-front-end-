import React from "react";
import homeDesignImage from "/src/assets/card.png";

function ClientCard() {
  return (
    <>
      <img src={homeDesignImage} alt="Home Design 1" className="sm:ml-10 sm:h-64 sm:mt-1 mt-5 sm:rounded-[22px] sm:w-[430px]  h-[180px] w-full"/>
    </>
  );
}

export default ClientCard;