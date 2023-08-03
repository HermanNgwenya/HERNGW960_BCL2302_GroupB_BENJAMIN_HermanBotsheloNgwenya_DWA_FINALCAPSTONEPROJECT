
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Episode from "./Episode";


const ShowDetails = ({ showId }) => {

//   const history = useHistory();

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

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
  };

  const handleEpisodePreview = (episodeId) => {
    // Navigate to the episode page with the appropriate showId and episodeId
    history.push(`/show/${showId}/episode/${episodeId}`);
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

          {/* Render season selection mechanism */}
          {showData.seasons && (
            <div>
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
            <div>
              <h3>Season {selectedSeason.number} Episodes:</h3>
              {selectedSeason.episodes.map((episode) => (
                  <Episode key={episode.id} episode={episode} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
