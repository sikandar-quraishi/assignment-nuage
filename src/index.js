import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom'
import AddFoodtruckPage from "./Pages/AddFoodtruckPage"
import 'semantic-ui-css/semantic.min.css'
import Navbar from './Components/Navbar'
import App from "./App";



const routing = (
  <Router>
    <div >
     <Navbar/>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/AddFoodtruck" component={AddFoodtruckPage} />
    </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById("root"));


