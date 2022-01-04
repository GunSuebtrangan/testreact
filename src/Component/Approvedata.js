import { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
const Approvedata = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dtleave, setdtleave] = useState([]);
  const [img, setimg] = useState("");
  const [name, setname] = useState("");
  // const [name, setname] = useState("");
  // var closeButton = <i class="fas fa-times"></i>;
  useEffect(() => {
    Axios.get("http://localhost:3001/selectdtleave").then((response) => {
      console.log(response);
      setdtleave(response.data);
    });
    Axios.post(
      "http://localhost:3001/selectemployee",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      const fname = response.data[0]["employee_fname"];
      setname(fname);
    });
  }, []);
  var i = 0;
  const html = (
    <>
      <center>
        <table className="table">
          <thead>
            <tr
              style={{
                backgroundColor: "#6891C3",
                color: "white",
                textAlign: "center",
              }}
            >
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ลำดับ
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ชื่อพนักงาน
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                เหตุผล
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                เริ่มลาวันที่
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ถึงวันที่
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                รูปแบบ
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                จำนวนวันลา
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                รายละเอียด
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                การอนุมัติ
              </th>
            </tr>
          </thead>
          <tbody>
            {dtleave.map((data) => {
              var fontcolor = "green";
              if (data.msttypeleave_limit < data.empleave_totaldays) {
                //   stylefont = { color: "red" };
                fontcolor = "red";
              }
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>{++i}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.empleave_recdspname}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.empleave_dspcprem}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.empleave_stdate.substring(0, 10)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.empleave_endate.substring(0, 10)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {data.msttypeleave_var}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: fontcolor,
                    }}
                  >
                    {data.empleave_totaldays}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <i
                      className="fas fa-search-plus"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log(data.empleave_dspcprem);
                        setimg(data.empleave_fileattach);
                        setShow(true);
                      }}
                    ></i>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="row">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          const date = new Date().toString();
                          const Data = {
                            type: "1",
                            empleave: data.empleave,
                            name: name,
                            date: date,
                          };
                          console.log(Data);
                          Axios.post(
                            "http://localhost:3001/updateleave",
                            Data
                          ).then((response) => {
                            setdtleave(
                              dtleave.filter((val) => {
                                return val.empleave != data.empleave;
                              })
                            );
                            return Swal.fire({
                              icon: "success",
                              title: "อนุมัติสำเร็จ",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          });
                        }}
                      >
                        อนุมัติ
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          const date = new Date().toString();
                          const Data = {
                            type: "2",
                            empleave: data.empleave,
                            name: name,
                            date: date,
                          };
                          Axios.post(
                            "http://localhost:3001/updateleave",
                            Data
                          ).then((response) => {
                            setdtleave(
                              dtleave.filter((val) => {
                                return val.empleave != data.empleave;
                              })
                            );
                            return Swal.fire({
                              icon: "warning",
                              title: "ไม่อนุมัติสำเร็จ",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          });
                        }}
                      >
                        ไม่อนุมัติ
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modal heading
            {/* <div className="row">
              <div className="col-md-4">Modal heading</div>
              <div className="col-md-4" style={{ textAlign: "right" }}>
                <i className="fas fa-times"></i>
              </div>
            </div> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={img} />
        </Modal.Body>
      </Modal>
    </>
  );
  return html;
};
export default Approvedata;
