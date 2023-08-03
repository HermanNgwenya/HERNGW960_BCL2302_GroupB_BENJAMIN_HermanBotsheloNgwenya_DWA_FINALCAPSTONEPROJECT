// import React, { useState, useEffect } from "react";
// import LoadingSpinner from "./LoadingSpinner";

// const SeasonViewer = ({ showId }) => {
//   const [seasonData, setSeasonData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     // Fetch the season data for the given show ID
//     fetch(`https://podcast-api.netlify.app/id/${showId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setSeasonData(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching season data:", error);
//         setIsLoading(false);
//       });
//   }, [showId]);

//   return (
//     <div className="seasonviewer">
//       {isLoading ? (
//         <LoadingSpinner /> // Show the loading spinner while data is being loaded
//       ) : (
//         <div>
//           {/* Render the fetched season data here */}
//           <h3>Season Info for {showId}</h3>
//           {/* Display season data properties based on the response structure */}
//           {/* For example: */}
//           {seasonData && (
//             <div>
//               <img 
//                 src={seasonData.image}
//                 alt={seasonData.title}
//                 className="showpreview--image"
//               />
//               <p>Season: {seasonData.season}</p>
//               <p>Title: {seasonData.title}</p>
//               <p>Episode Count: {seasonData.episodes}</p>
//               {/* Add more properties as needed */}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeasonViewer;
