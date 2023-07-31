
// import {React,  useState, useEffect } from "react";
// import SeasonBody from "./SeasonBody";


// export default function ShowsPreview (props) {
    
//     const [SeasonData, setSeasonData] = useState(null);

// useEffect(() => {

//     if (props.seasonAPI) {
        
//         fetch(`https://podcast-api.netlify.app/id/${props.seasonAPI}`)
//             .then(response => response.json())
//             .then(data =>{

//                 const getseasons = data.seasons

//                 const seasonsdata = getseasons.map((mapseasons) => {
//                     return (
//                         <SeasonBody
//                             key={mapseasons.seasons}
//                             {...mapseasons}
//                         />
//                     )
//                 })

//                 setSeasonData(seasonsdata)
//              })
//     }
// }, [props.seasonAPI])


//     return (
//         <div>
//             {SeasonData}
//         </div>
//     );

//                 }

import React, { useState, useEffect } from "react";
import SeasonBody from "./SeasonBody";


export default function ShowsPreview(props) {
  const [seasonData, setSeasonData] = useState([]);

  useEffect(() => {
    if (props.seasonAPI) {
      fetch(`https://podcast-api.netlify.app/id`)
        .then((response) => response.json())
        .then((data) => {
          const getseasons = data.seasons
          
          const seasondata = getseasons.map((mapseasons) => {
            return (
              <SeasonBody
                key={mapseasons.id} // Use a unique identifier for the key
                {...mapseasons}
              />
            );
          });
          setSeasonData(seasondata);
        })
        .catch((error) => {
          console.error("Error fetching season data:", error);
        });
    }
  }, [props.seasonAPI]);

  return <div>{seasonData}</div>;
}
