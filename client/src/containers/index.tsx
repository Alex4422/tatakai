import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import MarketPlace from "./MarketPlace";
import Admin from "./Admin";
import Navbar from "../ui/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=" mt-4">
        <Route exact path="/" component={Home} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );
};
export default App;
