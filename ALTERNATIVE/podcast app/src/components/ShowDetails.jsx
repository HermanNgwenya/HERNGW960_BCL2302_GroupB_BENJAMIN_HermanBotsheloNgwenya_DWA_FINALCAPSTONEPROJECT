
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Episode from "./Episode";

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

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
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
              <ul>
                {showData.seasons.map((season) => (
                  <div className="season--preview">
                    <h4>{season.title}</h4>
                    <img
                      src={season.image}
                      alt={season.title}
                      className="season--image"
                    ></img>
                    

                  </div>
                ))}
              </ul>
            </div>
          )}
            {/* <img src={show.image} 
            alt={show.title} 
            className="showpreview--image"
            // Add an onClick event to display season data when the image is clicked
            onClick={() => handleShowClick(show.id)}
            />
            <h2>{show.title}</h2>
            {/* <p>{show.description}</p> */}
            {/* <h4>Seasons: {show.seasons}</h4>

            <p>Genre: {getGenreTitles(show.genres)}</p>

            <p>Date Apdated : {formatReadableDate(show.updated)}</p> */}
          {/* Render episodes for the selected season */}
          {selectedSeason !== null && (
            <div key={season.episode}>
              <h3>Season {selectedSeason} Episodes:</h3>
              {showData.episodes
                .filter((episode) => episode.season === selectedSeason)
                .map((episode) => (
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
