import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
const Frm = () => {
  useEffect(() => {
    const emp = JSON.parse(localStorage["gunnapp"]);
    setemp(emp.employee);
    Axios.post(
      "http://localhost:3001/selectemployee",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      const fname = response.data[0]["employee_fname"];
      setname(fname);
    });
    Axios.get("http://localhost:3001/selectdtleave").then((response) => {
      // console.log(response.data[0]["empleave_fileattach"].data);

      // var bytes = new Uint8Array(response.data[0]["empleave_fileattach"].data);
      console.log(response);
    });
    Axios.get("http://localhost:3001/selectleave").then((response) => {
      setleave(response.data);
    });
  }, []);
  const [empid, setemp] = useState("");
  const [type, settype] = useState("");
  const [reason, setreason] = useState("");
  const [datest, setdatestart] = useState("");
  const [dateend, setdateend] = useState("");
  const [leave, setleave] = useState([]);
  const [img, setimg] = useState("");
  const [numleave, setnumleave] = useState("");
  const [name, setname] = useState("");
  const [typeapprove, settypeapprove] = useState("0");
  const selecttype = (event) => {
    console.log(event.target.value);
    settype(event.target.value);
  };
  const inputreason = (event) => {
    setreason(event.target.value);
  };
  const inputdatest = (event) => {
    setdatestart(event.target.value);
  };
  const inputdateend = (event) => {
    setdateend(event.target.value);
  };
  const inputnumleave = (event) => {
    setnumleave(event.target.value);
  };
  const Addfile = async (event) => {
    try {
      const file = event.target.files[0];
      // let text = file.type;
      // let result = text.replace("image/", "");
      // console.log(result);
      if (file && file.type.match("image.*")) {
        const image = await resizeFile(file);
        // console.log(image);
        setimg(image);
      } else {
        setimg("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        170,
        170,
        file.type.replace("image/", ""),
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        150,
        150
      );
    });
  // const Addfile = (event) => {
  //   // console.log(event.target.files[0]);
  //   const file = event.target.files[0];
  //   getbase64(file, (result) => {
  //     const file64 = result;
  //     // console.log(file64);
  //     setimg(file64);
  //   });
  // };
  // const getbase64 = (file, cb) => {
  //   let reader = new FileReader();
  //   if (file && file.type.match("image.*")) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     setimg("");
  //   }
  //   // reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };
  const AddData = () => {
    const Data = {
      emp: empid,
      typeleave: type,
      dspcprem: reason,
      stdat: datest,
      enddate: dateend,
      img: img,
      numleave: numleave,
      name: name,
      typeapprove: typeapprove,
    };
    Axios.post("http://localhost:3001/instleave", Data).then((response) => {
      window.location.reload(false);
      return Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      // console.log(response);
    });
  };

  const htmlfrm = (
    <>
      <div className="col-md-12">
        <div className="card shadow mb-4 ">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary text-center">
              เพิ่มคำขออนุมัติลา
            </h6>
          </div>
          <div class="card-body">
            <div class="col-md-12">
              <label>
                <b>ประเภทการลา :</b>
              </label>
              <select className="form-control" onChange={selecttype}>
                <option>โปรดเลือก</option>
                {leave.map((data) => {
                  return (
                    <option value={data.msttypeleave}>
                      {data.msttypeleave_var}
                    </option>
                  );
                })}
                {/* <option value="1">ลาป่วย</option>
                <option value="2">ลากิจ</option>
                <option value="3">ลาพักร้อน</option> */}
              </select>
            </div>
            <div class="col-md-12">
              <label>
                <b>รายละเอียดการลา (เหตุผล) :</b>
              </label>
              <textarea
                className="form-control"
                rows="5"
                onChange={inputreason}
              ></textarea>
            </div>
            <div className="row">
              <div className="col-md-4">
                &nbsp;&nbsp;&nbsp;
                <label>
                  <b>เริ่มวันที่ :</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={inputdatest}
                />
              </div>
              <div className="col-md-4">
                <label>
                  <b>ถึงวันที่ :</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={inputdateend}
                />
              </div>
              <div className="col-md-4">
                <label>
                  <b>จำนวนวันลา :</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={inputnumleave}
                />
              </div>
            </div>
            <br />
            <div className="col-md-6">
              <div className="row">
                &nbsp;&nbsp;&nbsp;
                <label>
                  <b>ประเภท :</b>
                </label>
                &nbsp;&nbsp;&nbsp;
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    เต็มวัน
                  </label>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    ครึ่งวัน
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <label>
                <b>ไฟล์แนบ :</b>
              </label>
              <input className="form-control" type="file" onChange={Addfile} />
            </div>
            {/* {img ? (
              <div className="col-md-12">
                <center>
                  <img src={img} height="30%" width="30%" />
                </center>
              </div>
            ) : (
              <div></div>
            )} */}
            <div className="col-md-12">
              <center>
                <img src={img} height="30%" width="30%" />
              </center>
            </div>
            <br />
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <button className="btn btn-success" onClick={AddData}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return htmlfrm;
};
export default Frm;
