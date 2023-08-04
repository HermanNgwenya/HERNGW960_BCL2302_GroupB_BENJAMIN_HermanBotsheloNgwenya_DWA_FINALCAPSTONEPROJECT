// EpisodePage.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Episode from "./Episode";

const EpisodePage = ({ showId, episodeId }) => {
  const [episodeData, setEpisodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the episode details based on the showId and episodeId from the URL
    fetch(`https://podcast-api.netlify.app/id/season/episodes/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodeData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching episode details:", error);
        setIsLoading(false);
      });
  }, [showId, episodeId]);

  return (
    <div className="episode-page">
      {isLoading ? (
        <LoadingSpinner /> // Show the loading spinner while data is being loaded
      ) : episodeData ? (
        <div>
          <h2>{episodeData.title}</h2>
          <Episode episode={episodeData} />
        </div>
      ) : (
        <div>Episode not found</div>
      )}
    </div>
  );
};
export default EpisodePage;