import "./featured.css";
import React from 'react';
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";


const Featured = () => {

   const {data, loading, error} = useFetch("/hotels/countByCity?cities=patna,muzaffarpur,bhubneshwar");
   console.log(data);
  return (
    <div className="featured">

      {loading ? ("Loading please wait" )
      : (
      <> <div className="featuredItem">
        <img
          src="https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/buddha_smriti_park/buddha-samiti-park.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Patna</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://www.holidify.com/images/bgImages/MUZAFFARPUR.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Muzaffarpur</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bhubneshwar</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div> </> )}
    </div>
  );
};

export default Featured;
