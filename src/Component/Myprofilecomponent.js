import { useState, useEffect } from "react";
import Axios from "axios";
const Myprofile = () => {
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [yearwork, Setyearwork] = useState("");
  const [monthwork, Setmonthwork] = useState("");
  const [depart, Setdepart] = useState("");
  const [duty, Setduty] = useState("");
  useEffect(() => {
    // console.log(777);
    // console.log(JSON.parse(localStorage["gunnapp"]));
    Axios.post(
      "http://localhost:3001/selectemployee",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      Setfirstname(response.data[0]["employee_fname"]);
      Setlastname(response.data[0]["employee_lname"]);
      // Setbirthday(response.data[0]["employee_brithdate"]);
      Setdepart(response.data[0]["mstdepart_name"]);
      Setduty(response.data[0]["mstduty_name"]);
      const d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth();
      Setyearwork(
        year - parseInt(response.data[0]["employee_stwrkdate"].substring(0, 4))
      );
      Setmonthwork(
        Math.abs(
          month -
            parseInt(response.data[0]["employee_stwrkdate"].substring(5, 7))
        )
      );
    });
  }, []);
  const htmlmyprofile = (
    <>
      <div className="col-4">
        <div className="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary text-center">
              Profile
            </h6>
          </div>
          <div class="card-body">
            <div class="text-left">
              <img />
              <p>
                ชื่อ :{firstname}
                <br /> นามสกุล:{lastname}
                <br /> ตำแหน่ง : {duty}
                <br />
                แผนก : {depart} <br />
                อายุงาน : {yearwork} ปี {monthwork} เดือน
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return htmlmyprofile;
};
export default Myprofile;
