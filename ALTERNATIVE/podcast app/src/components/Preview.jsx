import React, { useState, useEffect } from "react";

const genreTitles = [
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

export default function Preview() {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  const getGenreTitles = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genreTitles[id - 1]).join(", ");
  };

  return (
    <div className="showpreview">
      {/* Render the fetched data here */}
      {showData.map((show) => (
        <div key={show.id}>
          <img src={show.image} alt={show.title} className="showpreview--image"/>
          <h2>{show.title}</h2>
          {/* <p>{show.description}</p> */}
          <h4>Seasons: {show.seasons}</h4>

          <p>Genre: {getGenreTitles(show.genres)}</p>
          {/* Render other properties of the show as needed */}
        </div>
      ))}
    </div>
  );
}
