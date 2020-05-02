import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../AxiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    console.log('getting colors')
    getColors()
  }, [])
  
  const getColors = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => setColorList(res.data))
    .catch(err => console.error(err))
  }
  

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
