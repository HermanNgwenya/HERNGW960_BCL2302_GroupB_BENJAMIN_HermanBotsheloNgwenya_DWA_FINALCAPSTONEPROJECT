/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ShowsPreview from "../Seasons/ShowsPreview";
import ShowsBody from "./ShowsBody";



export default function SingleShow () {

  const [showData, setShowData] = useState([]);
  const [SeasonData, setSeasonData] = useState([]);

  useEffect(() => {
    fetchData()
  })
    // Fetch the data for the specific show using the showId prop

    const fetchData = () => {

        fetch(`https://podcast-api.netlify.app/shows`)
            .then(response => response.json())
            .then(data => {
              const mapShows = setShowData((mapShow) => {
              
                function seasonAddress(){
                  setSeasonData(mapShow.id)
                }
              
                return (
                  <ShowsBody
                      click={seasonAddress}
                      key={mapShow.id}
                      {...mapShow}
                  />
                )
                
             })
              setShowData(mapShows)
            })
        }

  return (

    <ShowsPreview
        seasonAPI = {SeasonData}
    />
  )

}


