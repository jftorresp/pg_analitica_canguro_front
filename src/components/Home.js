import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AnalysisExplore from "./AnalysisExplore";
import AnalysisGrowth from "./AnalysisGrowth";
import AnalysisRCIU from "./AnalysisRCIU";

const Home = () => {
  // Render
  return (
    <div className="home">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/rciu">
            <AnalysisRCIU />
          </Route>
          <Route path="/crecimiento">
            <AnalysisGrowth />
          </Route>
          <Route path="/">
            <AnalysisExplore />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
