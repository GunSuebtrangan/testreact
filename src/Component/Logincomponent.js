import { useState, useEffect } from "react";
import Register from "./Registercomponent";
import Button from "./Buttoncompnent";
import Axios from "axios";
import pic from "./img/1.jpg";
const Login = (props) => {
  const inputUsername = (event) => {
    // console.log(event.target.value);
    setUsername(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState("hidden");
  // const [depart, setDepart] = useState([]);
  // if (username === "1234" && password === "1234") {

  // }

  const htmlpage = (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block ">
                    <img src={pic} />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">System</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputusename"
                            placeholder="username"
                            value={username}
                            onChange={inputUsername}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={inputPassword}
                          />
                          <label
                            hidden={hide}
                            style={{ color: "red", fontSize: "13px" }}
                          >
                            *------รหัสไม่ถูกต้อง
                          </label>
                        </div>
                        {/* <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div> */}

                        <button
                          className="btn btn-primary btn-user btn-block"
                          onClick={(event) => {
                            event.preventDefault();
                            const Data = {
                              username: username,
                              password: password,
                            };
                            Axios.post(
                              "http://localhost:3001/login",
                              Data
                            ).then((response) => {
                              // console.log(response.data.length);

                              if (response.data.length > 0) {
                                // window.location.href = "/test";
                                // window.location.href = "/dashboard";
                                setHide("hidden");
                                props.onAdduser(response.data);
                                window.location.reload(false);
                              } else if (response.data.length === 0) {
                                setUsername("");
                                setPassword("");
                                setHide("");
                              }
                            });
                          }}
                        >
                          Login
                        </button>
                        <hr />
                        {/* <Button
                          OnClick={getemplooyee}
                          type="button"
                          className="btn btn-warning btn-user btn-block"
                        >
                          Test
                        </Button> */}
                      </form>

                      {/* <hr /> */}
                      {/* <Router> */}
                      <div className="text-center">
                        {/* <Link to="/register" className="small">
                          Create an Account!
                        </Link> */}
                      </div>
                      {/* <div id="1">
                          <Switch>
                            <Route path="/registers">
                              <Register />
                            </Route>
                          </Switch>
                        </div>
                      </Router> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return htmlpage;
};
export default Login;
