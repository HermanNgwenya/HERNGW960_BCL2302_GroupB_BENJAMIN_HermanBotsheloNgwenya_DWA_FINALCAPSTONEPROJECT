import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
// import SeasonViewer from "./Seasons";
import ShowDetails from "./ShowDetails";


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
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterTitle, setFilterTitle] = useState("");

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

    // Function to format a given date string to a human-readable format
    const formatReadableDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to handle the click event when a show image is clicked
    const handleShowClick = (showId) => {
      setSelectedShowId(showId); // Set the selected show ID when a show is clicked
    };

    const sortShowsByTitle = () => {
      const sortedShows = [...showData].sort((a, b) =>
        sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
      setShowData(sortedShows);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const sortShowsByDateUpdated = (order) => {
      const sortedShows = [...showData].sort((a, b) => {
        const dateA = new Date(a.updated);
        const dateB = new Date(b.updated);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
      setShowData(sortedShows);
    };

    const handleFilterChange = (event) => {
      setFilterTitle(event.target.value);
    };

    const filteredShows = showData.filter((show) =>
      show.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  

  return (
    <div className="showpreview">

    <input
      type="text"
      placeholder="Filter by title..."
      value={filterTitle}
      onChange={handleFilterChange}
    />

    <button onClick={sortShowsByTitle}>
      Sort by Title {sortOrder === "asc" ? "A-Z" : "Z-A"}
    </button>

    <button onClick={() => sortShowsByDateUpdated("asc")}>Sort by Date Updated Asc</button>
    <button onClick={() => sortShowsByDateUpdated("desc")}>Sort by Date Updated Desc</button>

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

            <p>Date Apdated : {formatReadableDate(show.updated)}</p>
            {/* Render other properties of the show as needed */}

          </div>
        ))
      )}

            {/* Conditionally render the SeasonViewer component */}
            {selectedShowId && <ShowDetails showId={selectedShowId} />}
            
    </div>
  );
}
