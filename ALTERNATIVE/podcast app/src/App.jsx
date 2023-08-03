import React from 'react'
import Header from './components/Header'
import Preview from './components/Preview'
// import SeasonViewer from './components/Seasons'

export default function App() {


  return (
    <>
     <Header/>
     <Preview/>
                 {/* Conditionally render the SeasonViewer component
                 {selectedShowId && <SeasonViewer showId={selectedShowId} />} */}
    </>
  )
}
