import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SeasonViewer from "./Seasons";

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    // Set isLoading to true while initial data is being loaded
    setIsLoading(true);

    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setShowData(data)
        setIsLoading(false); // Set isLoading to false after data has been fetched
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      });
  }, []);

  const getGenreTitles = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genreTitles[id - 1]).join(", ");
  };

    // Function to handle the click event when a show image is clicked
    const handleShowClick = (showId) => {
      setSelectedShowId(showId); // Set the selected show ID when a show is clicked
    };
  

  return (
    <div className="showpreview">
      {/* Render the fetched data here */}
      {isLoading ? (
        <LoadingSpinner /> // Show the loading spinner while data is being loaded
      ) : (
          showData.map((show) => (
          <div key={show.id}>
            <img src={show.image} 
            alt={show.title} 
            className="showpreview--image"
            // Add an onClick event to display season data when the image is clicked
            onClick={() => handleShowClick(show.id)}
            />
            <h2>{show.title}</h2>
            {/* <p>{show.description}</p> */}
            <h4>Seasons: {show.seasons}</h4>

            <p>Genre: {getGenreTitles(show.genres)}</p>
            {/* Render other properties of the show as needed */}
          </div>
        ))
      )}

            {/* Conditionally render the SeasonViewer component */}
            {selectedShowId && <SeasonViewer showId={selectedShowId} />}
            
    </div>
  );
}
