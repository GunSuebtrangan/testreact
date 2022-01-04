import logo from "./logo.svg";
import "./App.css";
import Login from "./Component/Logincomponent";
import Register from "./Component/Registercomponent";
import Dashboard from "./Component/Dashboardcomponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import Test from "./Component/test";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  const [login, setLogin] = useState([{ Login: false }]);
  const [item, setItem] = useState(null);
  // useEffect(() => {
  //   console.log(6666);
  //   Axios.get("http://localhost:3001/session").then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  // if (login.Login === false) {
  //   return <Login />;
  // }
  const Addnewitem = (newitem) => {
    // console.log("ข้อมูลที่ส่งมาจากform", newitem);
    // setItem(newitem);

    localStorage["gunnapp"] = JSON.stringify({
      employee: newitem[0]["employee"],
    });
  };
  useEffect(() => {
    if (localStorage["gunnapp"]) {
      console.log(6666);
      setItem(JSON.parse(localStorage["gunnapp"]));
      // window.location.reload(false);
    }
  }, []);
  return (
    <>
      <Router>
        {/* <Login /> */}
        <Switch>
          {item ? (
            <Route path="/">
              <Dashboard />
            </Route>
          ) : (
            <Route path="/">
              <Login onAdduser={Addnewitem} />
              {/* <Test User={item} /> */}
            </Route>
          )}

          <Route path="/test">
            <Test User={item} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
