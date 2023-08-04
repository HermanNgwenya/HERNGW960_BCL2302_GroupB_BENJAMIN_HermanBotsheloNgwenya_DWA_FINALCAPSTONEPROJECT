//ShowDetails.jsx
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Episode from "./Episode";
import EpisodePage from "./EpisodePage";


const ShowDetails = ({ showId }) => {

  const [showData, setShowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    // Fetch the show details, including seasons and episodes, for the given show ID
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show details:", error);
        setIsLoading(false);
      });
  }, [showId]);

  const handleSeasonChange = (episodes) => {
    setSelectedSeason(episodes);
  };

  return (
    <div className="show-details">
      {isLoading ? (
        <LoadingSpinner /> // Show the loading spinner while data is being loaded
      ) : (
        <div>
               <img 
                 src={showData.image}
                 alt={showData.title}
                 className="showpreview--image"
               />
          <h2>{showData.title}</h2>
          <p>{showData.description}</p>
          <p>{showData.id}</p>
          

          {/* Render season selection mechanism */}
          {showData.seasons && (
            <div key={showData.id}>
              <h4>Seasons:</h4>
                {showData.seasons.map((season) => (
                  <div className="season--preview">
                    <h4>{season.title}</h4>
                    <img
                      src={season.image}
                      alt={season.title}
                      className="season--image"
                      onClick={() => handleSeasonChange(season.episodes)}
                    ></img>
                    <p>Episodes: {season.episodes.length}</p>

                  </div>
                ))}
            </div>
          )}

          {selectedSeason && (
            <div key={selectedSeason}>
              <h3>Season  Episodes:</h3>
              {selectedSeason.map((episode) => (
                  <EpisodePage key={episode.id} episode={episode.title} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
