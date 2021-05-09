import Header from "../features/header/Header";
import AccountsOverview from "../features/accounts-overview/Accounts-overview";
import Exchange from "../features/exchange/Exchange";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <section className="content">
          <Switch>
            <Route path="/exchange">
              <Exchange />
            </Route>
            <Route path="/">
              <AccountsOverview />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
