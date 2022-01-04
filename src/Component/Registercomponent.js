import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Upload.css";
import Axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [depart, setDepart] = useState("");
  const [duty, setDuty] = useState("");
  const [rppassword, setRppassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [stwork, setStwork] = useState("");
  const [getduty, setgetDuty] = useState([]);
  const [getdepart, setgetDepart] = useState([]);
  const [hide, setHide] = useState("hidden");
  const [statususer, Setstatususer] = useState("");
  const inputFirstname = (event) => {
    setFirstname(event.target.value);
  };
  const inputLastname = (event) => {
    setLastname(event.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/depart")
      .then((response) => {
        setgetDepart(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveinputData = (event) => {
    // console.log(444);
    if (password !== rppassword) {
      event.preventDefault();
      setPassword("");
      setRppassword("");
      // return Swal.fire({
      //   icon: "error",
      //   text: "รหัสไม่ตรงกัน",
      // });
      return setHide("");
    } else {
      event.preventDefault();
      const Data_employee = {
        Firstname: firstname,
        Lastname: lastname,
        Depart: depart,
        Duty: duty,
        Password: password,
        Birthday: birthday,
        Stwork: stwork,
        Username: username,
      };
      Axios.post("http://localhost:3001/insertemployee", Data_employee).then(
        // () => {
        //   setHide("hidden");
        //   setFirstname("");
        //   setLastname("");
        //   setBirthday("");
        //   setStwork("");
        //   setUsername("");
        // }
        (response) => {
          const Data_employeedt = {
            Username: username,
            Password: password,
            idemp: response.data.insertId,
            Status: statususer,
          };
          Axios.post(
            "http://localhost:3001/inst_employeedt",
            Data_employeedt
          ).then(() => {
            setHide("hidden");
            setLastname("");
            setFirstname("");
            setBirthday("");
            setStwork("");
            setUsername("");
            setPassword("");
            setRppassword("");
            setDepart("");
            setDuty("");
            Setstatususer("");
          });
        }
      );
    }

    // console.log(Data);

    // Axios.post("http://localhost:3001/insert", Data);
    // Axios.get("http://localhost:3001/depart").then((response) => {
    //   setDepart(response.data);
    //   console.log(depart);
    // });
  };

  const htmlregister = (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary text-center">
            เพิ่มบุคคล
          </h6>
        </div>
        <div className="card-body p-0">
          {/* <div className="row"> */}
          {/* <div className="col-lg-5 d-none d-lg-block bg-register-image"></div> */}
          {/* <div className="col-lg-7"> */}
          <div className="p-5">
            {/* <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div> */}
            <form className="user" onSubmit={saveinputData}>
              <div className="form-group row">
                {/* <div className="col-sm-12 mb-3 mb-sm-0">
                  <div className="profile-pic-div">
                    <image className="photo" />
                    <input type="file" className="file" />
                    <label for="file" className="uploadBtn">
                      Choose Photo
                    </label>
                  </div>
                </div> */}
                {/* <div className="small-12 medium-2 large-2 columns">
                  <div className="circle">
                    <img
                      className="profile-pic"
                      src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    />
                  </div>
                  <div className="p-image">
                    <i className="fa fa-camera upload-button"></i>
                    <input
                      className="file-upload"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div> */}
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control "
                    id="exampleFirstName"
                    placeholder="First Name"
                    onChange={inputFirstname}
                    value={firstname}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control "
                    id="exampleLastName"
                    placeholder="Last Name"
                    onChange={inputLastname}
                    value={lastname}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <select
                    className="form-control  col-sm-12"
                    onChange={(event) => {
                      setDepart(event.target.value);
                      const pm_depart = { pmdepart: event.target.value };

                      Axios.post("http://localhost:3001/duty", pm_depart).then(
                        (response) => {
                          setgetDuty(response.data);
                        }
                      );
                    }}
                    value={depart}
                    required
                  >
                    <option value={null}>----โปรดเลือกฝ่าย----</option>
                    {getdepart.map((data) => {
                      return (
                        <option value={data.mstdepart}>
                          {data.mstdepart_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <select
                    className="form-control  col-sm-12"
                    onChange={(event) => {
                      setDuty(event.target.value);
                    }}
                    value={duty}
                    required
                  >
                    <option value={null}>----โปรดเลือกตำแหน่ง----</option>
                    {getduty.map((data) => {
                      return (
                        <option value={data.mstduty}>
                          {data.mstduty_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label>วันเกิด :</label>
                  <input
                    type="date"
                    className="form-control"
                    value={birthday}
                    onChange={(event) => {
                      setBirthday(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label>วันที่เริ่มงาน :</label>
                  <input
                    type="date"
                    className="form-control"
                    value={stwork}
                    onChange={(event) => {
                      setStwork(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <select
                    className="form-control  col-sm-12"
                    onChange={(event) => {
                      // console.log(event.target.value);
                      Setstatususer(event.target.value);
                    }}
                    required
                    value={statususer}
                  >
                    <option value={null}>----โปรดเลือกสถานะ----</option>
                    <option value={0}>----พนักงาน----</option>
                    <option value={1}>----แอดมิน----</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="password"
                    className="form-control "
                    id="exampleInputPassword"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control "
                    id="exampleRepeatPassword"
                    placeholder="Repeat Password"
                    onChange={(event) => {
                      setRppassword(event.target.value);
                    }}
                    value={rppassword}
                    required
                  />
                  <label hidden={hide} style={{ color: "red" }}>
                    *--รหัสไม่ตรงกัน
                  </label>
                </div>
              </div>
              <center>
                <button
                  to="/"
                  className="btn  btn-user "
                  type="submit"
                  style={{ width: "15%", backgroundColor: "#C5E1E8" }}
                >
                  ADD
                </button>
              </center>
            </form>
            <hr />
            {/* <div className="text-center">
                  <Link to="/" className="small">
                    Already have an account? Login!
                  </Link>
                </div> */}
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
  return htmlregister;
};
export default Register;
