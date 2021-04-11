import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import MarketPlace from "./MarketPlace";
import MyCards from "./MyCards";
import Admin from "./Admin";
import Profile from "./Profile";
import Navbar from "./Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=" mt-4">
        <Route exact path="/" component={Home} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <Route exact path="/cards" component={MyCards} />
        <Route path="/admin" component={Admin} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
};
export default App;
