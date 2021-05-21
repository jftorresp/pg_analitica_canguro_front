import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AnalysisEnv from "./Stages/AnalysisEnv";
import AnalysisGrowth from "./Stages/AnalysisGrowth";
import AnalysisBirth from "./Stages/AnalysisBirth";
import Homepage from "./Homepage";

const Home = () => {
  const [filVars, setFilVars] = useState([]);

  const filterVariables = (inputValue) => {
    setFilVars(inputValue);
  };

  // Render
  return (
    <div className="home">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/entorno">
            <AnalysisEnv
              filterVariables={filterVariables}
              inputVars={filVars}
            />
          </Route>
          <Route path="/nacimiento">
            <AnalysisBirth
              inputVars={filVars}
              filterVariables2={filterVariables}
            />
          </Route>
          <Route path="/crecimiento">
            <AnalysisGrowth inputVars={filVars} />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
