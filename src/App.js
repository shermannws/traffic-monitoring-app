import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Container, Image } from "react-bootstrap"
import RegisterPage from "./components/RegisterPage"
import DashboardPage from "./components/DashboardPage"
import ThankyouPage from "./components/ThankyouPage"
import ExcoPage from "./components/ExcoPage"

import logo from "./images/logo-draft.png"

function App() {
  return (
    <>
      <Container 
      className="align-items-start justify-content-center w-100 pt-2"
      style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          <div className="text-center">
            <Image src={logo} className="text-center align-center" width={250} />  
          </div>
          
          <p className="text-center mb-0">
            an initiative by the
          </p>
          <p className="text-center mt-0">
            <strong>10th Social Innovation (SI) Wing</strong>
          </p>
        </div>
        <hr />
        <div className="pt-2 w-100">
          <Router>
              <Switch>  
                <Route exact path="/">
                  <Redirect to="/register" />
                </Route>
                <Route path="/register" component={RegisterPage} />
                <Route path="/done" component={ThankyouPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/unitedexcofrontorwtv" component={ExcoPage} />
              </Switch>
          </Router>
        </div>
        
      </Container>
    </>
  )
}

export default App
