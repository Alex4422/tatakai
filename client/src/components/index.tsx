import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import "./styles.css";

<Router>
  <div className="container mt-4">
    <Route exact path="/" component={Home} />
    <Route path="/admin" component={Admin} />
  </div>
</Router>;
