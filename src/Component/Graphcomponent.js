import Axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Chart,
  Pie,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
// import Test from "./Test2";
const Stat = () => {
  const [dtleave, setdtleave] = useState("");
  const [leave, setleave] = useState(0);
  const [leavesick, setleavesick] = useState(0);
  const [annualleave, setannualleave] = useState(0);
  const [leavetype, setleavetype] = useState([]);
  const [stringleavetype, setstringleavetype] = useState([]);
  const [arrcount, setarr] = useState([]);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/selectuserleave",
      JSON.parse(localStorage["gunnapp"])
    ).then((response) => {
      console.log(response);
      setdtleave(response.data);
      var numleavesick = 0;
      var numleave = 0;
      var numannualleave = 0;
      var arr = [];
      response.data.map((data) => {
        if (data.empleave_typeleave === 1) {
          numleavesick = numleavesick + 1;
        } else if (data.empleave_typeleave === 2) {
          numleave = numleave + 1;
        } else if (data.empleave_typeleave === 3) {
          numannualleave = numannualleave + 1;
        }
        // arr[data.empleave_typeleave]["count"] += 1;
      });
      setarr(arr);
      setleave(numleave);
      setleavesick(numleavesick);
      setannualleave(numannualleave);
    });
    Axios.get("http://localhost:3001/showtypeleave").then((response) => {
      console.log(response.data);
      var i = 0;
      var stringtype = [];
      for (const [key, value] of Object.entries(response.data)) {
        stringtype[i] = value["msttypeleave_var"];
        i = i + 1;
      }
      // console.log(stringtype);
      setstringleavetype(stringtype);
      setleavetype(response.data);
      // console.log(stringtype);
      // console.log(stringleavetype);
    });
  }, []);

  const dataPie = {
    labels: stringleavetype,
    datasets: [
      {
        label: "# of Votes",
        data: [leavesick, leave, annualleave],
        arEmpid: [1, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const htmlstat = (
    <>
      <div className="col-8">
        <div className="card shadow mb-4">
          <div class="card-body">
            <div className="row">
              <div className="col-md-4">
                <div class="card bg-primary text-white shadow">
                  <div class="card-body">
                    ลาป่วย
                    <div class="text-white-50 small">{leavesick}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="card bg-warning text-white shadow">
                  <div class="card-body">
                    ลากิจ
                    <div class="text-white-50 small">{leave}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="card bg-info text-white shadow">
                  <div class="card-body">
                    ลาพักร้อน
                    <div class="text-white-50 small">{annualleave}</div>
                  </div>
                </div>
              </div>
            </div>
            <Chart
              type="pie"
              data={dataPie}

              // options={{
              //   onClick: function (event, elements) {
              //     const chart = elements[0]._chart;
              //     const element = chart.getElementAtEvent(event)[0];
              //     console.log(element);
              //     // console.log(dataPie.datasets[0]);
              //   },
              // }}
              // onElementsClick={(elems) => {
              //   console.log(dataPie);
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
  return htmlstat;
};
export default Stat;
