import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header'
import Preview from './components/Preview'
import ShowDetails from "./components/ShowDetails";
import EpisodePage from "./components/EpisodePage";
// import SeasonViewer from './components/Seasons'

export default function App() {


  return (
    <>
     <Header/>
     <Preview/>
     {/* <Router>
      <Switch>
        <Route exact path="/" component={Preview} />
        <Route path="/show/:showId" component={ShowDetails} />
        <Route exact path="/show/:showId/episode/:episodeId" component={EpisodePage} />
      </Switch>
    </Router> */}
    </>
  );
}
