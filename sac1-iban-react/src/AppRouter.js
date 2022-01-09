import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import IbanValidator from './IbanValidator';
import IbanCreator from './IbanCreator';

function AppRouter(props) {
    return (
      <Router>
        <div>
          <p><Link to={"/validateIban"}>IBAN validieren</Link><span> | </span>
          <Link to={"/createIban"}>IBAN erstellen</Link></p>

          <Switch>
            <Route path="/validateIban">
              <IbanValidator url={props.url}/>
            </Route>
            <Route path="/createIban">
              <IbanCreator url={props.url}/>
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }

  export default AppRouter;