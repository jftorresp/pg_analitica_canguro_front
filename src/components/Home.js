import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AnalysisExplore from "./AnalysisExplore";
import AnalysisEnv from "./AnalysisEnv";
import AnalysisGrowth from "./AnalysisGrowth";
import AnalysisBirth from "./AnalysisBirth";

const Home = () => {
  // Render
  return (
    <div className="home">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/entorno">
            <AnalysisEnv />
          </Route>
          <Route path="/nacimiento">
            <AnalysisBirth />
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
