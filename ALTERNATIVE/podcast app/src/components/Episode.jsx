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
                src={episode.image}
                alt={episode.title}
                className="showpreview--image"
              />
              <h4>{episode.title}</h4>
              <p>Description: {episode.description}</p>
      {/* Render other episode details as needed */}
      <button onClick={handlePlayEpisode}>Play</button>
    </div>
  );
};

export default Episode;
