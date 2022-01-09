import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ShowCustomer from './ShowCustomer';
import CreateCustomer from './CreateCustomer';
import ListCustomers from './ListCustomers';

function AppRouter(props) {
    return (
      <Router>
        <div>
          <p><Link to={"/showCustomer"}>Kunde anzeigen</Link><span> | </span>
          <Link to={"/createCustomer"}>Kunde anlegen</Link><span> | </span>
          <Link to={"/listCustomers"}>Kunden auflisten</Link></p>

          <Switch>
            <Route path="/showCustomer">
              <ShowCustomer url={props.url}/>
            </Route>
            <Route path="/createCustomer">
              <CreateCustomer url={props.url}/>
            </Route>
            <Route path="/listCustomers">
              <ListCustomers url={props.url}/>
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }

  export default AppRouter;