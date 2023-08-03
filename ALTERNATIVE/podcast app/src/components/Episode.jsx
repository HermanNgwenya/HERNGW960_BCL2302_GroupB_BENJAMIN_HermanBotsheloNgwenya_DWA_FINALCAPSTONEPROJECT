// Episode.js
import React from "react";

const Episode = ({ episode }) => {
  const handlePlayEpisode = () => {
    // Implement the logic to play the episode
    console.log("Play episode:", episode.title);
  };

  return (
    <div className="episode">
              <img 
                src={seasons.episodes.image}
                alt={seasons.episodes.title}
                className="showpreview--image"
              />
      <h4>{seasons.episodes.title}</h4>
      {/* Render other episode details as needed */}
      <button onClick={handlePlayEpisode}>Play</button>
    </div>
  );
};

export default Episode;
