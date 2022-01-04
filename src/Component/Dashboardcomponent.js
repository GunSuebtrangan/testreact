import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Axios from "axios";
import Frm from "./Frmcomponent";
import Personal from "./Profiledashboardcomponent";
import Register from "./Registercomponent";
import Approve from "./Approvecomponent";
import Rpt from "./Reportcomponent";

const Dashboard = (props) => {
  // const { url, path } = useRouteMatch();
  const [typeuser, settype] = useState(0);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/selectemployee",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      const type = response.data[0]["employeedt_type"];
      settype(type);
      // console.log(response);
    });
  }, []);

  const htmldashboard = (
    <>
      <Router>
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon rotate-n-15"></div>
              {typeuser === 1 ? (
                <div className="sidebar-brand-text mx-3">Admin</div>
              ) : (
                <div className="sidebar-brand-text mx-3">USER</div>
              )}
            </a>
            <hr className="sidebar-divider my-0" />
            {/* <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li> */}
            <hr className="sidebar-divider" />
            <div className="sidebar-heading" style={{ fontSize: "20px" }}>
              หัวข้อ
            </div>
            {typeuser === 1 ? (
              <>
                <li className="nav-item">
                  <Link to={`/myprofile`} className="nav-link collapsed">
                    <i className="fas fa-user"></i>
                    <span>ข้อมูลส่วนตัว</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/frm`} className="nav-link collapsed">
                    <i className="fas fa-paperclip"></i>
                    <span>ยื่นลางาน</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/register`} className="nav-link collapsed">
                    <i className="fas fa-address-card"></i>
                    <span>ลงทะเบียนข้อมูลบุคคล</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/approve`} className="nav-link collapsed">
                    <i className="fas fa-file"></i>
                    <span>อนุมัติวันลา</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/rpt`} className="nav-link collapsed">
                    <i className="fas fa-table"></i>
                    <span>รายงานการลา</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={`/myprofile`} className="nav-link collapsed">
                    <i className="fas fa-user"></i>
                    <span>ข้อมูลส่วนตัว</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/frm`} className="nav-link collapsed">
                    <i className="fas fa-paperclip"></i>
                    <span>ยื่นลางาน</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/rpt`} className="nav-link collapsed">
                    <i className="fas fa-table"></i>
                    <span>รายงานการลา</span>
                  </Link>
                </li>
              </>
            )}

            {/* <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
                onClick={() => {
                  localStorage.clear(["gunnapp"]);
                  window.location.reload(false);
                }}
              >
                Logout
              </button>
            </div> */}
          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" style={{ backgroundColor: "#FFFEF2" }}>
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  {/* <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div> */}
                </form>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="searchDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                </ul>
                <label
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.clear(["gunnapp"]);
                    window.location.reload(false);
                  }}
                >
                  Log out
                </label>
              </nav>
              <div
                className="container-fluid"
                style={{ backgroundColor: "#FFFEF2" }}
              >
                <Switch>
                  <Route exact path={`/myprofile`}>
                    <Personal />
                  </Route>
                  <Route path={`/frm`}>
                    <Frm />
                  </Route>
                  <Route path={`/register`}>
                    <Register />
                  </Route>
                  <Route path={`/approve`}>
                    <Approve />
                  </Route>
                  <Route path={`/rpt`}>
                    <Rpt />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
  return htmldashboard;
};
export default Dashboard;
