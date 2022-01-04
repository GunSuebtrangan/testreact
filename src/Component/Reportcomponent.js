import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import Dtleave from "./Dataleavecomponent";
const Rpt = () => {
  const [stdate, setstdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [datatable, setdatatable] = useState([]);
  const [Show, setShow] = useState(false);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/selectemployee",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      const type = response.data[0]["employeedt_type"];
      // console.log(response.data[0].employeedt_type);
      settype(type);
      // console.log(response);
    });
  }, []);
  const html = (
    <>
      <div className="col-md-12">
        <div className="card shadow mb-4 ">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary text-center">
              รายงาน
            </h6>
          </div>
          <div class="card-body">
            <div className="row">
              <div className="col-md-3">
                <label>วันที่</label>
                <input
                  type="date"
                  className="form-control "
                  onChange={(event) => {
                    setstdate(event.target.value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label>ถึงวันที่</label>
                <input
                  type="date"
                  className="form-control "
                  onChange={(event) => {
                    setenddate(event.target.value);
                  }}
                />
              </div>
              {type === 1 ? (
                <div className="col-md-3">
                  <label>ชื่อพนักงาน</label>
                  <input
                    className="form-control "
                    onChange={(event) => {
                      setname(event.target.value);
                    }}
                  />
                </div>
              ) : null}

              <div className="col-md-3">
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "40%" }}
                  onClick={() => {
                    if (!stdate && !enddate && !name) {
                      return Swal.fire({
                        icon: "error",
                        title: "กรุณาเลือกข้อมูล",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                    // var where1 = "";
                    // var where2 = "";
                    // var where3 = "";
                    // if (stdate) {
                    //   where1 = `AND empleave_stdate = "${stdate}" `;
                    // }
                    // if (enddate) {
                    //   where2 = `AND empleave_endate = "${enddate}" `;
                    // }
                    // if (name) {
                    //   where3 = `AND employee_fname LIKE "%${name}%" `;
                    // }
                    // const sql = `Select * from employee,employee_leave,mst_depart,mst_duty,mst_typeleave where employee_mstdepart=mstdepart AND employee_mstduty=mstduty AND empleave_employee=employee AND empleave_typeleave=msttypeleave ${where1} ${where2} ${where3}`;

                    // console.log(sql);
                    const Data = {
                      stdate: stdate,
                      enddate: enddate,
                      name: name,
                      type: type,
                      emp: localStorage["gunnapp"],
                    };
                    Axios.post("http://localhost:3001/table", Data).then(
                      (response) => {
                        // console.log(response);
                        setShow(true);
                        console.log(response.data);
                        setdatatable(response.data);
                      }
                    );
                  }}
                >
                  ค้นหา
                </button>
              </div>
            </div>
            <br />
            {Show ? <Dtleave data={datatable} /> : null}
            {/* <Dtleave title={datatable} /> */}
          </div>
        </div>
      </div>
    </>
  );
  return html;
};
export default Rpt;
