import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Task from "./pages/home/Task";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./component/header/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login/">
            <Login />
          </Route>
          <Route exact path="/register/">
            <Register />
          </Route>
          <Route exact path="/:id" component={Task} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
