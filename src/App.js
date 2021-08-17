import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import meli from "./meli.svg";
import SearchPage from "./components/SearchPage";
import ItemContainer from "./components/ItemContainer";
import ItemDetail from "./components/ItemDetail";

import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <Link to="/">
            <img src={meli} alt="logo" className={styles.appLogo} />
          </Link>
          <SearchPage />
        </header>
        <div className={styles.appHeader}>
          <tr>
            <Switch>
              <Route path="/ItemContainer" component={ItemContainer} />
              <Route path="/ItemDetail" component={ItemDetail} />
            </Switch>
          </tr>
        </div>
      </div>
    </Router>
  );
};

export default App;
